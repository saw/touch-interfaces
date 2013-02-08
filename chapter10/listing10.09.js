
/* Utility functions/browser normalization */
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

/*
 * id is the unique DOM idea
 * content is the html that this slide represents
 * and the selector is used in the case that the slide
 * content is already on the page 
 */
function Slide(id, content, selector) {
	
	this.id = id;
	
	this.content = content;
	
	this._listeners = [];
	
	this.selector = selector;
	this._build();
}

/*
 * register a listener to be notified when the
 * transition is over 
 */
Slide.prototype.onMoveEnd = function(callback) {
	this._listeners.push(callback);
}

Slide.prototype._build = function(){
	
	var myNode, that, div;
	
	if(this.selector) {
		this.node = $(this.selector);
	} else {
		div = document.createElement('div');
		div.innerHTML = this.content;
		this.node = div.querySelector('.slide');
		document.querySelector('.view').appendChild(this.node);
	}
	
	this.node.id = this.id;
	myNode = this.node;
	that = this;
	this._handler = this.node.addEventListener(TRANSITION_END, function(e){
		if(!that || !that._listeners) {
			return;
		}
		var i;
		myNode.style[TRANSITION] = '';
		moving = false;
		for (i=0; i < that._listeners.length; i++) {
			if(typeof that._listeners[i] == "function") {
				that._listeners[i]();
			}
		};
	});
}

Slide.prototype.setLeft = function(left) {
	
	this.node.style[TRANSFORM] = "translate3d(" + left + 'px,0,0)';
}

Slide.prototype.moveTo = function(pos) {
	this.node.style[TRANSITION] = TRANSFORM_CSS +' .2s ease-out';
	this.node.style[TRANSFORM] = "translate3d("+pos+"px,0,0)";
}

Slide.prototype.cleanTransitions = function() {
	this.node.style[TRANSITION] = '';
}

Slide.prototype.hide = function() {
	this.node.style.display = 'none';
}

Slide.prototype.show = function() {
	this.node.style.display = 'block';
}

/* remove from the DOM. This will also allow the garbage collector
 * to clean up listeners
 */
Slide.prototype.destroy = function() {
	this._listeners = [];
	if(this.node.parentNode) {
		this.node.parentNode.removeChild(this.node);
	}	
}