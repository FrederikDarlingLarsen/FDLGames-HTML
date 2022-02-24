let numberInput = prompt("give me a temperature in celsius");

var randomNum = Math.floor(Math.random()*10);

var gameResult = document.getElementById('result');

if(randomNum == numberInput){

    gameResult.textContent = 'You are winner! The number was: '+randomNum;
}
else{

    gameResult.textContent = 'Youre a lose! The number was: '+randomNum;
}