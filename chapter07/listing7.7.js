(function(){
	
	var down = false,
	    trans = 'transition';
	    eventName = 'transitionend';
	
	//use prefix if necessary
	if(typeof document.body.style.webkitTransition === 'string') {
		trans = 'webkitTransition';
		eventName = 'webkitTransitionEnd';
	} else if (typeof document.body.style.MozTransition === 'string') {
		trans = 'MozTransition';
	}

	
	var ball = document.getElementById('ball'),
	   floor = document.getElementById('floor');
	
	function bounce() {
		if(down) {
			ball.style[trans] = "top 1s cubic-bezier(0, .27, .32, 1)";
			ball.style.top = '10px';
			down = false;
		} else {
			ball.style[trans] = "top 1s cubic-bezier(1, 0, 0.96, 0.91)";
			ball.style.top = (floor.offsetTop - 100) + 'px';
			down = true;
		}
	}
	
	ball.addEventListener(eventName, bounce);
	bounce();
	
})();