(function(){
	
	var TOUCHSTART, TOUCHEND;
	
	//normal touch events
	if (typeof(window.ontouchstart) != 'undefined') {
		
		TOUCHSTART = 'touchstart';
		TOUCHEND   = 'touchend';
		
	//microsoft touch events
	} else if (typeof(window.onmspointerdown) != 'undefined') {
		TOUCHSTART = 'MSPointerDown';
		TOUCHEND   = 'MSPointerUp';
	} else {
		TOUCHSTART = 'mousedown';
		TOUCHEND   = 'mouseup';
	}
	
	
	function NodeFacade(node){
		
		this._node = node;
		
	}
	
	NodeFacade.prototype.getDomNode = function() {
		return this._node;
	}
	
	NodeFacade.prototype.on = function(evt, callback) {
		
		if (evt === 'tap') {
			this._node.addEventListener(TOUCHSTART, callback);
		} else if (evt === 'tapend') {
			this._node.addEventListener(TOUCHEND, callback);
		} else {
			this._node.addEventListener(evt, callback);
		}
		
		return this;
		
	}
	
	NodeFacade.prototype.off = function(evt, callback) {
		if (evt === 'tap') {
			this._node.removeEventListener(TOUCHSTART, callback);
		} else if (evt === 'tapend') {
			this._node.removeEventListener(TOUCHEND, callback);
		} else {
			this._node.removeEventListener(evt, callback);
		}
		
		return this;
	}
	
	window.$ = function(selector) {

		var node = document.querySelector(selector);

		if(node) {
			return new NodeFacade(node);
		} else {
			return null;
		}
	}
	
	
})();

$('.button').on('tap', function(e) {
	e.preventDefault();
	togglePicture();
	e.target.className = "active button";
}).on('tapend', function(e) {
	e.target.className = "button";
});
