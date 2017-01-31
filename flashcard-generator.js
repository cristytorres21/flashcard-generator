// inquirer npm package
var inquirer = require("inquirer");

// constructor function for basic card
function BasicCard(front, back) {
	//properties for the cards
	this.front = front;
	this.back = back; 
}

//constructor function for cloze card
function ClozeCard(text, cloze) {
  this.text = text; //partial text
  this.cloze = cloze; //deleted text
  this.fulltext = function() {
    return this.text + this.cloze; //full text
  }
}


//flashcard questions, set to new basic card
var q1 = new BasicCard("H is the symbol for what element?", "Hydrogen");
var q2 = new BasicCard("K is the symbol for what element?", "Potassium");
var q3 = new BasicCard("Cu is the symbol for what element?", "Copper");
var q4 = new BasicCard("Ag is the symbol for what element?", "Silver");
var q5 = new BasicCard("P is the symbol for what element?", "Phosphorous");
var q6 = new BasicCard("Au is the symbol for what element?", "Gold");
var q7 = new BasicCard("Si is the symbol for what element?", "Silicon");
var q8 = new BasicCard("Fe  is the symbol for what element?", "Iron");

//cloze flashcards
var c1 = new ClozeCard("The symbol for Hydrogen is ", "H");
var c2 = new ClozeCard("The symbol for Potassium is ", "K");
var c3 = new ClozeCard("The symbol for Copper is ", "Cu");
var c4 = new ClozeCard("The symbol for Silver is ", "Ag");
var c5 = new ClozeCard("The symbol for Phosphorous is ", "P");
var c6 = new ClozeCard("The symbol for Gold is ", "Au");
var c7 = new ClozeCard("The symbol for Silicon is ", "S");
var c8 = new ClozeCard("The symbol for Iron ", "Fe");

// counts how many times questions have been asked
var count = 0;

// stores questions
var questions = [q1, q2, q3, q4, q5, q6, q7, q8];
// stores cloze cards
var clozeCards = [c1, c2, c3, c4, c5, c6, c7, c8];


// basic cards
var askBasic = function() {

  if (count < questions.length) {
    inquirer.prompt([{

      name: "response",
      message: questions[count].front
    }
    ]).then(function(answers) {
      
      // check answers
      if (answers.response === questions[count].back) {
      	console.log("Correct");
      } else {
      	console.log("Wrong. " + questions[count].back);
      }
      count++;
      askQuestion();
    });
  } else {
      
      var endGame = true;
      count = 0;
      if (endGame === true) {
        
        inquirer.prompt([{
      	  type: "confirm",
      	  name: "game",
      	  message: "Do you want to play again?"
        }
        ]).then(function (answers) {
        	
          if(answers.game === true) {
        		startgame();
            endGame = false;
        } else {
        	console.log("See you next time!");
        }
      });
    }
  }
}

// cloze cards
var askCloze = function() {
  if (count < clozeCards.length) {
    
    inquirer.prompt([{
      name: "response",
      message: clozeCards[count].text + "____________"
    }]).then(function(answers) {
      
      //if statements to check answers
      if (answers.response === clozeCards[count].cloze) {
        console.log("Correct");
      } else {
        console.log("Wrong. " + clozeCards[count].fulltext());
      }
      
      count++;
      askCloze();
    });
  } else {

    var endGame = true;
    count = 0;
    if (endGame === true) {

      inquirer.prompt([{
        type: "confirm",
        name: "game",
        message: "Do you want to play again?"
      }]).then(function (answers) {
            
        if(answers.game === true) {
          startgame();
          endGame = false;
        } else {
          console.log("See you next time!");
        }
      });
    }
  }
} 

// start game function
var startgame = function () {
  inquirer.prompt([{

    name: "start",
    type: "list",
    message: "Select Basic Flashcards or Cloze Flashcards.",
    choices: ["Basic", "Cloze"]

  }]).then(function (answers) {
    if (answers.start === "Basic") {
      askBasic();
    }
    else {
      askCloze();
    }
  });
}

startgame();