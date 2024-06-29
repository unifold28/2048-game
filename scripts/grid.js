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