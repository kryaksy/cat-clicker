(function() {

	'use strict';

	/* MODEL containing cats data */
	var model = {
		
		// Cat objects belongs to choosen cat
		selectedCat: null,

		// Array of Cat Objects
		cats: [{
				name: 'poplinre',
				clickCount: 0,
				location: 'img/poplinre.jpg'
			},
			{
				name: 'chewie',
				clickCount: 0,
				location: 'img/chewie.jpg'
			},
			{
				name: 'blondie',
				clickCount: 0,
				location: 'img/blondie.jpg'
			},
			{
				name: 'prayer',
				clickCount: 0,
				location: 'img/prayer.jpg'
			},
			{
				name: 'pofuduk',
				clickCount: 0,
				location: 'img/pofuduk.jpg'
			}
		]
	}

	/* 
	 * OCTOPUS to manage MODEL data and run VIEWs 
	 */
	var octopus = {
		
		init: function () {

			// Selecting the first cat
			model.selectedCat = model.cats[0];

			// Activating VIEWs
			createDom.init();
			viewList.init();
			viewCont.init();
			viewAdmin.init();
		},

		// Selecting given cat argument
		selectCat: function (cat) {
			model.selectedCat = cat;
		},

		// Returning latest selected cat
		getSelected: function () {
			return model.selectedCat;
		},

		// Returning all cats from model data
		allCats: function () {
			return model.cats;
		},

		// Increasing the count of cat
		// and rendering it
		increaseCount: function () {
			model.selectedCat.clickCount++;

			// Rendering container
			viewCont.render();
		}
	}

	/* 
	 * VIEW LIST
	 */
	var viewList = {

		init: function () {

			// Selecting needed list elements
			this.list = document.getElementById('list');
			this.ul = this.list.getElementsByTagName('ul')[0];
			this.li = this.list.getElementsByTagName('li')[0];

			// Rendering self
			this.render();
		},
		
		render: function () {	
			var cats = octopus.allCats(),
				elem;

			// Loop over all cat objects and
			// produce click listeners for each
			cats.forEach(function (cat) {
				
				// Create list item and add cat's name
				// into it
				elem = document.createElement('li');
				elem.innerHTML = cat.name;

				// Define event listener method for cat which
				// returns the function with argument 
				// of related cat object
				elem.addEventListener('click', (function (catCopy) { // cat copied
					return function () {
						// Using closure, catCopy
						octopus.selectCat(catCopy); 

						// Rendering container
						viewCont.render();
					}
				})(cat)); // IIFE

				// Append list item to stored list
				viewList.ul.appendChild(elem);
			});
		}
	}

	/* 
	 * VIEW CONTAINER
	 */
	var viewCont = {
		
		init: function () {

			// Storing container elements
			this.containerEl = $('#container')[0];
			this.countEl = $('#count')[0];
			this.catNamEl = $('#catName')[0];
			this.imagEl = $('img')[0];

			// Click Listener for changing clickCount data
			this.imagEl.addEventListener('click', function () {
				octopus.increaseCount();
			});

			// Rendering self
			this.render();
		},
		
		render: function () {

			// Selecting current cat
			var selectedCat = octopus.getSelected();

			// Mutating Container elements
			this.countEl.innerHTML = selectedCat.clickCount;
			this.catNamEl.innerHTML = selectedCat.name;
			this.imagEl.src = selectedCat.location;
		}
	}

	/* 
	 * VIEW Admin 
	 */
	var viewAdmin = {
		init: function () {
			this.adminButtonElement = $('#admButton')[0];
			this.adminElement = $('#admin')[0];
			this.adminVisible = false;

			this.render();
		},

		render: function () {
			this.adminButtonElement.addEventListener('click', (function (elem) {
				return function () {
					if (this.adminVisible) {
						elem.style.display = 'none';
						this.adminVisible = false;
					}else{
						elem.style.display = 'block';						
						this.adminVisible = true;
					}
				}
			})(this.adminElement));
		}
	}


	/* 
	 * CREATEDOM 
	 * to initialize DOM and recreate when need
	 */
	var createDom = {

		init: function () {

			// Simply create all needed elements
			this.listEl = document.createElement('div');
			this.ulEl = document.createElement('ul');
			this.liEl = document.createElement('li');
			this.containerEl = document.createElement('div');
			this.imagEl = document.createElement('img');
			this.catInfoEl = document.createElement('div');
			this.catNamEl = document.createElement('div');
			this.countEl = document.createElement('div');
			this.contentEl = document.createElement('div');

			// Create Admin elements
			this.adminButtonEl = document.createElement('button');
			this.adminEl = document.createElement('div');
			this.titleEl = document.createElement('h2');
			this.formEl = document.createElement('form');
			this.nameInputEl = document.createElement('input');
			this.urlInputEl = document.createElement('input');
			this.countInputEl = document.createElement('input');
			this.submitEl = document.createElement('button');
			this.cancelEl = document.createElement('button');

			// Set all attributes
			this.setAttributes();
		},

		setAttributes: function () {

			var cat = octopus.getSelected();

			// Simply sets all needed attributes
			this.listEl.setAttribute('id','list');				// #list
			this.containerEl.setAttribute('id','container');	// #container
			this.catNamEl.setAttribute('id', 'catName');		// #catName
			this.countEl.setAttribute('id', 'count');			// #count
			this.contentEl.setAttribute('id','content');		// #content
			this.containerEl.setAttribute('class','flex');		// .flex
			this.catInfoEl.setAttribute('class', 'catInfo');	// .catInfo

			// Set attributes of admin elements
			this.adminButtonEl.setAttribute('id','admButton');
			this.adminEl.setAttribute('id', 'admin');
			this.titleEl.setAttribute('class', 'title');
			this.nameInputEl.setAttribute('type', 'text');
			this.urlInputEl.setAttribute('type', 'text');
			this.countInputEl.setAttribute('type', 'text');
			this.submitEl.setAttribute('class', 'submit');
			this.cancelEl.setAttribute('class', 'cancel');

			// Set inner texts
			this.adminButtonEl.innerHTML = '+'
			this.titleEl.innerHTML = 'Admin Panel';
			this.nameInputEl.placeholder = cat.name;
			this.urlInputEl.placeholder = cat.url;
			this.countInputEl.placeholder = cat.count;
			this.submitEl.innerHTML = 'Submit';
			this.cancelEl.innerHTML = 'Cancel';

			// Placing all Elements
			this.packElements();
		},

		packElements: function () {

			// Packing Admin Elements
			this.formEl.appendChild(this.nameInputEl);
			this.formEl.appendChild(this.urlInputEl);
			this.formEl.appendChild(this.countInputEl);
			this.formEl.appendChild(this.submitEl);
			this.formEl.appendChild(this.cancelEl);
			this.adminEl.appendChild(this.formEl);

			// Packing all elements into content element
			this.catInfoEl.appendChild(this.catNamEl);		// CatName 		--> Cat Info
			this.catInfoEl.appendChild(this.countEl);		// Count 		--> Cat Info
			this.containerEl.appendChild(this.imagEl);		// Image 		--> Container
			this.containerEl.appendChild(this.catInfoEl);	// Cat Info 	--> Container
			this.ulEl.appendChild(this.liEl);				// li 			--> ul
			this.listEl.appendChild(this.ulEl);				// ul 			--> List
			this.contentEl.appendChild(this.listEl);		// List 		--> Content
			this.contentEl.appendChild(this.containerEl);	// Container 	--> Content
			this.contentEl.appendChild(this.adminEl);		// Admin 	 	--> Content
			this.contentEl.appendChild(this.adminButtonEl);	// Admin Button --> Content

			// Rendering
			this.render();
		},

		render: function () {
			// Select <body> and mutate it
			var body = $('body')[0];
			body.innerHTML = this.contentEl.innerHTML;
		}
	}

	// Initialize everything
	octopus.init();

})();