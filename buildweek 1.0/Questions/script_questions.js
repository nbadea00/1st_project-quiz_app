// Question
localStorage.removeItem('voto')
let domande = []
let numDom = 0;
let timerInterval = null;
{
    let questions = [];
    let control = false;
    let voto = 0;


    fetch('https://opentdb.com/api.php?amount=10&category=18&difficulty=medium').then((response) => response.json()).then(function (data) {
        domande = data;
        console.log(domande)
        question(domande);
    })

    function question(lista) {
        timer()
        let indexQuestion;
        do {
            control = false;

            indexQuestion = Math.floor(Math.random() * 10)
            //console.log("------------------------------------------------");
            for (let i of questions) {
                if (i == indexQuestion) {
                    control = true;
                }
            }

        } while (control)
        questions.push(indexQuestion);
        questionWrite(lista.results[indexQuestion]);
    }

    function questionWrite(domanda) {
        let containerQuestion = document.querySelector('.font-title')
        containerQuestion.innerHTML = domanda.question
        document.querySelector('.domanda').textContent = numDom + 1;
        answer(domanda);
    }

    function answer(domanda) {
        let containerAnswer = document.querySelector('#container-answers');
        let answer = [];
        containerAnswer.innerHTML = '';

        answer.push(domanda.correct_answer);

        for (let i of domanda.incorrect_answers) {
            answer.push(i);
        }

        let listIdAnswer = [];
        let numCasuale;

        for (let i = 0; i < answer.length; i++) {
            let div = document.createElement('div');
            let p = document.createElement('p');
            p.classList.add('answer');
            div.classList.add('box-answers');

            do {
                control = false

                numCasuale = Math.floor(Math.random() * answer.length)
                for (let j of listIdAnswer) {
                    if (j == numCasuale) {
                        control = true;
                    }
                }

            } while (control)


            listIdAnswer.push(numCasuale);

            p.innerHTML = answer[numCasuale];
            div.append(p);

            div.addEventListener('click', function () {
                let risposta = this.textContent;

                if (domanda.correct_answer == risposta) {
                    console.log(numDom)
                    voto++;
                    numDom++;
                    if (numDom == 10) {
                        localStorage.setItem('voto', voto);
                        window.location.assign("../result/results.html")
                        return 0;

                    }
                    question(domande)
                } else {
                    console.log(numDom)
                    numDom++;
                    if (numDom == 10) {
                        localStorage.setItem('voto', voto);
                        window.location.assign("../result/results.html")
                        return 0;
                    }
                    question(domande)
                }
            })

            containerAnswer.append(div)
        }
    }
}

function onTimesUp() {
    clearInterval(timerInterval);
}


function timer() {
    

    onTimesUp()

// timer js
const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 0;
const ALERT_THRESHOLD = 0;

const COLOR_CODES = {
    step1: {
        color: "a"
    },
    step2: {
        color: "b",
        threshold: WARNING_THRESHOLD
    },
    step3: {
        color: "c",
        threshold: ALERT_THRESHOLD
    }
};



    let timePassed = 0;
    const TIME_LIMIT = 5;
    let timeLeft = TIME_LIMIT;
    timerInterval = null
    
    let remainingPathColor = COLOR_CODES.step1.color;
    let timer = document.getElementById("timer")
    
        timer.innerHTML = `
        <div class="base-timer">
        <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
<g class="base-timer__circle">
<circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
<path
id="base-timer-path-remaining"
stroke-dasharray="283"
class="base-timer__path-remaining ${remainingPathColor}"
d="
M 50, 50
m -45, 0
a 45, 45 0 1,0 90,0
a  45, 45 0 1,0 -90,0
"
></path>
</g>
</svg>
<span id="base-timer-label" class="base-timer__label">${formatTime(
    timeLeft
    )}</span>
    </div>
    `;


    startTimer()


    function startTimer() {
        timerInterval = setInterval(() => {
            timePassed = timePassed += 1;
            timeLeft = TIME_LIMIT - timePassed;
            document.getElementById("base-timer-label").innerHTML = formatTime(
                timeLeft
            );
            console.log(timerInterval);
            setCircleDasharray();
            setRemainingPathColor(timeLeft);

            if (timeLeft === 0) {
                onTimesUp();
                numDom++;
                if (numDom == 10) {
                    window.location.assign("../result/results.html");
                }else{
                    question(domande);
                }
            }
        }, 1000);
    }

    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        let seconds = time;
        return `<p>SECONDS</p><p><b>${seconds}</b></p><p>REMAINING</p>`;
    }


    function setRemainingPathColor(timeLeft) {
        const { step3, step2, step1 } = COLOR_CODES;
        if (timeLeft <= step3.threshold) {
            document
                .getElementById("base-timer-path-remaining")
                .classList.remove(step1.color);
            document
                .getElementById("base-timer-path-remaining")
                .classList.add(step3.color);
        } else if (timeLeft <= step2.threshold) {
            document
                .getElementById("base-timer-path-remaining")
                .classList.remove(step1.color);
            document
                .getElementById("base-timer-path-remaining")
                .classList.add(step2.color);
        }
    }

    function calculateTimeFraction() {
        const rawTimeFraction = timeLeft / TIME_LIMIT;
        return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
    }

    function setCircleDasharray() {
        const circleDasharray = `${(
            calculateTimeFraction() * FULL_DASH_ARRAY
        ).toFixed(0)} 283`;
        document
            .getElementById("base-timer-path-remaining")
            .setAttribute("stroke-dasharray", circleDasharray);
    }
}
