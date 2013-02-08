function show(startSlide){
	if(!chromeBuilt){
		buildChrome();
		attachEvents();
	}
	wrapper.style.display = 'block';
	boundingBox = [ window.innerWidth, window.innerHeight ];

	goTo(slideMap[startSlide]);
	attachTouchEvents();
}