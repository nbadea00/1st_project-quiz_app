{
    let voto = 7 //localStorage.getItem('voto');
    let namberQuestion = 17 //localStorage.getItem('namberQuestion');
    let perGiuste = ((voto / namberQuestion) * 100).toFixed(2);
    let perErrato = (100 - perGiuste).toFixed(2);
    const pixY = 475;
    const pixX = 6;

    document.querySelector('#correct .percentage').textContent = perGiuste + "%"
    document.querySelector('#wrong .percentage').textContent = perErrato + "%"
    document.querySelector('#correct .question').textContent = voto + "/" + namberQuestion + " questions"
    document.querySelector('#wrong .question').textContent = (namberQuestion - voto) + "/" + namberQuestion + " questions"
    document.querySelector('.circle').style.strokeDasharray = `${perErrato}, 100`
    
    if(perGiuste >= 60){
        document.querySelector('#risultato').innerHTML =  `<b>Congratulations!<br><span>You passed the exam.</span></b><p> We'll send you the certificate <br>in few minutes.<br>Check your email (including promotions / spam folder)`;
    }else{
        document.querySelector('#risultato').innerHTML =  `<p class="notpass">Oh no! Unfortunately you didn't pass it.</p>`;
    }

    let popWrong = document.querySelector('.pop-up-wrong');
    let popCorrect = document.querySelector('.pop-up-correct');

    let span = document.createElement('span');

    span = "WRONG:" + perErrato + "%"
    popWrong.append(span);
    span = "CORRECT:" + perGiuste + "%"
    popCorrect.append(span);


    document.querySelector('.circle').onmousemove = function () {
        popWrong.style.visibility = 'visible'
        let y = 250 + Number(pixY * perErrato / 100);
        let x = 52 + Number(pixX - pixX * (Math.abs(50 - perErrato) / 100));
        popWrong.style.top = `${y}px`;
        popWrong.style.left = `${x}%`;
    }
    document.querySelector('.circle').onmouseleave = function () {
        popWrong.style.visibility = 'hidden'
    }

    document.querySelector('.circle-bg').onmousemove = function () {
        popCorrect.style.visibility = 'visible'
        let y = 250 + Number(pixY * perGiuste / 100);
        let x = 41 - Number(pixX - pixX * (Math.abs(50 - perGiuste) / 100));
        popCorrect.style.top = `${y}px`;
        popCorrect.style.left = `${x}%`;
    }
    document.querySelector('.circle-bg').onmouseleave = function () {
        popCorrect.style.visibility = 'hidden'
    }

    document.querySelector('#buttonRate').addEventListener('click', function(){
        window.location.href = '../review/review.html'
    })
}