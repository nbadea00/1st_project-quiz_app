{
    let questions = [];
    fetch('../assets/question.json').then((response) => response.json()).then(function (data) {
        let indexQuestion;

        for (let j = 0; j < 10; j++) {
            let control = true

            indexQuestion = Math.floor(Math.random() * 10)
            //console.log("------------------------------------------------");
            for (let i of questions) {
                //console.log("i=", i)
                //console.log("indexQ=", indexQuestion)
                //console.log(i == indexQuestion)
                if (i == indexQuestion) {
                    j--;
                    control = false;
                    break;
                }
            }

            if (control) {
                questions.push(indexQuestion);
            }

        }
        console.log(questions)
        question(data.results[indexQuestion]);
    })

    function question(domanda) {
        console.log(domanda)
        let containerQuestion = document.querySelector('.font-title')
        containerQuestion.innerHTML = domanda.question
    }


}
