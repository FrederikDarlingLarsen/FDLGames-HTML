let input = prompt("give me a temperature in celsius");

function calculateFahrenheit(celsius){
    var result;
    result = celsius * 1.8 + 32;
  return result;
}

var element = document.getElementById("result");
element.textContent = 'Result: ' + calculateFahrenheit(input);;