

var questions = [
    {
        question: "What does HTML stand for?",
        opt1: "Hyper Tag Markup Language",
        opt2: "Hyper Text Markup Language",
        opt3: "Hyperlinks Text Mark Language",
        opt4: "Hyperlinking Text Marking Language",
        ans: "Hyper Text Markup Language"
    },
    {
        question: "What is the correct syntax to declare a variable in JavaScript?",
        opt1: "var variableName;",
        opt2: "let variableName;",
        opt3: "const variableName;",
        opt4: "All of the above",
        ans: "All of the above"

    },
    {
        question: "Which of the following is used to create an object in JavaScript?",
        opt1: "{}",
        opt2: "[]",
        opt3: "()",
        opt4: "< >",
        ans: "{}"

    },
    {
        question: "How to write an IF statement in JavaScript?",
        opt1: "if i=5 then",
        opt2: "if (i==5)",
        opt3: "if i = 5",
        opt4: "if i == 5 then",
        ans: "if (i==5zz)"
    },
    {
        question: "How do you create a function in JavaScript?",
        opt1: "function myfunction()",
        opt2: "function:myfunction()",
        opt3: "function=myfunction()",
        opt4: "function myfunction{}",
        ans: "function myfunction()"
    }
];

var index = 0;   // Initialize index
var result = 0;  // Initialize score
var timerId;     // Timer reference

// Render question function
function renderQuestion() {
    clearInterval(timerId); // Clear any existing timers to avoid overlap

    if (index > 0) {
        var options = document.getElementsByName("option");
        for (var i = 0; i < options.length; i++) {
            if (options[i].checked && options[i].value === questions[index - 1].ans) {
                result++;
            }
        }
    }

    // Check if quiz is finished
    if (!questions[index]) {
        calResult();
        return;
    }

    // Display the question and options
    var container = document.getElementById("container");
    container.innerHTML = `  
    <div class="card">
        <div class="card-header text-center">
            Quiz App <div class="timer" id="timer">30s</div>
        </div>
        <div class="card-body">
            <p>${index + 1}. ${questions[index].question}</p>
            <div>
                <label><input type="radio" name="option" value="${questions[index].opt1}"> ${questions[index].opt1}</label>
            </div>
            <div>
                <label><input type="radio" name="option" value="${questions[index].opt2}"> ${questions[index].opt2}</label>
            </div>
            <div>
                <label><input type="radio" name="option" value="${questions[index].opt3}"> ${questions[index].opt3}</label>
            </div>
            <div>
                <label><input type="radio" name="option" value="${questions[index].opt4}"> ${questions[index].opt4}</label>
            </div>
            <div class="text-center mt-3">
                <button class="btn btn-success" onClick="nextQuestion()">Next</button>
            </div>
        </div>
    </div>`;

    startTimer(); // Start the timer after rendering the question
}

// Function to start the timer
function startTimer() {
    var timeLeft = 30;
    var timerElement = document.getElementById("timer");

    timerId = setInterval(function () {
        if (timeLeft <= 0) {
            clearInterval(timerId);
            nextQuestion(); // Automatically move to the next question when time runs out
        } else {
            timerElement.textContent = timeLeft + "s";
        }
        timeLeft--;
    }, 1000);
}

// Function to move to the next question
function nextQuestion() {
    // Check if the current question has been answered
    var options = document.getElementsByName("option");
    var isOptionSelected = false;

    // Ensure that an option is selected before proceeding
    for (var i = 0; i < options.length; i++) {
        if (options[i].checked) {
            isOptionSelected = true;
            break;
        }
    }

    if (index < questions.length) {
        index++;   // Increment index to move to the next question
        renderQuestion(); // Render the next question
    }
}

// Function to calculate and display the result
function calResult() {
    var percentage = (result / questions.length) * 100;
    document.getElementById("container").innerHTML = `
    <div class="card">
        <div class="card-header text-center">Your Result</div>
        <div class="card-body text-center">
            <p>Your score is ${result}/${questions.length}<br>
            You scored ${percentage.toFixed(2)}%</p>
        </div>
    </div>`;
}

// Start the quiz by rendering the first question
renderQuestion();