console.log('running client script');
let showLeaderScreen = true;

const rpsButton = document.getElementById('rpsButton');
const rpsLink = document.getElementById('rpsLink');
const tttButton = document.getElementById('tttButton');
const tttLink = document.getElementById('tttLink');

rpsButton.addEventListener('click',rpsClickEvent);
rpsLink.addEventListener('click',rpsClickEvent);
tttButton.addEventListener('click',tttClickEvent);
tttLink.addEventListener('click',tttClickEvent);


function rpsClickEvent(){
    showHideLeaderScreen();
    console.log('pressed rps button');
    //show the rock paper scissors game
}

function tttClickEvent(){
    showHideLeaderScreen();
    console.log('pressed ttt button');
}

function showHideLeaderScreen(){
    const leaderScreen = document.getElementById("leaderScreen");

    showLeaderScreen = !showLeaderScreen
    if(showLeaderScreen){
        leaderScreen.classList.remove("hideme");
        //leaderScreen.style.display = '';
    }else{
        leaderScreen.classList.add("hideme");
        //leaderScreen.style.display = 'none';
    }
}