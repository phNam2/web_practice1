var playing = false;
var score;
var timeRemaining;
var ans;
var question ;

var mode;
var numbers;
var digits;


////If we click on the reset/start button
//document.getElementById("reset").onclick = 
//    function() {
//    // If we are playing   
//    if (playing == true) {  
//        location.reload(); // Reload the page
//    } else {
//        document.getElementById("gameover").style.display = "none";
//        // If we are not playing
//        playing = true; // changing mode
//        score = 0; // set score to 0
//        document.getElementById("scorevalue").innerHTML = score;
//        // Show countdown box
//        document.getElementById("timing").style.display = "block";
//        // change button to Reset
//        document.getElementById("reset").innerHTML = "Reset Game";
//        
////        // Reduce time by 1 sec
////        timeRemaining = 11;
//        startCountdown();
//        
//        // generate Q&A
//        question = 0;
//        generateQA();
//    } 
//}


// The type of game button in the first page
document.getElementById("normal").onclick = function() {
    hide("title");
    hide("normal");
    hide("fast");
    hide("one");
    show("second");
    mode = 1;
}

document.getElementById("fast").onclick = function() {
    hide("title");
    hide("normal");
    hide("fast");
    hide("one");
    show("second");
    mode = 2;
}

document.getElementById("one").onclick = function() {
    hide("title");
    hide("normal");
    hide("fast");
    hide("one");
    show("second");
    mode = 3;
}

// The difficulity button in the second page
document.getElementById("21").onclick = function() {
    hide("container1");
    show("container2");
    numbers = 2;
    digits = 1;
    
    gameStart();
}

document.getElementById("22").onclick = function() {
    hide("container1");
    show("container2");
    numbers = 2;
    digits = 2;
}

document.getElementById("31").onclick = function() {
    hide("container1");
    show("container2");
    numbers = 3;
    digits = 1;
}

document.getElementById("32").onclick = function() {
    hide("container1");
    show("container2");
    numbers = 3;
    digits = 2;
}

document.getElementById("2decimal").onclick = function() {
    hide("container1");
    show("container2");
    numbers = 2;
    digits = 0;
}

document.getElementById("3decimal").onclick = function() {
    hide("container1");
    show("container2");
    numbers = 3;
    digits = 0;
}


// The reset button that go back to the first page
document.getElementById("reset").onclick = function() {
    // Reload the page
    location.reload();
}


// Game start
function gameStart() {     
    hide("gameover"); 
    playing = true; // changing mode
    score = 0; // set score to 0
    
    document.getElementById("scorevalue").innerHTML = score;
        
    // Show countdown box
    show("timing");
        
    // Reduce time by 1 sec
    // timeRemaining = 11;
    startCountdown();
        
    // generate Q&A
    question = 0;
    generateQA();
}


function startCountdown() {
    action = setInterval(function() {
        timeRemaining -= 1;
        document.getElementById("left").innerHTML = timeRemaining;
        
        // Game over
        if (timeRemaining == 0) {
            stopCounting();
            gameOver();
        }
    }, 1000);
}

// Stop the clock
function stopCounting() {
    clearInterval(action);
}

// After the game end
function gameOver() {
    playing = false;
    document.getElementById("reset").innerHTML = "Start Game";
    hide("timing");
    show("gameover");
    document.getElementById("result").innerHTML = score;
}

// Q&A
function generateQA() {
    if (question < 10) {
        
        question++;
        // Set the time back
        timeRemaining = 11;
    
        // generate question
        var x = 1+Math.round(9*Math.random());
        var y = 1+Math.round(9*Math.random());
        ans = x*y;
        document.getElementById("question").innerHTML = x + "x" + y;
    
        // generate answers
        var correctPos = 1+Math.round(3*Math.random());
        var answers = [ans];
    
        for (var z=1; z<=4; z++) {
            if (z == correctPos) {
                document.getElementById("box"+z).innerHTML = ans;
            } else {
                // wrong answers
                var wrongans = 1+Math.round(100*Math.random());
                // while (wrongans == ans) {
                while (answers.indexOf(wrongans) > -1 ) {
                    wrongans = 1+Math.round(100*Math.random());
                
                }
                document.getElementById("box"+z).innerHTML = wrongans;
                answers.push(wrongans);
            }
        }    
    } else {
        gameOver();
    }
}

// If we click on the answer box
for(i=1; i<5; i++) {
    document.getElementById("box"+i).onclick =
    function() {
        // Are we playing?
        if (playing == true) {
            // Yes, then is the answer correct?
            var choice = this.innerHTML;
            if (choice == ans) {
                score++; // Increase the score by 1
                document.getElementById("scorevalue").innerHTML = score;
                
                // Show "Correct" box for 1 sec
               appear("correct");// Show "Correct" box for 1 sec
                setTimeout( function(){
                    hide("correct");
                }, 1000);
                
            } else {
                score -= 2;
                document.getElementById("scorevalue").innerHTML = score;
                
                appear("wrong");
                setTimeout( function(){
                    hide("wrong");   
                }, 1000);
            }
            generateQA(); // Generate new question and answer
        }
    }
}

function hide(id) {
    document.getElementById(id).style.display = "none";
}

function show(id) {
    document.getElementById(id).style.display = "block";
}

