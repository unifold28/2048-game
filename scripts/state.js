class State{
    constructor(grid){
        this.grid = grid;

        // Toggles after the game is won and "Continue" button is clicked
        this.isContinued = false;
        // Toggles on while the overlay is shown
        this.isOverlayed = false;
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