// Set up components
var grid = new Grid(4);
var state = new State(grid);
var html = new Html(grid, state);
var inputs = new Inputs();

// Constructing the game object
var game = new Game(grid, html, inputs, state);