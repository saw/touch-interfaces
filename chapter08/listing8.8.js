function handleScroll(e, force) {
	
	//if scroll hasn't changed, do nothing;
	if(!force && lastScrollY == window.scrollY) {
		window.setTimeout(handleScroll, 100);
		return;
	} else {
		lastScrollY = window.scrollY;
	}
	
	scrollY = window.scrollY;
	innerHeight = window.innerHeight;
	topViewPort = scrollY -1000;
	bottomViewPort = scrollY + innerHeight + 1000;

	if(window.scrollY + innerHeight + 2000 > document.body.offsetHeight) {
		fetchBirds();
	}
	
	handleDefer();
	window.setTimeout(handleScroll, 100);
} 

window.setTimeout(handleScroll, 100);

fetchBirds();