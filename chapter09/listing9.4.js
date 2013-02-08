var TRANSITION_END = 'webkitTransitionEnd',
	TRANSITION_CSS = '-webkit-transition',
	TRANSFORM_CSS = '-webkit-transform',
	TRANSFORM = 'webkitTransform',
	TRANSITION = 'webkitTransition';

//unprefixed
if(document.body.style.transform) {
	TRANSITION_END = 'transitionend';
	TRANSITION_CSS = 'transition';
	TRANSFORM_CSS = 'transform';
	TRANSFORM = 'transform';
	TRANSITION = 'transition';
}

var l = $('form').offsetLeft;

var startLeft;

function handleTouch(e) {

	switch(e.type) {
		case 'touchstart':
		
			break;
		case 'touchmove':
		
			break;
		case 'touchcancel':
		
			break;		
		case 'touchend':
		
			break;
	}
}

theSwitch.addEventListener('touchstart', handleTouch);
theSwitch.addEventListener('touchend', handleTouch);
theSwitch.addEventListener('touchmove', handleTouch);