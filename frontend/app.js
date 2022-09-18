console.log('running client script');

const windowLoad = window.addEventListener('load',event => {
    console.log('page is fully loaded');
    const queryString = window.location.search;
    console.log(queryString);
    const urlParams = new URLSearchParams(queryString);
    console.log(urlParams)
    if(urlParams.has('teamName')){
        var teamName = urlParams.get('teamName')
        console.log('teamName from urlparam')
        console.log(teamName)
        let teamNameIn = {teamName: teamName};
        console.log('finish urlparam');
        showPage(teamNameIn);
    }
  }
  )

let teamNameSave ={teamName: ''};
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
const leaderList = document.getElementById('leaderList');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    let teamNameText = formData.get('teamNameInput');
    const teamNameJson = {
        teamName: teamNameText,
    }
    console.log(teamNameJson);
    //send data to server
    const options = {
        method: 'POST',
        headers: { "content-type": "application/json" },
        body: JSON.stringify(teamNameJson)

    }
    fetch('/teamName', options).then(response => response.json())
    .then(teamName2 => {
        console.log('in 2nd then in fetch')
        console.log(teamName2);
        teamNameSave.teamName = teamName2.teamName
        showPage(teamNameSave)
        
    })

})

function showPage(teamNameIn){

    // const queryString = window.location.search;
    // console.log(queryString);
    // const urlParams = new URLSearchParams(queryString);
    // console.log(urlParams)

    // if(urlParams.has('teamName')){
    //     var teamName = urlParams.get('teamName')
    //     console.log('teamName from urlparam')
    //     console.log(teamName)
    //     teamNameIn = {teamName: teamName};
    //     console.log('finish urlparam')
    // }
    //now hide the form and unhide the rest?
    if(teamNameIn){
        console.log('logging teamName')
        console.log(teamNameIn);
        console.log('finished loggin teamName')
        getLeaderList()
        showHideScreen(true,'navBar');
        showHideScreen(true,'leaderScreen')
        showHideScreen(true, 'gameButtons');
        showHideScreen(false, 'teamForm');
        showHideScreen(true,'teamNameHeader');
        const teamNameHeader = document.getElementById('teamNameHeader');
        teamNameHeader.textContent = "Welcome to team "+teamNameIn.teamName+". Play to win!";
        var diffTeam = document.createElement('a');
        diffTeam.setAttribute('href','/newTeam');
        diffTeam.textContent = '(Join a different team!)'
        teamNameHeader.appendChild(diffTeam)
    }
}

function getLeaderList(){
    //send data to server
    const options = {
        method: 'POST',
        headers: { "content-type": "application/json" },
    //    body: JSON.stringify(teamNameJson)
    }
    fetch('/leaders',options).then(res=>res.json())
    .then(leaders => {
        console.log(leaders);
        leaderList.innerHTML="";
        leaders.sort((a,b)=> b.score - a.score);
        console.log(leaders);
        leaders.forEach(element => {
            var li = document.createElement('li');
            li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-start");
            var div = document.createElement('div');
            div.classList.add("ms-2", "me-auto");
            var div2 = document.createElement('div');
            div2.classList.add("fw-bold");
            div2.textContent = element.teamName;
            div.appendChild(div2);
            var p = document.createElement('p')
            p.textContent=Date(element.asOfDate);
            div.appendChild(p);
            var span = document.createElement('span');
            span.classList.add("badge","bg-primary","rounded-pill")
            span.textContent = element.score;
            
            li.appendChild(div);
            li.appendChild(span);
            leaderList.appendChild(li);
        });
    }

    )
}

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
