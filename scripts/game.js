class Game{
    constructor(grid, html, inputs, state){
        this.grid = grid;
        this.html = html;
        this.inputs = inputs;
        this.state = state;

        // Add other game components separately (to avoid declaration order issues)
        this.grid.setup();

        this.state.addComponents(this.grid);

        this.html.addComponents(this.grid, this.state);
        this.html.setup();

        this.setup();
    };

    // Separated from constructor for convenience
    setup(){
        var self = this;

        document.addEventListener("keydown", function(event){
            var key = event.code;
            // Block the controls if the overlay is acive or the keh is not in the keybinds
            if(self.state.isOverlayed || !self.inputs.isInKeyBinds(key)){
                return;
            }
            self.onKeyPress(key);
        });

        var buttonBinds = Object.keys(this.inputs.buttonBinds);
        for(var i = 0; i < buttonBinds.length; i++){
            var button = buttonBinds[i];
            var buttonElement = document.getElementById(button);
            buttonElement.addEventListener("click", function(event){
                self.onButtonClick(button);
            });
        }

        this.reset();
    };

    // Called when a key in the key binds is pressed
    onKeyPress(key){
        var direction = this.inputs.keyBinds[key];

        // Check if the move will affect the grid
        if(!this.grid.isAvailableMove(direction)){
            return;
        }

        // Update the grid
        this.grid.move(direction);
        this.grid.generateTile();

        // Update score
        this.state.score += this.grid.scoreIncrement;
        this.grid.scoreIncrement = 0;

        // Update html
        this.html.update();
    };

    // Called when a button in the buttons is pressed
    onButtonClick(button){
        var bind = this.inputs.buttonBinds[button];
        switch(bind){
            case 0:
                if(this.state.isOver){
                    this.reset();
                }
                if(this.state.isWon){
                    this.continue();
                }
                break;
        }
    };

    // Return the game to its starting state
    reset(){
        this.grid.reset();
        this.state.reset();
        this.html.reset();
    };

    // Called after the game is won and "Continue" button is clicked
    continue(){
        this.state.isContinued = true;
        this.html.toggleGridOverlay(false);
    };
};