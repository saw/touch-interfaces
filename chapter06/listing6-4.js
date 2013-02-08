function addTapListener(node, callback) {
	
	//start by supporting mousevents
	var startEvent = 'mousedown', endEvent = 'mouseup';
	
	//if touch events are available use them instead
	if (typeof(window.ontouchstart) != 'undefined') {
		//touch events work
		startEvent = 'touchstart';
		endEvent   = 'touchend';
	}
	
	node.addEventListener(startEvent, function(e) {
		var tap = document.createEvent('CustomEvent');
		tap.initCustomEvent('tap', true, true, null);
		node.dispatchEvent(tap);
	});	
	
	node.addEventListener(endEvent, function(e) {
		var tapend = document.createEvent('CustomEvent');
		tapend.initCustomEvent('tapend', true, true, null);
		node.dispatchEvent(tapend);
	})
	
	node.addEventListener('tap', callback);
}
