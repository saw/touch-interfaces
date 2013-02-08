function attachTouchEvents() {

	var bd = document.querySelector('html');
	bd.addEventListener('touchmove', handleTouchEvents);
	bd.addEventListener('touchstart', handleTouchEvents);
	bd.addEventListener('touchend', handleTouchEvents);
	
}