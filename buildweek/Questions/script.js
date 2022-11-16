{
    let questions = [];
    let control = false;
    fetch('https://opentdb.com/api.php?amount=10&category=18&difficulty=easy').then((response) => response.json()).then(function (data) {
        let indexQuestion;
        do{
            control = false
            
            indexQuestion = Math.floor(Math.random() * 10)
            //console.log("------------------------------------------------");
            for (let i of questions) {
                if (i == indexQuestion) {
                    control = true;
                }
            }
            
        }while(control)
        questions.push(indexQuestion);
        question(data.results[indexQuestion]);
    })

    function question(domanda) {
        console.log(domanda)
        let containerQuestion = document.querySelector('.font-title')
        containerQuestion.innerHTML = domanda.question
        answer(domanda);
    }

    function answer(domanda) {
        let containerAnswer = document.querySelector('#container-answers');
        let answer = [];
        answer.push(domanda.correct_answer);
        for (let i of domanda.incorrect_answers){
            answer.push(i);
        }
        
        let listIdAnswer = [];
        let n = 0;
        let c = false;
        
        for( let i = 0 ; i < answer.length ; i++){
            let div = document.createElement('div');
            let p = document.createElement('p');
            p.classList.add('answer');
            div.classList.add('box-answers');
            
            do{
                control = false
                
                numCasuale = Math.floor(Math.random() * answer.length)
                console.log("------------------------------------------------");
                console.log("num=", numCasuale);
                for (let j of listIdAnswer) {
                    console.log("j=", j);
                    console.log("num=",numCasuale)
                    if (j == numCasuale) {
                        console.log("ciao")
                        control = true;
                    }
                }
                
            }while(control)

            
            listIdAnswer.push(numCasuale);
            
            console.log("listIdAnswer=", listIdAnswer)
            p.innerHTML = answer[numCasuale];
            div.append(p);
            containerAnswer.append(div)
        }
    }
}