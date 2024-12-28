// Game Elements
const startGameBtn = document.getElementById("startGameBtn");
const attackBtn = document.getElementById("attackBtn");
const retreatBtn = document.getElementById("retreatBtn");
const gameOutput = document.getElementById("gameOutput");

// Utility function to log output
function logMessage(message) {
  console.log(message);
  gameOutput.innerText += message + "\n";
  gameOutput.scrollTop = gameOutput.scrollHeight; // Auto-scroll
}

// Spaceship Class
class Spaceship {
  constructor(name, hull, firepower, accuracy) {
    this.name = name;
    this.hull = hull;
    this.firepower = firepower;
    this.accuracy = accuracy;
  }

  // Attack Method
  attack(target) {
    if (Math.random() < this.accuracy) {
      logMessage(`${this.name} hit ${target.name} for ${this.firepower} damage!`);
      target.hull -= this.firepower;
    } else {
      logMessage(`${this.name} missed!`);
    }
  }

  // Check if ship is destroyed
  isDestroyed() {
    return this.hull <= 0;
  }
}

// Alien Factory
function generateAliens(num) {
  const aliens = [];
  for (let i = 1; i <= num; i++) {
    const hull = Math.floor(Math.random() * 4) + 3; // 3 to 6
    const firepower = Math.floor(Math.random() * 3) + 2; // 2 to 4
    const accuracy = (Math.random() * 0.2 + 0.6).toFixed(2); // 0.6 to 0.8
    aliens.push(new Spaceship(`Alien Ship ${i}`, hull, firepower, parseFloat(accuracy)));
  }
  return aliens;
}

// Game Logic
class SpaceBattleGame {
  constructor() {
    this.player = new Spaceship("USS Assembly", 20, 5, 0.7);
    this.aliens = generateAliens(6);
    this.currentAlienIndex = 0;
    this.gameOver = false;
  }

  // Start the Game
  start() {
    logMessage("Welcome to the Space Battle Game!");
    logMessage("You are piloting the USS Assembly.");
    logMessage("Prepare for battle against alien ships!");
    this.enableGameButtons();
    this.nextTurn();
  }

  // Process a single turn
  nextTurn() {
    if (this.gameOver) return;

    const currentAlien = this.aliens[this.currentAlienIndex];

    // Check if the player destroyed all aliens
    if (!currentAlien) {
      logMessage("Congratulations! You destroyed all alien ships! You win!");
      this.endGame();
      return;
    }

    logMessage(`\nYou are fighting ${currentAlien.name} (Hull: ${currentAlien.hull})`);
  }

  // Handle Player Attack
  playerAttack() {
    const currentAlien = this.aliens[this.currentAlienIndex];

    // Player attacks the alien
    this.player.attack(currentAlien);

    // Check if the alien is destroyed
    if (currentAlien.isDestroyed()) {
      logMessage(`${currentAlien.name} has been destroyed!`);
      this.currentAlienIndex++;

      // Prompt the player for the next action
      const choice = window.prompt("Do you want to (A)ttack the next ship or (R)etreat?", "A");
      if (choice && choice.toLowerCase() === "r") {
        logMessage("You chose to retreat! Game Over.");
        this.endGame();
      } else {
        this.nextTurn();
      }
    } else {
      this.alienAttack();
    }
  }

  // Handle Alien Attack
  alienAttack() {
    const currentAlien = this.aliens[this.currentAlienIndex];

    // Alien attacks the player
    currentAlien.attack(this.player);

    // Check if the player is destroyed
    if (this.player.isDestroyed()) {
      logMessage("USS Assembly has been destroyed! Game Over.");
      this.endGame();
    } else {
      logMessage(`Your hull: ${this.player.hull}`);
    }
  }

  // End the game
  endGame() {
    this.disableGameButtons();
    this.gameOver = true;
    logMessage("Thanks for playing!");
  }

  // Enable buttons for game actions
  enableGameButtons() {
    attackBtn.disabled = false;
    retreatBtn.disabled = false;
  }

  // Disable buttons
  disableGameButtons() {
    attackBtn.disabled = true;
    retreatBtn.disabled = true;
  }
}

// Initialize the Game
let game;

startGameBtn.addEventListener("click", function () {
  gameOutput.innerText = "";
  game = new SpaceBattleGame();
  game.start();
});

attackBtn.addEventListener("click", function () {
  game.playerAttack();
});

retreatBtn.addEventListener("click", function () {
  logMessage("You chose to retreat! Game Over.");
  game.endGame();
});
