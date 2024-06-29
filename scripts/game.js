class Game{
    constructor(grid, html){
        this.grid = grid;
        this.html = html;

        this.setup();
    };

    // Separated from constructor for convenience
    setup(){
        // Test: showcase all tile values
        this.grid.showcaseTiles();

        this.html.update();
    };
};