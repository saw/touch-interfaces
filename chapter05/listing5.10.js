//intercept all the clicks, if they are on anchors
//pass them to the router. 
document.addEventListener('click', function(e) {

	//if it has an href, assume it is an anchor
	if(e.target.href) {
		if(router.handleRoute(e.target.href)) {
			e.preventDefault();
		}
	}

}, true);
