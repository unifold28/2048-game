class Html{
    constructor(grid, state){
        this.grid = grid;
        this.state = state;

        this.elements = {};
        this.elements.grid = document.getElementById("grid");
        this.elements.gridOverlay = document.getElementById("grid-overlay");
        this.elements.gridOverlayMessage = document.getElementById("grid-overlay-message");
        this.elements.gridOverlayButton = document.getElementById("grid-overlay-button");

        this.setup();
    };

    // Separated from constructor for convenience
    setup(){
        // Generate and set grid template properties for CSS
        var gridTemplate = `repeat(${this.grid.size}, 1fr)`;
        this.elements.grid.style.gridTemplateColumns = gridTemplate;
        this.elements.grid.style.gridTemplateRows = gridTemplate;

        // Fill the grid element with empty tile elements
        for(var y = 0; y < this.grid.size; y++){
            for(var x = 0; x < this.grid.size; x++){
                var tileElement = document.createElement("div");

                tileElement.id = this.getTileId({x: x, y: y});
                tileElement.classList.add("tile");
                tileElement.classList.add("tile-0");

                this.elements.grid.appendChild(tileElement);
            }
        }
    };

    // Shorthand: get tile's id by its coordinates
    getTileId(coordinates){
        return `tile-${coordinates.x}-${coordinates.y}`;
    };

    // Shorthand: get tile's class by its value
    getTileClass(value){
        var tileClass = "";
        if(value == 0){
            tileClass = "tile-empty";
        }else if(value > 2048){
            tileClass = "tile-super";
        }else{
            tileClass = `tile-${value}`;
        }
        return tileClass;
    };

    // Shorthand: get tile's innerHTML text by its value
    getTileText(value){
        return value == 0 ? "" : `${value}`;
    };

    // Refresh all classes and innerHTMLs
    update(){
        // Grid-related updates
        for(var y = 0; y < this.grid.size; y++){
            for(var x = 0; x < this.grid.size; x++){
                var tileElementId = this.getTileId({x: x, y: y});
                var tileElement = document.getElementById(tileElementId);

                var tileValue = this.grid.getTile({x: x, y: y});

                var tileElementClass = this.getTileClass(tileValue);
                var tileElementText = this.getTileText(tileValue);

                tileElement.classList = "";
                tileElement.classList.add("tile");
                tileElement.classList.add(tileElementClass);

                tileElement.innerHTML = tileElementText;
            }
        }

        // State-related updates (in the overlay)
        if(this.state.isOverlayed){
            return;
        }
        if(this.state.isOver){
            this.setGridOverlayText({message: "Game over!", button: "Try again"});
        }
        if(this.state.isWon && !this.state.isContinued){
            this.setGridOverlayText({message: "You win!", button: "Continue"});
        }
    };

    // Set the overlay's message and button text
    setGridOverlayText(text){
        this.elements.gridOverlayMessage.innerHTML = text.message;
        this.elements.gridOverlayButton.innerHTML = text.button;

        this.toggleGridOverlay(true);
    };

    // Hide or show the overlay
    toggleGridOverlay(toggle){
        this.state.isOverlayed = toggle;
        if(!toggle){
            this.elements.gridOverlay.style.display = "none";
        }else{
            this.elements.gridOverlay.style.display = "grid";
        }
    };

    // Hide the overlay and update the html
    reset(){
        this.toggleGridOverlay(false);
        this.update();
    };
}