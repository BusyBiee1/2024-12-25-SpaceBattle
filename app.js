// Element handles
const gameScreen = document.getElementById("gameScreen");
const playerShip = document.getElementById("playerShip");
const alienShipsContainer = document.getElementById("alienShipsContainer");
const startGameBtn = document.getElementById("startGameBtn");
const attackBtn = document.getElementById("attackBtn");
const retreatBtn = document.getElementById("retreatBtn");
const gameOutput = document.getElementById("gameOutput");

// Sound files
const sounds = {
  usShoot: new Audio("sounds/US_Shoot2.mp3"),
  alienShoot: new Audio("sounds/Alien_Shoot1.mp3"),
  //usMiss: new Audio("sounds/us_miss.mp3"),
  //alienMiss: new Audio("sounds/alien_miss.mp3"),
  hullHit: new Audio("sounds/hullHit.mp3"),
  alienDestroyed: new Audio("sounds/Alien_Destroyed2.mp3"),
  usDestroyed: new Audio("sounds/US_Destroyed.mp3"),

};

// display state of game as battles happens
function logMessage(message) {
  if (message === "screen-clear") {
    gameOutput.innerText = "";
    gameOutput.scrollTop = gameOutput.scrollHeight;
    console.log (gameOutput.innerText)
  }
  else {
    gameOutput.innerText += message + "\n\n";
    gameOutput.scrollTop = gameOutput.scrollHeight;
  }
}


// The US spaceship Class
class Spaceship {
  constructor(name, hull, firepower, accuracy, imageSrc) {
    this.name = name;
    this.hull = hull;
    this.firepower = firepower;
    this.accuracy = accuracy;
    this.element = null;
    this.imageSrc = imageSrc;
  }

  // The alienshop class display renderer
  render(x, y) {
    const shipEl = document.createElement("img");
    shipEl.src = this.imageSrc;
    shipEl.className = "alienShip";
    shipEl.style.left = `${x}px`;
    shipEl.style.top = `${y}px`;
    alienShipsContainer.appendChild(shipEl);
    this.element = shipEl;
  }

  // to keep track of damage 
  takeDamage(amount) {
    this.hull -= amount;
    if (this.hull <= 0) {
      sounds.alienDestroyed.play();
      //this.imageSrc = "images/explosion.png";
      this.element.src = "images/explosion.png";
      setTimeout(() => this.element.remove(), 500);
    }
    else {
      sounds.hullHit.play();
      
    }
  }
}

// Game Class
class SpaceBattle {
  constructor() {
 //   this.player = new Spaceship("USS Assembly", 20, 5, 0.7, "images/player-ship.png");
    this.player = new Spaceship("USS Assembly", 20, 5, 0.7, "images/player-ship.png");
    this.aliens = [];
    this.currentAlienIndex = 0;
    this.createAliens(6);
  }

  // creating diffent alien ships
  createAliens(num) {
    for (let i = 0; i < num; i++) {
      const hull = Math.floor(Math.random() * 4) + 3;
      const firepower = Math.floor(Math.random() * 3) + 2;
      const accuracy = (Math.random() * 0.2 + 0.6).toFixed(2);
      const alien = new Spaceship(`Alien Ship ${i + 1}`, hull, firepower, accuracy, "images/alien-ship.png");
      //const alien = new Spaceship(`Alien Ship ${i + 1}`, hull, firepower, accuracy, "images/alien-ship.png"); 
      this.aliens.push(alien);
    }
  }

    // Clear removes ball from the game screen (usually when the fame is over)
  //clearAlienShips() {
  //    /* is seems necessary to remove all .ball elements using a loop because since the .ball element is created dynamically there could be a csenarios wehre mulitple .ball elements are created especially after end game and before start game and after ball catch failed and ball throw starts */
  //    aliens.forEach((alien) => alien.pop());  /* look thru the document element by selecting all elements by name ball and remove them.  */
  //}  
  

  // game start point
  startGame() {
    logMessage("screen-clear");
    //gameOutput.innerText = "";
    logMessage("Game started! Destroy all alien ships....");    
    attackBtn.disabled = false;
    retreatBtn.disabled = false;
    alienShipsContainer.innerHTML = "";
    playerShip.src = "images/player-ship.png";
    let xPos = 50;
    this.aliens.forEach((alien) => {
      alien.render(xPos, 50);
      xPos += 120;
    });
    this.nextTurn();
  }
 
  // moving from one alien ship to another after its destruction
  nextTurn() {
    const alien = this.aliens[this.currentAlienIndex];
    if (!alien) {
        console.log("no aliens");
        logMessage("You destroyed all alien ships. You win!");
      //attackBtn.disabled = true;
      //retreatBtn.disabled = true;
      //logMessage("screen-clear");
      //this.aliens.forEach((alien) => alien.pop()); 
      //clearAlienShips();
      return;
    }
    logMessage(`Fighting Alien Ship: ${alien.name} | It's Hull Strenght: ${alien.hull}`);
    attackBtn.disabled = false;
    retreatBtn.disabled = false;
  }
 
  // US ship attack event 
  playerAttack() {
    const alien = this.aliens[this.currentAlienIndex];
    sounds.usShoot.play(); // Play player shooting sound
    //let alienHullPastValue;
    //let alientAfterHitValue;
    if (Math.random() < this.player.accuracy) {
      //alienHullPastValue = alien.hull;
      //alientAfterHitValue=iif((alien.hull - this.player.firepower)>0) ? (alien.hull - this.player.firepower) : (0);
      logMessage(`You hit ${alien.name} for -> ${this.player.firepower} damage.`);
      //logMessage(`You hit Alien Ship: ${alien.name} for ${this.player.firepower} point Hull damage. Hull strength left: ${iif((alien.hull - this.player.firepower)>0) ? (alien.hull - this.player.firepower) : (0)}`);
      alien.takeDamage(this.player.firepower);
      if (alien.hull <= 0) {
        //logMessage(`Alien Ship: ${alien.name} is destroyed! It had a Hull strength left of ${alienHullPastValue}`);
        logMessage(`${alien.name} destroyed!`);
        this.currentAlienIndex++;
        this.nextTurn();
      } 
      else {
      //  logMessage("You missed!");
        this.alienAttack();
      }
    } 
    else {
      logMessage(`You missed hitting the Alien Ship: ${alien.name}!"`);
      //sounds.usMiss.play(); // Play miss sound
      this.alienAttack();
    }
  }

  // Alien ship attack event 
  alienAttack() {
    const alien = this.aliens[this.currentAlienIndex];
    sounds.alienShoot.play(); // Play alien shooting sound

    if (Math.random() < alien.accuracy) {
      this.player.hull -= alien.firepower;
      logMessage(`${alien.name} hit you for -> ${alien.firepower} damage! Your Hull strenght is: ${this.player.hull}`);

      if (this.player.hull <= 0) {
        logMessage("You were destroyed! Game Over.");
        sounds.usDestroyed.play(); // Play player destroyed sound
        //this.imageSrc = "images/explosion.png";
        //this.element.src = "images/explosion.png";
        playerShip.src = "images/explosion.png";
        //this.remove
        attackBtn.disabled = true;
        retreatBtn.disabled = true;
      }
    } 
    else 
    {
      logMessage(`Alien Ship: ${alien.name} missed hitting you!`);
      //sounds.alienMiss.play(); // Play alien miss sound
    }
  }

  // retreat functionality
  retreat() {
    logMessage("You chose to retreat. Game Over.");
    attackBtn.disabled = true;
    retreatBtn.disabled = true;
  }
}

const game = new SpaceBattle();

// Event handles for click event of buttons
startGameBtn.addEventListener("click", () => game.startGame());
attackBtn.addEventListener("click", () => game.playerAttack());
retreatBtn.addEventListener("click", () => game.retreat());

