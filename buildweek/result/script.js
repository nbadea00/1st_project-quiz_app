{
    let voto = localStorage.getItem('voto')
    let numDomande = 10;
    let perGiuste = (voto / numDomande) * 100;
    let perErrato = 100 - perGiuste;

    document.querySelector('#correct .percentage').textContent = perGiuste + "%"
    document.querySelector('#wrong .percentage').textContent = perErrato + "%"
    document.querySelector('#correct .question').textContent = voto + "/10" + " questions"
    document.querySelector('#wrong .question').textContent =  (numDomande - voto)  + "/10" + " questions"
    document.querySelector('.circle').style.strokeDasharray = `${perGiuste}, 100`
    document.querySelector('.risult-text').textContent = perGiuste + "%";
    //document.querySelector('.wrong-text').textContent = perErrato + "%";

    document.querySelector('.circle').onmousemove = function (){
        document.querySelector('.pop-up-correct').style.visibility = 'visible'
    }
    document.querySelector('.circle').onmouseleave = function (){
        document.querySelector('.pop-up-correct').style.visibility = 'hidden'
    }

    document.querySelector('.circle-bg').onmousemove = function (){
        document.querySelector('.pop-up-wrong').style.visibility = 'visible'
    }
    document.querySelector('.circle-bg').onmouseleave = function (){
        document.querySelector('.pop-up-wrong').style.visibility = 'hidden'
    }
}