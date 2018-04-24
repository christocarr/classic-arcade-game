
// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
	this.speed = speed;
	this.x = x;
	this.y = y; 
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
	this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.	
	//loop enemy when it reaches end of boundry
	this.x = this.x + (this.speed * dt);
	
	if (this.x > 500) {
		this.x = -100;
	}
	
	//collision detection
	enemyArea = {x: this.x, y: this.y};
  playerArea = {x: player.x, y: player.y};
    if ((enemyArea.x < (playerArea.x + 50)) && ((enemyArea.x + 75) > playerArea.x) && 	(enemyArea.y < (playerArea.y + 63)) && ((77 + enemyArea.y) > playerArea.y)) {
      player.counter = 0;
			setTimeout(function() {
				player.reset()}, 200);
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function(x, y, counter) {
	this.x = x;
	this.y = y;
	this.sprite = 'images/char-boy.png';
	this.counter = counter;
};

Player.prototype.update = function(dt) {
	if (this.y < 50) {
		this.scoreCounter();
	}
	
};

Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//reset player to original starting location when collisions happen
Player.prototype.reset = function() {
	this.x = 200;
	this.y = 400;
	
	//if player is hit then reset the counter
	if (this.counter === 0) {
		let scoreCounter = document.querySelector('.score'); 
		scoreCounter.innerHTML = `Score: ${this.counter}`;
	}
	
};

//function to run when the player reaches the water which adds to score counter 
Player.prototype.scoreCounter = function(counter) {
	let scoreCounter = document.querySelector('.score');
	this.counter += 10; 
	scoreCounter.innerHTML = `Score: ${this.counter}`;
	this.reset() 
}

Player.prototype.handleInput = function(key) {
	//check if player is within boundries
	if (key === 'left' && this.x > 0) {
		this.x -= 100;
	} else if (key === 'right' && this.x < 400) {
		this.x += 100;
	} else if (key === 'up' && this.y > -35) {
		this.y -= 85;
	} else if (key === 'down' && this.y < 390) {
		this.y += 85;
	}
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = [new Enemy(0, 130, 60), new Enemy (0, 220, 120), new Enemy(120, 55, 180)];

const player = new Player(200, 390, 0);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

//Custom functionality
//Gems
const Gem = function(x, y) {
	this.x = x;
	this.y = y;
	this.sprite = 'images/Gem-Orange.png';
}

Gem.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

const gem = new Gem(200, 100);

