function $(selector) {
	return document.querySelector(selector);
}

var TRANSITION     = 'transition',
	TRANSFORM      = 'transform',
	TRANSITION_END = 'transitionend',
	TRANSFORM_CSS  = 'transform',
	TRANSITION_CSS = 'transition';
	
if(typeof document.body.style.webkitTransform !== undefined) {
	TRANSITION = 'webkitTransition';
	TRANSFORM = 'webkitTransform';
	TRANSITION_END = 'webkitTransitionEnd';
	TRANSFORM_CSS = '-webkit-transform';
	TRANSITION_CSS = '-webkit-transition'
}