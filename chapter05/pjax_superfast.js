
//build up data for routes, so we don't 
//have to keep looking up latin names
var latinNameMap = {};
var links = document.querySelectorAll('.nav-link');
var href;

//keep references to the DOM nodes,
//so they are easy to look up.
var pages = {};

//generate unique ids for the nodes.
//We aren't going to use them, but we might want
//them later.
var idInc = 0;

//load the template.
tmpl = document.getElementById('tmpl').innerHTML;

//browsers behave differenly with links, and what they 
//include, even for relative paths.
function normalizeLink(path) {
	return path.match(/([a-z_]+\.html)/)[1];
}

function hidePages() {
	var page;
	
	for (page in pages) {
		pages[page].style.display = 'none';
	}
}

//this function handles the route callbacks
function handlePage(path) {
	var href = normalizeLink(path);
	var thispage;
	
	if(!pages[href]) {
		
		//hide all the other pages right away
		hidePages();
		
		ajax.makeRequest(href.replace('.html', '.json'), function(xhr) {
			var data = JSON.parse(xhr.responseText);
			
			//create an elment to hold the page
			var contentHolder = document.createElement('div');
			
			//give it an id
			contentHolder.id = 'birds-' + idInc++;
			
			//and render the template into it
			contentHolder.innerHTML = renderTemplate(tmpl, data);
			document.querySelector('.main').appendChild(contentHolder);
			
			pages[href] = contentHolder;
			
		}, this);
	} else {
		hidePages();
		pages[href].style.display = 'block';
	}
}

router.addRoute(/[a-z_]+\.html/, handlePage);

//intercept all the clicks, if they are on anchors
//pass them to the router. 
document.addEventListener('click', function(e) {

	if(e.target.href) {
		if(router.handleRoute(e.target.href)) {
			e.preventDefault();
		}
	}

}, true);