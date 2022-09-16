console.log('running client script');


const rpsButton = document.getElementById('rpsButton');
const rpsLink = document.getElementById('rpsLink');
const tttButton = document.getElementById('tttButton');
const tttLink = document.getElementById('tttLink');
const returnButton = document.getElementById('returnButton');
const homeLink = document.getElementById('homeLink');
const rock = document.getElementById('rock');
const paper = document.getElementById('paper');
const scissors = document.getElementById('scissors');
const yourChoiceP = document.getElementById("yourChoiceP");
const rpsCPU = document.getElementById("rpsCPU");
const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const teamName = formData.get('teamName');
    const teamNameJson = {
        teamName: teamName,
    }
    console.log(teamNameJson);
    //send data to server
    const options = {
        method: 'POST',
        headers: { "content-type": "application/json" },
        body: JSON.stringify(teamNameJson)

    }
    fetch('/teamName', options).then(response => response.json())
    .then(teaName => {
        console.log(teamName);

        //now hide the form and unhide the rest?
        if(teamName){
            showHideScreen(true,'navBar');
            showHideScreen(true,'leaderScreen')
            showHideScreen(true, 'gameButtons');
            showHideScreen(false, 'teamForm');
            showHideScreen(true,'teamNameHeader');
            const teamNameHeader = document.getElementById('teamNameHeader');
            teamNameHeader.textContent = "Welcome "+teamName+". Play to win!";
        }
    })

})


rpsButton.addEventListener('click', rpsClickEvent);
rpsLink.addEventListener('click', rpsClickEvent);
tttButton.addEventListener('click', tttClickEvent);
tttLink.addEventListener('click', tttClickEvent);
returnButton.addEventListener('click', returnButtonClick);
homeLink.addEventListener('click', returnButtonClick);
rock.addEventListener('click', rockClick);
paper.addEventListener('click', paperClick);
scissors.addEventListener('click', scissorsClick);



function rpsClickEvent() {
    showHideScreen(false, "leaderScreen");
    showHideScreen(true, "rpsScreen");
    showHideScreen(false, "tttScreen");
    showHideScreen(true, "returnScreen");
    console.log('pressed rps button');
    //show the rock paper scissors game
}

function tttClickEvent() {
    showHideScreen(false, "leaderScreen");
    showHideScreen(false, "rpsScreen");
    showHideScreen(true, "tttScreen");
    showHideScreen(true, "returnScreen");
    console.log('pressed ttt button');
}

function returnButtonClick() {
    showHideScreen(true, "leaderScreen");
    showHideScreen(false, "rpsScreen");
    showHideScreen(false, "tttScreen");
    showHideScreen(false, "returnScreen");
    showHideScreen(true, "rock");
    showHideScreen(true, "paper");
    showHideScreen(true, "scissors");
    showHideScreen(false, "rpsCPU");
    yourChoiceP.textContent = "Choose your weapon!"
}

function rockClick() {
    showHideScreen(false, "paper");
    showHideScreen(false, "scissors");
    showHideScreen(true, "rpsCPU");
    yourChoiceP.textContent = "You chose ROCK. Waiting for CPU..."
}
function paperClick() {
    showHideScreen(false, "rock");
    showHideScreen(false, "scissors");
    showHideScreen(true, "rpsCPU");
    yourChoiceP.textContent = "You chose PAPER. Waiting for CPU..."
}
function scissorsClick() {
    showHideScreen(false, "rock");
    showHideScreen(false, "paper");
    showHideScreen(true, "rpsCPU");
    yourChoiceP.textContent = "You chose SCISSORS. Waiting for CPU..."
}

function showHideScreen(showScreen, screenName) {
    const Screen = document.getElementById(screenName);
    if (showScreen) {
        Screen.classList.remove("hideme");
        //leaderScreen.style.display = '';
    } else {
        Screen.classList.add("hideme");
        //leaderScreen.style.display = 'none';
    }
}
