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

	/* Larry the OCTOPUS to manage MODEL data and run VIEWs 
	 * It controls model, viewList, viewCont, createDom variables
	 */
	var octopus = {
		
		init: function () {

			// Selecting the first cat
			model.selectedCat = model.cats[0];

			// Activating VIEWs
			createDom.init();
			viewList.init();
			viewCont.init();
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

	/* VIEW LIST
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

	/* VIEW CONTAINER
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

	/* CREATEDOM 
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

			// Set all attributes
			this.setAttributes();
		},

		setAttributes: function () {

			// Simply sets all needed attributes
			this.listEl.setAttribute('id','list');				// #list
			this.containerEl.setAttribute('id','container');	// #container
			this.catNamEl.setAttribute('id', 'catName');		// #catName
			this.countEl.setAttribute('id', 'count');			// #count
			this.contentEl.setAttribute('id','content');		// #content
			this.containerEl.setAttribute('class','flex');		// .flex
			this.catInfoEl.setAttribute('class', 'catInfo');	// .catInfo

			// Placing all Elements
			this.packElements();
		},

		packElements: function () {

			// Packing all elements into content element
			this.catInfoEl.appendChild(this.catNamEl);		// CatName 		--> Cat Info
			this.catInfoEl.appendChild(this.countEl);		// Count 		--> Cat Info
			this.containerEl.appendChild(this.imagEl);		// Image 		--> Container
			this.containerEl.appendChild(this.catInfoEl);	// Cat Info 	--> Container
			this.ulEl.appendChild(this.liEl);				// li 			--> ul
			this.listEl.appendChild(this.ulEl);				// ul 			--> List
			this.contentEl.appendChild(this.listEl);		// List 		--> Content
			this.contentEl.appendChild(this.containerEl);	// Container 	--> Content

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