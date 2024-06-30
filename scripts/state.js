class State{
    constructor(){
        // Toggles after the game is won and "Continue" button is clicked
        this.isContinued = false;
        // Toggles on while the overlay is shown
        this.isOverlayed = false;
        // Score
        this.score = 0;
    };

    // Add other game components separately (to avoid declaration order issues)
    addComponents(grid){
        this.grid = grid;
    };

    // Game over: no available moves on the grid
    get isOver(){
        return !this.grid.hasAvailableMoves();
    };

    // Game won: there is a tile on the board that is >= 2048
    get isWon(){
        return this.grid.hasWinningTile();
    };

    // Reset non-getter states
    reset(){
        this.isContinued = false;
        this.isOverlayed = false;
    };
};