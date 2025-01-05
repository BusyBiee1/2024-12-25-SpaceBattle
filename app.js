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

// Global variable to keep track of PlayerShipHull hit count for every game
let playerHullCount;

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


// Class: The US spaceship Class
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
      //this.alien = null; //-//
    }
    else {
      sounds.hullHit.play(); 
    }
  }
}

// Game Class wher aliens are created and game is played
class SpaceBattle {
  constructor() {
 //   this.player = new Spaceship("USS Assembly", 20, 5, 0.7, "images/player-ship.png");
    this.player = new Spaceship("USS Assembly", 20, 5, 0.7, "images/player-ship.png");
  }

  // creating diffent alien ships
  createAliens(num) {
    for (let i = 0; i < num; i++) {
      const hull = Math.floor(Math.random() * 4) + 3;
      const firepower = Math.floor(Math.random() * 3) + 2;
      const accuracy = (Math.random() * 0.2 + 0.6).toFixed(2);
      const alien = new Spaceship(`Alien Ship: ${i + 1}`, hull, firepower, accuracy, "images/alien-ship.png");
      this.aliens.push(alien);
    }
  }

  startGame() {
    //initialize game
    playerHullCount = game.player.hull;
    this.aliens = [];
    game.createAliens(6); //-//
    this.currentAlienIndex = 0;
    logMessage("screen-clear");
    logMessage("--- GAME STARTED! ---");
    logMessage("Destroy all alien ships....");    
    attackBtn.disabled = false;
    retreatBtn.disabled = false;

    //create and put alien ships
    alienShipsContainer.innerHTML = "";
    playerShip.src = "images/player-ship.png";
    let xPos = 50;
    this.currentAlienIndex = 0; //-//
    this.aliens.forEach((alien) => {
      alien.render(xPos, 50);
      xPos += 100;
    });
    this.nextTurn();
  }
 
  // moving from one alien ship to another after its destruction
  nextTurn() {
    const alien = this.aliens[this.currentAlienIndex];
    if (!alien) {
        logMessage("You destroyed all alien ships!");
        logMessage("--- YOU WIN! --- ");
        attackBtn.disabled = true;
        retreatBtn.disabled = true;
        return;
    }
    //console.log(this.currentAlienIndex);
    //alien.hull = Math.floor(Math.random() * 4) + 3; //-//
    //firepower 
    //--------/alien.hull = Math.floor(Math.random() * 4) + 3; //-//
    logMessage(`Fighting ${alien.name} | Hull: ${alien.hull}, firepower: ${alien.firepower}, accuracy: ${alien.accuracy}`); 
    //logMessage(`Alien Ship name: ${alien.name}`); 
    logMessage(`Your USS Assembly:  | Hull: ${playerHullCount}, firepower: ${this.player.firepower}, accuracy: ${this.player.accuracy}`); 
//--//    logMessage(`Alien Hull Strenght: ${alien.hull} | Yours: ${this.player.hull}`);
    //attackBtn.disabled = false;
    //retreatBtn.disabled = false;
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
      
      logMessage(`Alien Hull Strenght: ${alien.hull} | Yours: ${playerHullCount}`);
//--//      logMessage(`Alien Hull Strenght: ${alien.hull} | Yours: ${this.player.hull}`);
      //logMessage(`You hit Alien Ship: ${alien.name} for ${this.player.firepower} point Hull damage. Hull strength left: ${iif((alien.hull - this.player.firepower)>0) ? (alien.hull - this.player.firepower) : (0)}`);
      alien.takeDamage(this.player.firepower);
      if (alien.hull <= 0) {
        //logMessage(`Alien Ship: ${alien.name} is destroyed! It had a Hull strength left of ${alienHullPastValue}`);
        logMessage(`${alien.name} destroyed! ... with your firepower of: ${this.player.firepower}`);
        logMessage("----------------------------------------------------------");
        //        logMessage(`... with your firepower of: ${this.player.firepower} against alien hull strenght of: ${alien.hull}`);
        //logMessage(`... with your firepower of: ${this.player.firepower}`);
        this.currentAlienIndex++;
        this.nextTurn();
      } 
      else {
      //  logMessage("You missed!");
        this.alienAttack();
      }
    } 
    else {
      //logMessage(`You missed hitting the Alien Ship: ${alien.name}! | It's Hull Strenght: ${alien.hull}`);
      logMessage(`You missed hitting the ${alien.name}!`);
      
      logMessage(`Alien Hull Strenght: ${alien.hull} | Yours: ${playerHullCount}`);
//--//      logMessage(`Alien Hull Strenght: ${alien.hull} | Yours: ${this.player.hull}`);
      //sounds.usMiss.play(); // Play miss sound
      this.alienAttack();
    }
  }

  // Alien ship attack event 
  alienAttack() {
    const alien = this.aliens[this.currentAlienIndex];
    sounds.alienShoot.play(); // Play alien shooting sound

    if (Math.random() < alien.accuracy) {
      playerHullCount -= alien.firepower;
      //logMessage(`${alien.name} hit you for -> ${alien.firepower} damage! Your Hull strenght is: ${this.player.hull}`);
      logMessage(`${alien.name} hit you for -> ${alien.firepower} damage!`);
      if (playerHullCount <= 0) {
        logMessage(`You were destroyed! ... with Alien firepower of: ${alien.hull}`);
        logMessage("---GAME OVER!---");    
        sounds.usDestroyed.play(); // Play player destroyed sound
        playerShip.src = "images/explosion.png";
        attackBtn.disabled = true;
        retreatBtn.disabled = true;
      }
      else {
        logMessage(`Alien Hull Strenght: ${alien.hull} | Yours: ${playerHullCount}`);
      }
    } 
    else 
    {
      logMessage(`${alien.name} missed hitting you!`);
      logMessage(`Alien Hull Strengh: ${alien.hull} | Yours: ${playerHullCount}`);
    }
  }

  // retreat functionality
  retreat() {
    logMessage("You chose to retreat. Game Over.");
    attackBtn.disabled = true;
    retreatBtn.disabled = true;
  }
}

const game = new SpaceBattle();   //-//

// Event handles for click event of buttons
startGameBtn.addEventListener("click", () => game.startGame());
attackBtn.addEventListener("click", () => game.playerAttack());
retreatBtn.addEventListener("click", () => game.retreat());

