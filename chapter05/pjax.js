
//build up data for routes, so we don't 
//have to keep looking up latin names
var latinNameMap = {};
var links = document.querySelectorAll('.nav-link');
var href;

//cache the ajax responses in memory,
//so next time the user goes to that bird 
//it's faster
var pageCache = {};


//rather than lookup each time, I am going to 
//grab all the latin names and cache them at init time
for (var i=0, len = links.length; i < len; i++) {
	href = normalizeLink(links[i].href);
	latinNameMap[href] = links[i].getAttribute('data-latin');
}

//browsers behave differenly with links, and what they 
//include, even for relative paths.
function normalizeLink(path) {
	return path.match(/([a-z_]+\.html)/)[1];
}

//this function handles the route callbacks
function handlePage(path) {
	var href = normalizeLink(path);
	birdData.changePhoto(latinNameMap[href]);
	
	if(pageCache[href]) {
		document.querySelector('.content').innerHTML = pageCache[href];
	} else {
		ajax.makeRequest(href.replace('.html', '_frag.html'), function(xhr) {
			document.querySelector('.content').innerHTML = xhr.responseText;
			pageCache[href] = xhr.responseText;

		}, this);
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

});