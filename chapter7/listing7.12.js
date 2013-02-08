function animate(element, from, to, duration, callback) {
	
	//figure out how much to move per millisecond
	var pixelsPerMS = to/duration;
	
	//keep track of the position
	var pos = from;
	
	//keep track of the time
	var time = Date.now();
	
	//create the callback function
	var func = function(){
		
		var lastTime, elapse, pixelsToMove;
		
		lastTime = time;
		time = Date.now();
		elapsed = time - lastTime;

		//multiply the time elapsed by how many pixels
               //per ms to determine how far to move
		pixelsToMove = Math.ceil(elapsed * pixelsPerMS);
		
		pos = pos + pixelsToMove;
		
		//In real life this should do more than move elements
		//down.
		element.style.top = pos + 'px';
		
		if( pos < to ){
			requestFrame(func);
		} else {
			callback();
		}
		
	}
	
	func();
	
}

//move the ball 100 pixels in 5 seconds
animate(ball, 0, 100, 5000, function(){
	console.log('done!');
});
