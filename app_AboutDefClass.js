
//////// in class morning quick 10 min assignment to solve: /////////////////////////////////

// function findLargest(a, b, c) {
    // Your code here
    let largest = a; 
    if (b > largest) {
        largest = b;
    }
    if (c > largest) {
        largest = c;
    }
    return largest;
}

console.log(findLargest(5, 10, 3)); // Output: 10
console.log(findLargest(8, 2, 6)); // Output: 8
console.log("==================");


/// i did not finish this second item
//function reverseWords(sentence) {
//    // Your code here
//    const temp1 = sentence.split(" ");
//    let  temp2 = [];
//    temp2 = temp1;
//    console.log(temp2)
//    i = temp2.length-1;
//    temp1.forEach((word,index) => { 
//        console.log(`index = ${index}`);        
//        console.log(`i = ${i}`); 
//        temp2[i]= word;
//        i--;
//    });
//    return temp2;
//}
//console.log(reverseWords("tom goes to shop"));


//////////////////////////////////////////////////////////////////////////////////

/// class notes from brian about classes and all related to class /////////////////

/////////////
// Classes //
/////////////

class Student {
    constructor(name, gpa, location) {
      this.name = name;
      this.gpa = gpa;
      this.location = location;
    }
  }
  
  // let john = new Student('John', 4.0, 'Pittsburgh');
  // let max = new Student('Max', 3.5, 'Idaho');
  // console.log(john, max);
  
class Animal {
    constructor(eyes, legs, isAwake, isMoving) {
      this.eyes = eyes;
      this.legs = legs;
      this.isAwake = isAwake;
      this.isMoving = isMoving;
    }
    sleep() {
      this.isAwake = false;
    }
    wake() {
      this.isAwake = true;
    }
    sit() {
      this.isMoving = false;
    }
    walk() {
      this.isMoving = true;
    }
    speak(sound) {
      console.log(sound);
    }
    // Overriding the .toString() method that the Animal class has inherited from the Object class by default
    toString(animal = 'Animal') {
      console.log(`This ${animal} has ${this.eyes} eyes and ${this.legs} legs. It ${this.isAwake ? 'is' : 'is not'} awake, and ${this.isMoving ? 'is' : 'is not'} moving.`);
    }
  }
  
  // const cat1 = new Animal(2, 4, true, false);
  // const cat2 = new Animal(2, 4, false, false);
  // const dog1 = new Animal(2, 4, true, true);
  // const cow1 = new Animal(2, 4, true, false);
  // console.log(cat1);
  
  
  /////////////////
  // Inheritance //
  /////////////////
  
  class Cat extends Animal {
    constructor(fur, isAwake, isMoving) {
      super(2, 4, isAwake, isMoving);
      this.fur = fur;
    }
    speak() {
      super.speak("Meow...");
    }
    toString() {
      super.toString("Cat");
    }
  }
  
  class Dog extends Animal {
    constructor(fur, isAwake, isMoving) {
      super(2, 4, isAwake, isMoving);
      this.fur = fur;
    }
    speak() {
      super.speak("Woof!");
    }
    toString() {
      super.toString("Dog");
    }
  }
  
  class Cow extends Animal {
    constructor(hair, isAwake, isMoving) {
      super(2, 4, isAwake, isMoving);
      this.hair = hair;
    }
    speak() {
      super.speak("Moo.");
    }
    toString() {
      super.toString("Cow");
    }
  }
  
  // const cat1 = new Cat("Orange", true, false);
  // const cat2 = new Cat("Black and White", false, false);
  // const dog1 = new Dog("Gold", true, true);
  // const cow1 = new Cow("Brown", true, false);
  // cat1.speak(); cat1.toString();
  // dog1.speak(); dog1.toString();
  // cow1.speak(); cow1.toString();
  
  // Exercise
  class Human extends Animal {
    constructor(isAwake, isMoving, fullName, age, occupation) {
      super(2, 2, isAwake, isMoving);
      this.fullName = fullName;
      this.age = age;
      this.occupation = occupation;
    }
    introduce() {
      console.log(`Hello, my name is ${this.fullName}, and I'm a ${this.age}-year-old ${this.occupation}!`);
    }
  }
  
  // const human1 = new Human(true, true, 'Bryan Santos', 30, 'Developer')
  // human1.introduce()
  
  
  /////////////////////////////////
  // Encapsulation & Abstraction //
  /////////////////////////////////
  
  /*
    Abstraction and encapsulation are easy to confuse because they are so closely related. 
    Abstraction is the hiding of the details of data and process implementation, whereas encapsulation describes how abstraction occurs within the program.
    Abstraction is a design-level concept, whereas encapsulation is an implementation-level concept.
  */
  
  class Learner {
    #grades = [];
    #name = { first: '', last: '' };
    #age;
  
    constructor(firstName, lastName, age) {
      this.#name.first = firstName;
      this.#name.last = lastName;
      this.#age = age;
    }
  
    get name() { // Data Abstraction
      return this.#name.first + ' ' + this.#name.last;
    }
  
    get age() {
      return this.#age;
    }
  
    get grades() {
      return this.#grades;
    }
  
    // set grades(grade) {
    //   grade = Number(grade);
    //   if (grade >= 0 && grade <= 100) this.#grades.push(grade);
    // }
  
    addGrades(...grades) { // Process Abstraction 
      grades = grades.flat();
      grades.forEach(grade => {
        grade = Number(grade);
        if (grade >= 0 && grade <= 100) this.#grades.push(grade);
      })
    }
  
    get average() { // Process Abstraction 
      const arr = [...this.#grades];
      arr.sort((a, b) => a - b).shift();
      return arr.reduce((total, currentVal) => total + currentVal) / arr.length;
    }
  }
  
  const learner = new Learner('Leeroy', 'Jenkins', 18);
  console.log(learner.name, learner.age)
  console.log(learner.grades);
  learner.addGrades([95, 87, 66], "98", "100", -60, 88, 89, [100, 76, 88], 105)
  console.log(learner.grades);
  console.log(learner.average);
  
  
  //////////////////
  // Polymorphism //
  //////////////////
  
  /*
    Polymorphism is the ability of a single thing to take on many forms (poly = many; morph = change form). 
    In the context of OOP and JavaScript, this means the ability for one object to have multiple realizations 
    that each implement the same functionality, but work in differrent ways.
  
    For example, we can call the same speak() method on each of the instances of the Animal classes, but it will behave differently. 
    This is an example of polymorphism - common functionality with unique behavior. toString() is similarly polymorphic.
  */
  
  ///////////////////////////////////
  // Static Properties and Methods //
  ///////////////////////////////////
  
  /*
    So far, we've been instantiating all of our examples in order to work with them, but we know from experience that this is not always necessary. 
    The Math.random() method, which we have mentioned before, does not require an instance of the Math class in order for it to be called. 
    Similarly, the property Math.PI can be accessed without instantiation. These are called "static" properties and methods.
  
    - Static methods are often used to create utility functions that perform actions that are independant of the state of an individual object.
    - Static properties are useful for caches, fixed-configuration values, or other data that does not need to be replicated across each instance of the class's objects.
  */
  
  class Grades {
    static getAverage(...grades) {
      const arr = [];
  
      grades = grades.flat();
      grades.forEach(grade => {
        grade = Number(grade);
        if (grade >= 0 && grade <= 100) arr.push(grade);
      })
  
      arr.sort((a, b) => a - b).shift();
  
      return arr.reduce((total, currentVal) => total + currentVal) / arr.length;
    }
  }
  
  // console.log(Grades.getAverage([95, 87, 66], "98", "100", -60, 88, 89, [100, 76, 88], 105))
  
  /////////////////////////////////////////////////
  ///// Learner and Grades classes refactored /////
  /////////////////////////////////////////////////
  
  class NewLearner {
    #name = {
      first: "",
      last: ""
    };
    #age;
    #grades;
    
    constructor(firstName, lastName, age) {
      this.#name.first = firstName;
      this.#name.last = lastName;
      this.#age = age;
      this.#grades = new NewGrades();
    }
  
    get name() {
      return this.#name.first + " " + this.#name.last;
    }
    get age() {
      return this.#age;
    }
    get grades() {
      return this.#grades.grades;
    }
    get average() {
      return this.#grades.average;
    }
    
    addGrades(...grades) {
      this.#grades.addGrades(grades);
    }
  }
  
  class NewGrades {
    #grades = [];
  
    constructor(initialGrades) {
      if (initialGrades) {
        this.addGrades(initialGrades);
      }
    }
  
    get grades() {
      return this.#grades;
    }
    get average() {
      return NewGrades.avgArray(this.#grades);
    }
  
    static getAverage(...grades) {
      const arr = [];
      this.addToArray(arr, grades);
      return this.avgArray(arr);
    }
    static addToArray(arr, grades) {
      grades = grades.flat();
      grades.forEach((grade) => {
        grade = Number(grade);
  
        if (grade >= 0 && grade <= 100) {
          arr.push(grade);
        }
      });
    }
    static avgArray(gradeArray) {
      const arr = [...gradeArray];
      arr.sort((a, b) => a - b).shift();
  
      return arr.reduce((a, b) => a + b) / arr.length;
    }
  
    addGrades(...grades) {
      NewGrades.addToArray(this.#grades, grades.flat());
    }
  }
  
  // const newLearner = new NewLearner('John', 'Smith', 17);
  // console.log(newLearner.name, newLearner.age)
  // console.log(newLearner.grades);
  // newLearner.addGrades([95, 87, 66], "98", "100", -60, 88, 89, [100, 76, 88], 105)
  // console.log(newLearner.grades);
  // console.log(newLearner.average);