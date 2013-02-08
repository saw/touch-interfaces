//a function to build a function, so browser checks only run once
var requestFrame = (function() {
	var thisFunc,
	    prefixList = ['webkit', 'moz', 'ms'];
	
	//check each method for availability, when one is found,
	//use that
	for (var i=0; i < prefixList.lenth; i++) {
		thisFunc = prefixList[i] + 'RequestAnimationFrame';

		if(window[thisFunc]) {
			return function(callback) {
				window[thisFunc](callback);
			}
		}
	}
	
	//if we got here none was found, fallback to 15fps setTimeout
	return function(callback) {
		window.setTimeout(callback, 67);
	}
	
})();


(function(){
	
	var destination = 500;
	var start = 0;
	
	var ball = document.getElementById('ball');
	
	function move(element){	
		start = start + 10;
		element.style.top = (start) + 'px';
		
		if (start < destination) {
			requestFrame(function(){
				move(element);
			});
		}
	}
	
	move(ball);
	
})();
