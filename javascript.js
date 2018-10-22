var action;
var score;
var timeRemaining;
var ans;
var question ;

var mode;
var numbers;
var digits;
var reduce;

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
    
    if (mode == 2) {
        gameStart2();    
    } else {
        gameStart();
    }
}

document.getElementById("22").onclick = function() {
    hide("container1");
    show("container2");
    numbers = 2;
    digits = 2;
    
    if (mode == 2) {
        gameStart2();    
    } else {
        gameStart();
    }
}

document.getElementById("31").onclick = function() {
    hide("container1");
    show("container2");
    numbers = 3;
    digits = 1;
    
    if (mode == 2) {
        gameStart2();    
    } else {
        gameStart();
    }
}

document.getElementById("32").onclick = function() {
    hide("container1");
    show("container2");
    numbers = 3;
    digits = 2;
    
    if (mode == 2) {
        gameStart2();    
    } else {
        gameStart();
    }
}

document.getElementById("2decimal").onclick = function() {
    hide("container1");
    show("container2");
    numbers = 2;
    digits = 0;
        
    if (mode == 2) {
        gameStart2();    
    } else {
        gameStart();
    }
}

document.getElementById("3decimal").onclick = function() {
    hide("container1");
    show("container2");
    numbers = 3;
    digits = 0;
        
    if (mode == 2) {
        gameStart2();    
    } else {
        gameStart();
    }
}


// The reset button that go back to the first page
document.getElementById("reset").onclick = function() {
    // Reload the page
    location.reload();
}


// Game start for mode 1 and 3
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

// Game start for mode 2
function gameStart2() {
    hide("gameover");
    
    reduce = false;
    
    score = 0; // set score to 0 
    document.getElementById("scorevalue").innerHTML = score;
        
    // Show countdown box
    show("timing");
        
    // Set time running
    timeRemaining = 120;
    document.getElementById("left").innerHTML = timeRemaining;
    startCountdown();
    
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
    if ( (question<50) && (mode==1) || 
         (question<50) && (mode==3) ||
         (mode==2) ) {
        
        question++;
        // Set the time back for each categories of the game
        if (mode==3 && digits==1 && numbers==2) {
            timeRemaining = 5;
            document.getElementById("left").innerHTML = timeRemaining;
            startCountdown();
        }
        else if (mode==3 && digits==1 && numbers==3) {
            timeRemaining = 7;
            document.getElementById("left").innerHTML = timeRemaining;
            startCountdown();
        } else if (mode != 2){
            timeRemaining = 10;
            document.getElementById("left").innerHTML = timeRemaining;
            startCountdown();
        }
    
        // generate question
//        var x = 1+Math.round(9*Math.random());
//        var y = 1+Math.round(9*Math.random());
        if (numbers == 2) {
            if (digits == 1) {
                var x = Math.floor(Math.random() * 9+1);
                var y = Math.floor(Math.random() * 9+1);
                ans = x*y;
            } else if (digits == 2){
                var x = Math.floor(Math.random() * 90 + 10);
                var y = Math.floor(Math.random() * 90 +10);
                ans = x*y;
            } else if (digits == 0){
                document.getElementById("question").style.width="450px";
                var x = (Math.random()*9+1).toFixed(3);
                var y = (Math.random()*9+1).toFixed(3);
                ans = (x*y).toFixed(3);
            }
            document.getElementById("question").innerHTML = x + "x" + y;
        } 
        if (numbers == 3) {
            if (digits == 1) {
                var x = Math.floor(Math.random() * 9+1);
                var y = Math.floor(Math.random() * 9+1);
                var k = Math.floor(Math.random() * 9+1);
                ans = x*y*k;
            } else if (digits == 2){
                var x = Math.floor(Math.random() * 90 + 10);
                var y = Math.floor(Math.random() * 90 + 10);
                var k = Math.floor(Math.random() * 90 + 10);
                ans = x*y*k;
            } else if (digits == 0){
                document.getElementById("question").style.width="610px";
                var x = (Math.random()*9+1).toFixed(3);
                var y = (Math.random()*9+1).toFixed(3);
                var k = (Math.random()*9+1).toFixed(3);
                ans = (x*y*k).toFixed(3);
            }
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
                else if (numbers == 2 && digits == 0) {
                    var wrongans = (Math.random()*90+1).toFixed(3);;
                    // while (wrongans == ans) {
                    while (answers.indexOf(wrongans) > -1 ) {
                        wrongans = (Math.random()*90+1).toFixed(3);;
                
                    }
                }
                else if (numbers == 3 && digits == 0) {
                    var wrongans = (Math.random()*90+1).toFixed(3);;
                    // while (wrongans == ans) {
                    while (answers.indexOf(wrongans) > -1 ) {
                        wrongans = (Math.random()*900+1).toFixed(3);;
                
                    }
                }
                else if (digits == 1) {
                    var wrongans = Math.floor(Math.random() * 90 + 10);
                    // while (wrongans == ans) {
                    while (answers.indexOf(wrongans) > -1 ) {
                        wrongans = Math.floor(Math.random() * 90 + 10);
                
                    }
                } else if (digits == 2){
                    var wrongans = Math.floor(Math.random() * 10000+100);
                    // while (wrongans == ans) {
                    while (answers.indexOf(wrongans) > -1 ) {
                        wrongans = Math.floor(Math.random() * 10000+100);
                
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
        
        // Reduce the clock by 5 seconds, in mode 2, when answer wrong question
        if (reduce == true) {
            reduce = false;
            timeRemaining -= 5;
            document.getElementById("left").innerHTML = timeRemaining;
        }
        // Game over
        if (timeRemaining <= 0) {
            
            stopCounting();
            
            // In mode 2, the game is over when the time run out
            if (mode==2) {
                gameOver();
            }
            else{
                score -= 2; // If the time run out without correct answer, the score decrease by 2
                document.getElementById("scorevalue").innerHTML = score;
                if(mode==1) {
                    generateQA(); // Generate new question and answer
                } else if (mode==3) {
                    gameOver();
                }
            }
        }
    }, 1000);
}

// Stop the clock
function stopCounting() {
    clearInterval(action);
}

// If we click on the answer box
for(i=1; i<5; i++) {
    document.getElementById("box"+i).onclick =
    function() {
            // Yes, then is the answer correct?
        var choice = this.innerHTML;
        if (choice == ans) { // Correct anwer
            score++; // Increase the score by 1
            document.getElementById("scorevalue").innerHTML = score;
                
            // Show "Correct" box for 1 sec
            show("correct");// Show "Correct" box for 1 sec
            setTimeout( function(){
                hide("correct");
            }, 1000);
            if (mode != 2) {
                stopCounting();
            }
            generateQA(); // Generate new question and answer
                
        } else { // Wrong answer
            score --; // Decrese the score by 1
             document.getElementById("scorevalue").innerHTML = score;
                
            show("wrong");
            setTimeout( function(){
                hide("wrong");   
            }, 1000);
            
            //In mode 1, you will have another chance to answer the question till time run out
            // In mode 3, when you answer wrong, you lose immidiately
            if (mode==3) {
                stopCounting();
                gameOver();
            } else if (mode==2) {
                // In mode 2, when you answer wrong, you lose 2 points
                score --; // Decrese the score by 1
                document.getElementById("scorevalue").innerHTML = score;
                
                // The variable change, which make the call in the start counting method
                reduce = true;
            }
        }
    }
}

// Function used to hide the properties
function hide(id) {
    document.getElementById(id).style.display = "none";
}

// Function used to show the properties
function show(id) {
    document.getElementById(id).style.display = "block";
}


// Change the language
document.getElementById("language").onclick = function() {
    var languages = document.getElementById("lang").innerHTML;
    if (languages=="ENG") {
        show("sarcasm");// Show "Correct" box for 1 sec
        setTimeout( function(){
            hide("sarcasm");
            document.getElementById("lang").innerHTML = "VIE";
        }, 1000);
        document.getElementById("line1").innerHTML = "TÍNH NHẨM";
        document.getElementById("line2").innerHTML = "CHO VUI";
        document.getElementById("normal").innerHTML = "Chơi bình thường";
        document.getElementById("fast").innerHTML = "Chơi nhanh";
        document.getElementById("one").innerHTML = "Không được sai";
        document.getElementById("difficult").innerHTML = "Độ Khó";
        
        document.getElementById("21").innerHTML = "2 Số 1 Chữ số";
        document.getElementById("22").innerHTML = "2 Số 2 Chữ số";
        document.getElementById("31").innerHTML = "3 Số 1 Chữ số";
        document.getElementById("32").innerHTML = "3 Số 2 Chữ số";
        document.getElementById("2decimal").innerHTML = "2 Số thập phân";
        document.getElementById("3decimal").innerHTML = "3 Số thập phân";
        
    } else {
        document.getElementById("lang").innerHTML = "ENG";
        document.getElementById("line1").innerHTML = "MULTIPLICATION";
        document.getElementById("line2").innerHTML = "FOR FUN";
        document.getElementById("normal").innerHTML = "Normal Mode";
        document.getElementById("fast").innerHTML = "Fast Mode";
        document.getElementById("one").innerHTML = "One-shot Mode";
        document.getElementById("difficult").innerHTML = "DIFFICULTY";
        
        document.getElementById("21").innerHTML = "2 Numbers, 1 digit";
        document.getElementById("22").innerHTML = "2 Numbers, 2 digit";
        document.getElementById("31").innerHTML = "3 Numbers, 1 digit";
        document.getElementById("32").innerHTML = "3 Numbers, 2 digit";
        document.getElementById("2decimal").innerHTML = "2 Decimal Numbers";
        document.getElementById("3decimal").innerHTML = "3 Decimal Numbers";
    }
}
