{
    let questions = [];
    let control = false;
    let numDom = 0;
    let voto = 0;
    d();
    function d(){

        fetch('https://opentdb.com/api.php?amount=10&category=18&difficulty=easy').then((response) => response.json()).then(function (data) {
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
            question(data.results[indexQuestion]);
        })
    }
        
    function question(domanda) {
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

            div.addEventListener('click',function(){
                let risposta = this.textContent;

                if(domanda.correct_answer == risposta){
                    voto++;
                    numDom++;
                    if( numDom == 10){
                        localStorage.setItem('voto', voto);
                        window.location.href = "../result/results.html"
                    }
                    d()
                }else{
                    numDom++;
                    if( numDom == 10){
                        localStorage.setItem('voto', voto);
                        window.location.href = "../result/results.html"
                    }
                    d()
                }
            })

            containerAnswer.append(div)
        }
    }
}