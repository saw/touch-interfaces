function Lightbox (selector) {
	
	var containerNode = $(selector), 
		wrapper, 
		chromeBuilt, 
		
		currentSlide = 0,
		slideData =[],
		
		boundingBox = [0,0],
		
		slideMap = {};
		
	//call init right away.	
	init();
		
	return {
		
		show: show,
		hide: hide
	};
	
}