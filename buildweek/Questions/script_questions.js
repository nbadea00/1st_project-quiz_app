// Question
localStorage.removeItem('voto'); //serve per rimuovere dal localStorage i voti passati
localStorage.removeItem('domanda'); // serve per rimuovere dal localStorage le domande passate 
let domande = [];
let questionNumber = 0;
let timerInterval = null;
let namberQuestions = 10;
let arrayDifficulty = ['easy', 'medium', 'hard']
{ // codice js per creare il forme il numero delle domande e la difficoltà

    let div = document.createElement('div');
    let inputText = document.createElement('input');
    let select = document.createElement('select');
    let button = document.createElement('button');
    let container = document.querySelector('#main-questions')

    inputText.type = 'text';
    inputText.placeholder = 'Enter the number of questions(default = 10)'
    inputText.classList.add('input-numeri')
//Evento per leggere singoli caratteri inseriti dall'utente nel input test
    inputText.addEventListener('keyup', function () {
//Serve per controllare se l'ultimo carattere inserito è un numero o una lettera, se è una lettera la rimuove     
        if (isNaN(this.value) || this.value[this.value.length-1] == '.' ) {
            this.value = this.value.substring(0, this.value.length - 1)
        }       
    })

    select.classList.add('difficulty')      // Seleziona difficoltà
    for (let i of arrayDifficulty) {
        let option = document.createElement('option');
        option.value = i
        option.innerHTML = i
        select.append(option)
    }

    div.classList.add('form-question');


    button.classList.add('button')
    button.innerHTML = 'Submit'
    button.addEventListener('click', function () {
        div.remove();
        if (inputText.value == '' || isNaN(inputText.value)) {              // se lo spazio è vuoto o non c'è un numero
            inputText.value = '10'                                          //  imposta il numero di domande a 10 di default
        }
        namberQuestions = inputText.value
        startQuiz(select.value)
    })

    div.append(inputText);
    div.append(select);
    div.append(button);
    container.append(div);
}




function startQuiz(dif) {                   // parametri vuoti per le funzioni
    let arrayQuestionIndex = [];
    let control = false;
    let voto = 0;

    let numAnswer = 0;
    let risposta = []
    let controlAnswer = 0;


    fetch(/*'../assets/question.json'*/`https://opentdb.com/api.php?amount=${namberQuestions}&category=18&difficulty=${dif}`).then((response) => response.json()).then(function (data) {
        domande = data;             // chiamata ajax
        question(domande);
    })

    function question(lista) {
        timer()                     // creazione timer
        let indexQuestion;
        // ciclo per controllare che non si ripetano le domande
        do {                    
            control = false;            

            indexQuestion = Math.floor(Math.random() * namberQuestions)
            for (let i of arrayQuestionIndex) {
                if (i == indexQuestion) {
                    control = true;
                }
            }

        } while (control)                           
        arrayQuestionIndex.push(indexQuestion);                 // salvataggio indice risposta in locale
        questionWrite(lista.results[indexQuestion]);
    }

    function questionWrite(domanda) {                                       
                // funzione per mostrare a schermo la domanda
        let containerQuestion = document.querySelector('.font-title')
        containerQuestion.innerHTML = domanda.question

        if(Array.isArray(domanda.correct_answer)){
            containerQuestion.innerHTML += '<p class = "notice">*Multiple choice</p>' 
        }

        document.querySelector('.domanda').textContent = "QUESTION " + Number(questionNumber + 1);          
        document.querySelector('.purple').textContent = "/" + namberQuestions;
        answer(domanda);
    }

    function answer(domanda) {                  //funzione per mostrare a schermo le risposte
        let containerAnswer = document.querySelector('#container-answers');
        let answer = [];
        containerAnswer.innerHTML = '';

        if (Array.isArray(domanda.correct_answer)) {        // if che verifica se è presente più di una risposta giusta 
            for (let i of domanda.correct_answer) {         // per ciclare le risposte
                answer.push(i);
            }
        } else {
            answer.push(domanda.correct_answer);
        }

        for (let i of domanda.incorrect_answers) {      // salvataggio risposte sbagliate dentro un array
            answer.push(i);
        }

        let listIdAnswer = [];
        let numCasuale;

        for (let i = 0; i < answer.length; i++) {         // ciclo for per creare elementi html che conterranno le risposte
            let div = document.createElement('div');
            let p = document.createElement('p');
            p.classList.add('answer');
            div.classList.add('box-answers');

            do {                                        // ciclo dowhile che serve per randomizzare l'inserimento delle risposte e prevenire ripetizione delle stesse
                control = false

                numCasuale = Math.floor(Math.random() * answer.length)
                for (let j of listIdAnswer) {
                    if (j == numCasuale) {
                        control = true;
                    }
                }                                    

            } while (control)


            listIdAnswer.push(numCasuale);                  // salvo l'indice della risposta già inserita
            
            p.textContent = answer[numCasuale];                 
            div.append(p);

            if (!Array.isArray(domanda.correct_answer)) {           // controllo se la domanda è a risposta multipla o no per decidere l'event listener da assegnare

                div.addEventListener('click', function () {         
                    let risposta = this.textContent;

                    if (domanda.correct_answer == risposta) {       // verifica se la risposta data è corretta
                        voto++;
                    }

                    questionNumber++;
                    if (questionNumber == namberQuestions) {        // verifica se l'utente ha risposto a tutte le domande previste. Se è vero, lo reindirizza verso la pagina risultato, salvando il voto ed il numero delle domande
                        localStorage.setItem('voto', voto);
                        localStorage.setItem('namberQuestion', namberQuestions);
                        window.location.assign("../result/result.html")
                        return 0;
                    }
                    question(domande)                               // Una votla risposto alla domanda, viene richiamata la funzione per proporne una nuova
                })
            } else {
                numAnswer = 0;
                controlAnswer = 0;
                div.addEventListener('click', risposte)
            }

            containerAnswer.append(div)
        }

        function risposte() {                                   // funzione per controllare la risposta multipla al click
            risposta.push(this.textContent);                    // salva il valore del pulsante premuto dentro risposta
            numAnswer++;                                        // variabile incrementa ogni volta che viene selezionata una riposta

            if (numAnswer === 2) {                              // viene controllato se sono state date 2 risposte
                numAnswer++;                                                     
                for (let i of risposta) {                       // ciclo che serve per controllare che entrambe le risposte inserite siano giuste
                    if (domanda.correct_answer.find(element => element == i)) {
                        controlAnswer++;
                    }
                }
                risposta = []
                if (controlAnswer == 2) {
                 
                    voto++;
                }
                questionNumber++;
                if (questionNumber == namberQuestions) {          // alla fine delle 10 domande ti reindirizza alal pagina del risultato
                    localStorage.setItem('voto', voto);
                    localStorage.setItem('namberQuestion', namberQuestions);
                    window.location.assign("../result/result.html")
                    return 0;
                }
                question(domande)
            }
        }
    }

    // funzione timer
    
    function onTimesUp() {
        clearInterval(timerInterval);
    }

    function timer() {
    
    
        onTimesUp()
    
        // timer js
        const FULL_DASH_ARRAY = 283;
        const WARNING_THRESHOLD = 0;        // impedisce che il timer vada in loop
        const ALERT_THRESHOLD = 0;          // impedisce che il timer vada in loop
    
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
        const TIME_LIMIT = 60;
        let timeLeft = TIME_LIMIT;
        timerInterval = null
    
        let remainingPathColor = COLOR_CODES.step1.color;
        let timer = document.getElementById("timer")
    
        // creazione svg timer
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
                setCircleDasharray();
                setRemainingPathColor(timeLeft);
    
                if (timeLeft === 0) {
                    onTimesUp();
                    questionNumber++;
                    if (questionNumber == namberQuestions) {                // se il tempo finesce all'ultima domanda ti reindirizza alla pagina dei risultati
                        localStorage.setItem('voto', voto);
                        localStorage.setItem('namberQuestion', namberQuestions);
                        window.location.assign("../result/result.html");
                    } else {
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
}