var firstCount = document.getElementById('first').getElementsByClassName('count');
var secondCount = document.getElementById('second').getElementsByClassName('count');
var firstClickCount = 0;
var secondClickCount = 0;

document.getElementById('poplinre').addEventListener('click', function () {
  	firstClickCount++;
  	console.log(firstClickCount);
  	firstCount[0].innerHTML = firstClickCount;
  	console.log(firstCount);
});

document.getElementById('chewie').addEventListener('click', function () {
  	secondClickCount++;
  	console.log(secondClickCount);
  	secondCount[0].innerHTML = secondClickCount;
  	console.log(secondCount);
});