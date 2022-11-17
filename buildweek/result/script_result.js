{
    let voto = localStorage.getItem('voto')
    let numDomande = 10;
    let perGiuste = (voto / numDomande) * 100;
    let perErrato = 100 - perGiuste;
    const pixY = 255;
    const pixX = 6;

    document.querySelector('#correct .percentage').textContent = perGiuste + "%"
    document.querySelector('#wrong .percentage').textContent = perErrato + "%"
    document.querySelector('#correct .question').textContent = voto + "/10" + " questions"
    document.querySelector('#wrong .question').textContent = (numDomande - voto) + "/10" + " questions"
    document.querySelector('.circle').style.strokeDasharray = `${perErrato}, 100`
    document.querySelector('.risult-text').textContent = perGiuste + "%";

    let popWrong = document.querySelector('.pop-up-wrong');
    let popCorrect = document.querySelector('.pop-up-correct');

    console.log(popWrong.style.position)

    let span = document.createElement('span');

    span = "WRONG:" + perErrato + "%"
    popWrong.append(span);
    span = "CORRECT:" + perGiuste + "%"
    popCorrect.append(span);


    document.querySelector('.circle').onmousemove = function () {
        popWrong.style.visibility = 'visible'
        let y = 210 + Number(pixY * perErrato / 100);
        let x = 50 + Number(pixX - pixX * (Math.abs(50 - perErrato) / 100));
        console.log(x)
        popWrong.style.top = `${y}px`;
        popWrong.style.left = `${x}%`;
    }
    document.querySelector('.circle').onmouseleave = function () {
        popWrong.style.visibility = 'hidden'
    }

    document.querySelector('.circle-bg').onmousemove = function () {
        popCorrect.style.visibility = 'visible'
        let y = 210 + Number(pixY * perGiuste / 100);
        let x = 43 - Number(pixX - pixX * (Math.abs(50 - perGiuste) / 100));
        console.log(x)
        popCorrect.style.top = `${y}px`;
        popCorrect.style.left = `${x}%`;
    }
    document.querySelector('.circle-bg').onmouseleave = function () {
        popCorrect.style.visibility = 'hidden'
    }

    document.querySelector('#buttonRate').addEventListener('click', function(){
        window.location.href = '../review/index.html'
    })
}