const country = document.querySelector('.country');
const answer = document.querySelector('.answer');
const btn = document.querySelector('.submit');
const result = document.querySelector('.resultText');
const actualCapital = document.querySelector('.correct-answer');

let correctAnswer;

function restart() {
    answer.value = '';
    result.innerText = '';
    actualCapital.innerText = '';
    start();
}

function start() {
    let rndNumber = randomNumber();
    
    btnListener();
    getData(rndNumber);
    fillData(ctr, cpt);
}

function randomNumber() {
    return Math.floor(Math.random() * (251));
}

function getData(number) {
    let countryName;
    let capitalName;
    
    fetch("https://restcountries-v1.p.rapidapi.com/all", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "restcountries-v1.p.rapidapi.com",
            "x-rapidapi-key": "18bbaf97e7msh2ca2cfa97e38abfp1ad879jsnab2b5e23dcde"
        }
    })
    .then(response => response.json())
    .then(response => {
            countryName = response[number].name;
            capitalName = response[number].capital;
            fillData(countryName, capitalName);
    })
    .catch(err => {
        console.log(err);
    });
}

function fillData(countryName,capitalName){
    country.textContent = `${countryName}'s`;
    correctAnswer = capitalName;
}

function btnListener() {
    btn.addEventListener('click', () => {
        if(answer.value == correctAnswer) {
            result.style.display = 'block';
            result.classList.remove('text-danger');
            result.classList.add('text-success');
            result.innerText = 'Correct!';
        }
        else {
            result.classList.remove('text-success');
            result.classList.add('text-danger');
            result.innerText = `Wrong!`;
            actualCapital.innerText = `The correct answer is ${correctAnswer}`;
        }
        
        setTimeout(() => {
            restart();
        }, 3000);
    },{once : true});
}

start();
