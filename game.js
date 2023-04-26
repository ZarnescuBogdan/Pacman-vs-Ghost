class StartScene extends Phaser.Scene {
    constructor() {
        super('start');
    }

    create() {
        // Title of the game
        const title = this.add.text(400, 200, "Pacman vs Ghost", { fontSize: '32px', fill: '#fff' });
        title.setOrigin(0.5);

        // Add a "Start" button that starts the game
        const startButton = this.add.text(400, 300, "Start", { fontSize: '24px', fill: '#fff' });
        startButton.setOrigin(0.5);
        startButton.setInteractive();
        startButton.on('pointerdown', () => {
            this.scene.start('game');
        })
    }
}

class GameScene extends Phaser.Scene {
    constructor() {
        super('game');
    }

    score1Text = undefined;
    score2Text = undefined;

    preload() {
        // Load Pac-Man spritesheet
        this.load.spritesheet('pacman', 'assets/pacman.png', {
            frameWidth: 32,
            frameHeight: 32
        });

        // Load Ghost spritesheet
        this.load.spritesheet('ghost', 'assets/ghost.png', {
            frameWidth: 32,
            frameHeight: 32
        });

        // Load dot image
        this.load.image('dot', 'assets/dot.png');

        // Load bars image
        this.load.image('barH', 'assets/barH.png');
        this.load.image('barV', 'assets/barV.png');
    }

    create() {

        // Score reset
        score1 = 0;
        score2 = 0;

        // Add bars
        this.bar1 = this.add.image(200, 300, 'barV');
        this.physics.add.existing(this.bar1);
        this.bar1.body.immovable = true;

        this.bar2 = this.add.image(600, 300, 'barV');
        this.physics.add.existing(this.bar2);
        this.bar2.body.immovable = true;

        this.bar3 = this.add.image(400, 100, 'barH');
        this.physics.add.existing(this.bar3);
        this.bar3.body.immovable = true;

        this.bar4 = this.add.image(400, 500, 'barH');
        this.physics.add.existing(this.bar4);
        this.bar4.body.immovable = true;

        // Add pacman
        this.pacman = this.physics.add.sprite(100, 100, 'pacman');
        this.pacman.setCollideWorldBounds(true);
        this.pacman.setVelocity(0, 0);
        this.pacman.setOrigin(0.5, 0.5);
        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('pacman', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('pacman', {start: 3, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('pacman', { start: 6, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('pacman', { start: 9, end: 11 }),
            frameRate: 10,
            repeat: -1
        });

        // Add ghost
        this.ghost = this.physics.add.sprite(700, 500, 'ghost');
        this.ghost.setCollideWorldBounds(true);
        this.ghost.setVelocity(0, 0);
        this.ghost.setOrigin(0.5, 0.5);
        this.anims.create({
            key: 'W',
            frames: this.anims.generateFrameNumbers('ghost', { start: 1, end: 1}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'D',
            frames: this.anims.generateFrameNumbers('ghost', { start: 0, end: 0}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'S',
            frames: this.anims.generateFrameNumbers('ghost', { start: 2, end: 2}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'A',
            frames: this.anims.generateFrameNumbers('ghost', { start: 3, end: 3}),
            frameRate: 10,
            repeat: -1
        });

        // Create the power-ups
        this.dot = this.physics.add.staticGroup();
        this.dot.create(100, 300, 'dot');
        this.dot.create(400, 285, 'dot');
        this.dot.create(700, 150, 'dot');
        this.dot.create(350, 470, 'dot');
        this.dot.create(300, 250, 'dot');
        this.dot.create(400, 70, 'dot');
        this.dot.create(400, 530, 'dot');
        this.dot.create(170, 300, 'dot');
        this.dot.create(630, 300, 'dot');
        this.dot.create(100, 150, 'dot');
        this.dot.create(100, 530, 'dot');
        this.dot.create(700, 530, 'dot');
        this.dot.create(450, 130, 'dot');
        this.dot.create(530, 130, 'dot');
        this.dot.create(700, 360, 'dot');

        // Create the score display
        this.score1Text = this.add.text(16, 10, 'Pacman: 0', { fontSize: '16px', fill: '#fff' });
        this.score2Text = this.add.text(16, 26, ' Ghost: 0', { fontSize: '16px', fill: '#fff' });

        // Set up keyboard controls for player 1
        this.cursors = this.input.keyboard.createCursorKeys();

        // Set up keyboard controls for player 2
        this.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

    update() {
        // Pacman walk
        this.pacman.body.setVelocity(0);
        if (this.cursors.up.isDown) {
            this.pacman.body.immovable = false;
            this.pacman.anims.play('up', true);
            this.pacman.body.setVelocityY(-100);
        } else if (this.cursors.down.isDown) {
            this.pacman.body.immovable = false;
            this.pacman.anims.play('down', true);
            this.pacman.body.setVelocityY(100);
        } else if (this.cursors.left.isDown) {
            this.pacman.body.immovable = false;
            this.pacman.anims.play('left', true);
            this.pacman.body.setVelocityX(-100);
        } else if (this.cursors.right.isDown) {
            this.pacman.body.immovable = false;
            this.pacman.anims.play('right', true);
            this.pacman.body.setVelocityX(100);
        } else {
            this.pacman.body.immovable = true;
            this.pacman.anims.stop();
            this.pacman.setFrame(0);
        }

        // Ghost walk
        this.ghost.body.setVelocity(0);
        if (this.wKey.isDown) {
            this.ghost.body.immovable = false;
            this.ghost.anims.play('W', true);
            this.ghost.body.setVelocityY(-100);
        } else if (this.sKey.isDown) {
            this.ghost.body.immovable = false;
            this.ghost.anims.play('S', true);
            this.ghost.body.setVelocityY(100);
        } else if (this.aKey.isDown) {
            this.ghost.body.immovable = false;
            this.ghost.anims.play('A', true);
            this.ghost.body.setVelocityX(-100);
        } else if (this.dKey.isDown) {
            this.ghost.body.immovable = false;
            this.ghost.anims.play('D', true);
            this.ghost.body.setVelocityX(100);
        } else {
            this.ghost.body.immovable = true;
            this.ghost.anims.stop();
            this.ghost.setFrame(1);
        }

        // Set up collision detection between players and between player and bars
        this.physics.add.collider(this.pacman, this.ghost, this.onCollision, null, this);
        this.physics.add.collider(this.pacman, this.bar1);
        this.physics.add.collider(this.pacman, this.bar2);
        this.physics.add.collider(this.pacman, this.bar3);
        this.physics.add.collider(this.pacman, this.bar4);
        this.physics.add.collider(this.ghost, this.bar1);
        this.physics.add.collider(this.ghost, this.bar2);
        this.physics.add.collider(this.ghost, this.bar3);
        this.physics.add.collider(this.ghost, this.bar4);

        // Handle collisions between players and dots
        this.physics.add.overlap(this.pacman, this.dot, this.collectDot, null, this);
        this.physics.add.overlap(this.ghost, this.dot, this.collectDot, null, this);
    }

    /**
     * Collect dot
     * @param player - pacman or ghost
     * @param dot - dot
     */
    collectDot(player, dot) {
        dot.disableBody(true, true);
        if (player === this.pacman) {
            score1 += 1;
        } else if (player === this.ghost) {
            score2 += 1;
        }

        // Update the score display
        this.score1Text.setText('Pacman: ' + score1);
        this.score2Text.setText(' Ghost: ' + score2);

        if (this.dot.countActive(true) === 0) {
            this.scene.start('ending');
        }
    }

    /**
     * Collision between pacman and ghost
     * @param player1 - pacman
     * @param player2 - ghost
     */
    onCollision(player1, player2) {
        player1.setTint(0xff0000);
        player2.setTint(0xff0000);
        setTimeout(() => {
            player1.clearTint();
            player2.clearTint();
        }, 500);
    }
}

class EndingScene extends Phaser.Scene {
    constructor() {
        super('ending');
    }

    create() {
        // Determine the winner based on the scores from the game scene
        const winner = score1 > score2 ? 'Pacman' : 'Ghost';

        // Display the winner text
        const winnerText = this.add.text(400, 200, `${winner} wins!`, { fontSize: '32px', fill: '#fff' });
        winnerText.setOrigin(0.5);

        // Add a "play again" button that restarts the game
        const playAgainButton = this.add.text(400, 300, 'Play Again', { fontSize: '24px', fill: '#fff' });
        playAgainButton.setOrigin(0.5);
        playAgainButton.setInteractive();
        playAgainButton.on('pointerdown', () => {
            // Get back to the game scene
            this.scene.start('game');
        });
    }
}

// Game configuration
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [StartScene, GameScene, EndingScene]
};

const game = new Phaser.Game(config);

// Global variables for score
let score1 = 0;
let score2 = 0;
