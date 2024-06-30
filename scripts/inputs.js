class Inputs{
    constructor(state){
        this.state = state;

        // Map keys to directions of movement
        // 0 - up, 1 - right, 2 - down, 3 - left
        this.keyBinds = {
            "KeyW": 0,
            "KeyD": 1,
            "KeyS": 2,
            "KeyA": 3,
            "ArrowUp": 0,
            "ArrowRight": 1,
            "ArrowDown": 2,
            "ArrowLeft": 3,
            "KeyI": 0,
            "KeyL": 1,
            "KeyK": 2,
            "KeyJ": 3,
        };

        // 0 - reset game after it is over / continue playing after it is won
        this.buttonBinds = {
            "grid-overlay-button": 0,
        };
    };

    // Shorthand: check if a key is in the key binds
    isInKeyBinds(key){
        return Object.hasOwn(this.keyBinds, key)
    };

    // Shorthand: check if a button is in the button binds
    isInButtons(button){
        return Object.hasOwn(this.buttonBinds, button);
    };
};