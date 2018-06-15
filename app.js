// Selecting Elements
var list = document.getElementById('list'),
	ul = list.getElementsByTagName('ul'),
	li = list.getElementsByTagName('li'),
	container = document.getElementById('container'),
	count = document.getElementById('count'),
	image = container.getElementsByTagName('img');

// Defining Count Array
var counts = [];
for (var i = 0; i < li.length; i++) {
	counts[i] = 0;
}

(function init() {
	image[0].src = li[0].innerHTML + '.jpg';
	image[0].class = li[0].innerHTML;
	count.innerHTML = counts[0];
}());

for (var i = 0; i < li.length; i++) {
	li[i].addEventListener('click', (function (iCopy) {
		return function () {
			image[0].src = li[iCopy].innerHTML + '.jpg';
			image[0].class = li[iCopy].innerHTML;
			count.innerHTML = counts[iCopy];
		}
	})(i));
};

for (var i = 0; i < li.length; i++) {
	image[0].addEventListener('click', (function (iCopy) {
		return function () {
			if (image[0].class === li[iCopy].innerHTML) {
				counts[iCopy] += 1;
				count.innerHTML = counts[iCopy];
			}
		}
	})(i));
};