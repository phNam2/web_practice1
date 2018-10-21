var action;
var score;
var timeRemaining;
var ans;
var question ;

var mode;
var numbers;
var digits;


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
    
    gameStart();
}

document.getElementById("31").onclick = function() {
    hide("container1");
    show("container2");
    numbers = 3;
    digits = 1;
    
    gameStart();
}

document.getElementById("32").onclick = function() {
    hide("container1");
    show("container2");
    numbers = 3;
    digits = 2;
    
    gameStart();
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
    
    score = 0; // set score to 0 
    document.getElementById("scorevalue").innerHTML = score;
        
    // Show countdown box
    show("timing");
        
    // generate Q&A
    question = 0;
    generateQA();
}


// After the game end
function gameOver() {
    document.getElementById("reset").innerHTML = "Start Over";
    hide("timing");
    show("gameover");
    document.getElementById("result").innerHTML = score;
}

// Q&A
function generateQA() {
    if (question < 50) {
        
        question++;
        // Set the time back
        if (mode==3 && digits==1 && numbers==2) {
            timeRemaining = 5;
            document.getElementById("left").innerHTML = timeRemaining;
        }
        else if (mode==3 && digits==1 && numbers==3) {
            timeRemaining = 7;
            document.getElementById("left").innerHTML = timeRemaining;
        } else {
            timeRemaining = 10;
            document.getElementById("left").innerHTML = timeRemaining;
        }
//        timeRemaining = 10;
        startCountdown();
    
        // generate question
//        var x = 1+Math.round(9*Math.random());
//        var y = 1+Math.round(9*Math.random());
        if (numbers == 2) {
            if (digits == 1) {
                var x = Math.floor(Math.random() * 10);
                var y = Math.floor(Math.random() * 10);
            } else if (digits == 2){
                var x = Math.floor(Math.random() * 90 + 10);
                var y = Math.floor(Math.random() * 90 +10);
            } else if (digits == 0){
                
                
            }
            ans = x*y;
            document.getElementById("question").innerHTML = x + "x" + y;
        } 
        if (numbers == 3) {
            if (digits == 1) {
                var x = Math.floor(Math.random() * 10);
                var y = Math.floor(Math.random() * 10);
                var k = Math.floor(Math.random() * 10);
            } else if (digits == 2){
                var x = Math.floor(Math.random() * 90 + 10);
                var y = Math.floor(Math.random() * 90 + 10);
                var k = Math.floor(Math.random() * 90 + 10);
            } else if (digits == 0){
                
                
            }
            ans = x*y*k;
            document.getElementById("question").innerHTML = x + "x" + y + "x" + k;
        }
    
        // generate answers
        var correctPos = 1+Math.round(3*Math.random());
        var answers = [ans];
    
        for (var z=1; z<=4; z++) {
            if (z == correctPos) {
                document.getElementById("box"+z).innerHTML = ans;
            } else {
                // wrong answers
                if (numbers == 3 && digits ==2) {
                    var wrongans = Math.floor(Math.random() * 1000000 + 1000);
                    // while (wrongans == ans) {
                    while (answers.indexOf(wrongans) > -1 ) {
                        wrongans = Math.floor(Math.random() * 1000000 + 1000);
                    }
                }
                else if (numbers == 3 && digits ==1) {
                    var wrongans = Math.floor(Math.random() * 1000 + 0);
                    // while (wrongans == ans) {
                    while (answers.indexOf(wrongans) > -1 ) {
                        wrongans = Math.floor(Math.random() * 1000 + 0);
                    }
                }
                else if (digits == 1) {
                    var wrongans = Math.floor(Math.random() * 90 + 10);
                    // while (wrongans == ans) {
                    while (answers.indexOf(wrongans) > -1 ) {
                        wrongans = Math.floor(Math.random() * 90 + 10);
                
                    }
                } else if (digits == 2){
                    var wrongans = Math.floor(Math.random() * 10000)+100;
                    // while (wrongans == ans) {
                    while (answers.indexOf(wrongans) > -1 ) {
                        wrongans = Math.floor(Math.random() * 10000)+100;
                
                    }
                }
            
                document.getElementById("box"+z).innerHTML = wrongans;
                answers.push(wrongans);
            }
        }    
    } else {
        gameOver();
    }
}

// Start the clock countdown
function startCountdown() {
    action = setInterval(function() {
        timeRemaining -= 1;
        document.getElementById("left").innerHTML = timeRemaining;
        
        // Game over
        if (timeRemaining <= 0) {
            score -= 2;
            stopCounting();
            
            if(mode==1) {
               generateQA(); // Generate new question and answer
            } else if (mode==3) {
                gameOver();
            }
        }
    }, 1000);
}

// Stop the clock
function stopCounting() {
    document.getElementById("scorevalue").innerHTML = score;
    clearInterval(action);
}

// If we click on the answer box
for(i=1; i<5; i++) {
    document.getElementById("box"+i).onclick =
    function() {
            // Yes, then is the answer correct?
        var choice = this.innerHTML;
        if (choice == ans) {
            score++; // Increase the score by 1
            document.getElementById("scorevalue").innerHTML = score;
                
            // Show "Correct" box for 1 sec
            show("correct");// Show "Correct" box for 1 sec
            setTimeout( function(){
                hide("correct");
            }, 1000);
            stopCounting();
            generateQA(); // Generate new question and answer
                
        } else {
            score --;
             document.getElementById("scorevalue").innerHTML = score;
                
            show("wrong");
            setTimeout( function(){
                hide("wrong");   
            }, 1000);
            if (mode==3) {
                stopCounting();
                gameOver();
            }
        }
    }
}

function hide(id) {
    document.getElementById(id).style.display = "none";
}

function show(id) {
    document.getElementById(id).style.display = "block";
}

