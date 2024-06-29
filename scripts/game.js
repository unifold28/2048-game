class Game{
    constructor(grid, html, inputs){
        this.grid = grid;
        this.html = html;
        this.inputs = inputs;

        this.setup();
    };

    // Separated from constructor for convenience
    setup(){
        var self = this;
        document.addEventListener("keydown", function(event){
            var key = event.code;
            if(Object.hasOwn(self.inputs.keyBinds, key)){
                self.onInput(key);
            }
        });

        this.grid.generateStartingTiles();

        this.html.update();
    };

    // Called when a key in the key binds is pressed
    onInput(key){
        var direction = this.inputs.keyBinds[key];

        // Check if the move will affect the grid
        if(!this.grid.isAvailableMove(direction)){
            return;
        }

        this.grid.move(direction);
        this.grid.generateTile();

        this.html.update();
    };
};