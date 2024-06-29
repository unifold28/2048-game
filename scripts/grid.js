class Grid{
    constructor(size){
        this.size = size;

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