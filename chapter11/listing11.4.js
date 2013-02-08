 document.addEventListener('touchstart', function(e){
	e.preventDefault();
	var len = e.touches.length, thistouch;
	for (var i=0; i < len; i++) {
		thistouch = e.touches[i];
		
		touches[thistouch.identifier] = new MyTouch(thistouch.identifier);
		touches[thistouch.identifier].setPos(thistouch.pageX, thistouch.pageY);
	}
});