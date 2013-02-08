node.addEventListener('tap', function(e){
	togglePicture();
});

node.addEventListener('touchstart', function(e){
	//CustomEvent is a special event type
	var tap = document.createEvent('CustomEvent');
	tap.initCustomEvent('tap', true, true, null);
	node.dispatchEvent(tap);
});
