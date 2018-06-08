var cat = document.getElementById('cat');
var count = document.getElementById('count');
var clickCount = 0;

cat.addEventListener('click', function(){
  clickCount++;
  count.innerHTML = clickCount;
}, false);