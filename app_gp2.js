const gameScreen = document.getElementById("gameScreen");
const playerShip = document.getElementById("playerShip");
const alienShipsContainer = document.getElementById("alienShipsContainer");
const startGameBtn = document.getElementById("startGameBtn");
const attackBtn = document.getElementById("attackBtn");
const retreatBtn = document.getElementById("retreatBtn");
const gameOutput = document.getElementById("gameOutput");

// Utility function for logging messages
function logMessage(message) {
  gameOutput.innerText += message + "\n";
  gameOutput.scrollTop = gameOutput.scrollHeight;
}

// Spaceship Class
class Spaceship {
  constructor(name, hull, firepower, accuracy, imageSrc) {
    this.name = name;
    this.hull = hull;
    this.firepower = firepower;
    this.accuracy = accuracy;
    this.element = null;
    this.imageSrc = imageSrc;
  }

  render(x, y) {
    const shipEl = document.createElement("img");
    shipEl.src = this.imageSrc;
    shipEl.className = "alienShip";
    shipEl.style.left = `${x}px`;
    shipEl.style.top = `${y}px`;
    alienShipsContainer.appendChild(shipEl);
    this.element = shipEl;
  }

  takeDamage(amount) {
    this.hull -= amount;
    if (this.hull <= 0) {
      this.element.src = "images/explosion.png";
      setTimeout(() => this.element.remove(), 500);
    }
  }
}

// Game Class
class SpaceBattle {
  constructor() {
    this.player = new Spaceship("USS Assembly", 20, 5, 0.7, "images/player-ship.png");
    this.aliens = [];
    this.currentAlienIndex = 0;
    this.createAliens(6);
  }

  createAliens(num) {
    for (let i = 0; i < num; i++) {
      const hull = Math.floor(Math.random() * 4) + 3;
      const firepower = Math.floor(Math.random() * 3) + 2;
      const accuracy = (Math.random() * 0.2 + 0.6).toFixed(2);
      const alien = new Spaceship(`Alien Ship ${i + 1}`, hull, firepower, accuracy, "images/alien-ship.png");
      this.aliens.push(alien);
    }
  }

  startGame() {
    logMessage("Game started! Destroy all alien ships.");
    alienShipsContainer.innerHTML = "";
    let xPos = 50;
    this.aliens.forEach((alien) => {
      alien.render(xPos, 50);
      xPos += 120;
    });
    this.nextTurn();
  }

  nextTurn() {
    const alien = this.aliens[this.currentAlienIndex];
    if (!alien) {
      logMessage("You destroyed all alien ships. You win!");
      return;
    }
    logMessage(`Fighting ${alien.name} | Hull: ${alien.hull}`);
    attackBtn.disabled = false;
    retreatBtn.disabled = false;
  }

  playerAttack() {
    const alien = this.aliens[this.currentAlienIndex];
    if (Math.random() < this.player.accuracy) {
      logMessage(`You hit ${alien.name} for ${this.player.firepower} damage.`);
      alien.takeDamage(this.player.firepower);
      if (alien.hull <= 0) {
        logMessage(`${alien.name} destroyed!`);
        this.currentAlienIndex++;
        this.nextTurn();
      } 
      else {
        this.alienAttack();
      }
    } 
    else {
      logMessage("You missed!");
      this.alienAttack();
    }
  }

  alienAttack() {
    const alien = this.aliens[this.currentAlienIndex];
    if (Math.random() < alien.accuracy) {
      logMessage(`${alien.name} hit you for ${alien.firepower} damage!`);
      this.player.hull -= alien.firepower;
      if (this.player.hull <= 0) {
        logMessage("You were destroyed! Game Over.");
        attackBtn.disabled = true;
        retreatBtn.disabled = true;
      }
    } 
    else {
      logMessage(`${alien.name} missed!`);
    }
  }

  retreat() {
    logMessage("You chose to retreat. Game Over.");
    attackBtn.disabled = true;
    retreatBtn.disabled = true;
  }
}

const game = new SpaceBattle();

startGameBtn.addEventListener("click", () => game.startGame());
attackBtn.addEventListener("click", () => game.playerAttack());
retreatBtn.addEventListener("click", () => game.retreat());
