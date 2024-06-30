class Grid{
    constructor(size){
        this.size = size;

        this.startingTiles = 2;
        this.tiles = [];

        this.setup();
    };

    // Separated from constructor for convenience
    setup(){
        // Fill the grid with empty tiles
        for(var y = 0; y < this.size; y++){
            this.tiles[y] = [];
            for(var x = 0; x < this.size; x++){
                this.tiles[y][x] = 0;
            }
        }
    };

    // Shorthand: get tile's value
    getTile(coordinates){
        return this.tiles[coordinates.x][coordinates.y];
    };

    // Shorthand: set tile's value
    setTile(coordinates, value){
        this.tiles[coordinates.x][coordinates.y] = value;
    };

    // Shorthand: check if a tile is empty
    isTileEmpty(coordinates){
        return this.getTile(coordinates) == 0;
    };

    // Return an array of empty tiles currently on the grid
    getEmptyTiles(){
        var emptyTiles = [];
        for(var y = 0; y < this.size; y++){
            for(var x = 0; x < this.size; x++){
                var coordinates = {x: x, y: y};
                if(this.isTileEmpty(coordinates)){
                    emptyTiles.push(coordinates);
                }
            }
        }
        return emptyTiles;
    };

    // Shorthand: check if the grid is full
    isFull(){
        return this.getEmptyTiles().length == 0;
    };

    // Uniformly choose a random tile on the grid
    getRandomEmptyTile(){
        var emptyTiles = this.getEmptyTiles();
        var randomIndex = Math.floor(Math.random() * emptyTiles.length);
        return emptyTiles[randomIndex];
    };

    // Gnerate a random tile on the grid
    // P(2) = 90%
    // P(4) = 10%
    generateTile(){
        if(this.isFull()){
            return;
        }
        var value = Math.random() > 0.1 ? 2 : 4;
        var coordinates = this.getRandomEmptyTile();
        this.setTile(coordinates, value);
    };

    // Generate a given count of starting tiles
    generateStartingTiles(){
        for(var i = 0; i < this.startingTiles; i++){
            this.generateTile();
        }
    };

    // Get tile's coordinate based on given line direction, line coordinate and in-line index
    // 0 - up, 1 - right, 2 - down, 3 - left
    getInLineTile(direction, coordinate, index){
        var coordinates = {};
        switch(direction){
            // Up (reverse the y coordinate)
            case 0:
                coordinates.x = coordinate;
                coordinates.y = this.size - 1 - index;
                break;
            // Right
            case 1:
                coordinates.x = index;
                coordinates.y = coordinate;
                break;
            // Down
            case 2:
                coordinates.x = coordinate;
                coordinates.y = index;
                break;
            // Left (reverse the x coordinate)
            case 3:
                coordinates.x = this.size - 1 - index;
                coordinates.y = coordinate;
                break;
        }
        return coordinates;
    };

    // Get a line (a row or a column) as an array based on the direction given
    getLine(direction, coordinate){
        var line = [];
        for(var i = 0; i < this.size; i++){
            var coordinates = this.getInLineTile(direction, coordinate, i);
            line[i] = this.getTile(coordinates);
        }
        return line;
    };

    // Set the line back into the grid
    setLine(direction, coordinate, line){
        for(var i = 0; i < this.size; i++){
            var coordinates = this.getInLineTile(direction, coordinate, i);
            this.setTile(coordinates, line[i]);
        }
    };

    // Compress a given line (slide all 0s to the left and other values to the right)
    // [2, 0, 2, 0] ---> [0, 0, 2, 2]
    compressLine(line){
        var compressedLine = [];
        for(var i = 0; i < line.length; i++){
            var value = line[i];
            if(value == 0){
                // Slide 0s to the left
                compressedLine.unshift(0);
            }else{
                // Slide non-zero values to the right
                compressedLine.push(value);
            }
        }
        return compressedLine;
    };

    // Go throught the line and combine equal adjacent values
    // [2, 2, 4, 0] ---> [4, 0, 4, 0]
    mergeLine(line){
        for(var i = line.length - 1; i > 0; i--){
            if(line[i] == line[i - 1] && line[i] != 0){
                line[i - 1] = 2 * line[i];
                line[i] = 0;
            }
        }
        return line;
    };

    // Check if a move in a given direction is available (if it changes the board)
    isAvailableMove(direction){
        for(var i = 0; i < this.size; i++){
            var line = this.getLine(direction, i);
            var lineAfter = line;
            lineAfter = this.compressLine(lineAfter);
            lineAfter = this.mergeLine(lineAfter);
            for(var j = 0; j < line.length; j++){
                if(lineAfter[j] != line[j]){
                    return true;
                }
            }
        }
        return false;
    };

    // Shorthand: check if the grid has any available moves
    hasAvailableMoves(){
        for(var i = 0; i < 4; i++){
            if(this.isAvailableMove(i)){
                return true;
            }
        }
        return false;
    };

    // Check if the grid had a tile with a value >= 2048
    hasWinningTile(){
        for(var y = 0; y < this.size; y++){
            for(var x = 0; x < this.size; x++){
                if(this.getTile({x: x, y: y}) >= 2048){
                    return true;
                }
            }
        }
        return false;
    };

    // Move (slide) tiles in a given direction
    // [2, 0, 2, 4] ---> [0, 0, 4, 4]
    move(direction){
        for(var i = 0; i < this.size; i++){
            var line = this.getLine(direction, i);
            line = this.compressLine(line);
            line = this.mergeLine(line);
            line = this.compressLine(line);
            this.setLine(direction, i, line);
        }
    };

    // Clear the grid and generate starting tiles
    reset(){
        for(var y = 0; y < this.size; y++){
            for(var x = 0; x < this.size; x++){
                this.setTile({x: x, y: y}, 0);
            }
        }

        this.generateStartingTiles();
    }

    // Test: showcase all tile values (empty, 2 - 2048, super) 
    showcaseTiles(){
        for(var y = 0; y < this.size; y++){
            for(var x = 0; x < this.size; x++){
                var value = Math.pow(2, y * this.size + x);
                value = value == 1 ? 0 : value;

                this.setTile({x: x, y: y}, value);
            }
        }
    };
};