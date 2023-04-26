let configEnd = {
    type: Phaser.AUTO,
    width: 400,
    height: 300,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let end = new Phaser.Scene(configEnd);

function preload() {

}

function create() {
    // Add a game over text
    this.add.text(200, 200, 'Game Over', { fontSize: '32px', fill: '#fff' });

    // Add a restart button
    const restartButton = this.add.text(200, 300, 'Restart', { fontSize: '32px', fill: '#fff' });
    restartButton.setInteractive();
    restartButton.on('pointerdown', () => {
        // Restart the game
        this.scene.restart();
    });
}

function update() {

}