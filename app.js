var cat = document.getElementById('cat');
var count = document.getElementById('count');
var clickCount = 0;

cat.addEventListener('click', function(){
  clickCount++;
  console.log(clickCount);
  console.log(count);
}, false);