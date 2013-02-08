(function(){
	
	var testSelector = (function() {
		
		var prefixList, len, i, testFunc, bd;
		
		prefixList = ['webkit', 'moz', 'ms', 'o'];
		len = prefixList.length;
		
		bd = document.body;
		
		for (i=0; i < len; i++) {
			
			if (bd[prefixList[i] + 'MatchesSelector']) {
				testFunc = prefixList[i] + 'MatchesSelector';
				break;
			}
			
		}
		
		return function(node, selector) {

			return node[testFunc](selector);

		}
		
	})();
	
	function View(config) {
		
		this.template = config.template || null;
		
		this.container = config.container || 'body';
		
		this.events = config.events || {};
		
		this.model = config.model || null;
		
		this._listeners = {};
		
		this._eventsBound = false;
		
		if(config.init) {
			this.init = config.init;
		}
		
		this.init();
		
	}
	
	/*
	returns the container, 
	but also attaches all
	the events
	config: {
		type: callback(),
		type: callback()
	}
	
	*/
	View.prototype.getContainer = function() {
		
		var c, type, selector, thisObj, that = this, len;
		
		c = document.querySelector(this.container);
		
		//events are already bound, just renturn the node
		if(this._eventsBound) {
			return c;
		}
		
		//loop throw the events, adding them to the listener array
		for(selector in this.events) {

			if (this.events.hasOwnProperty(selector)) {
				
				thisObj = this.events[selector];
				
				for(type in thisObj) {
					if(!thisObj.hasOwnProperty(type)) {
						continue;
					}
					if(this._listeners[type]) {
						this._listeners[type].push(
							{
								handler: thisObj[type],
								selector: selector
							}
						);
					} else {
						this._listeners[type] = [];
						this._listeners[type].push(
							{
								handler: thisObj[type],
								selector: selector
							}
							
						);
					}
				}
			}
		}
		
		//bind the actuall event listeners
		for(type in this._listeners) {
			c.addEventListener(type, function(e){
				var type = e.type, i;
				len = that._listeners[type].length;
				
				for (i=0; i < len; i++) {
					// test the selectors, if there is a match, delegate
					// the event
					if(testSelector(e.target, that._listeners[type][i].selector)){
						that._listeners[type][i].handler.call(that, e);
					}	
				}
				
			}, true);
		
		}
		
		this._eventsBound = true;
		return c;
		
	}
	
	View.prototype.hide = function() {
		this.getContainer().style.display = 'none';
	};
	
	View.prototype.show = function() {
		this.getContainer().style.display = 'block';
	}
	
	View.prototype.render = function() {
		
		var tmplData = {}, container;
		
		if(this.model) {
			tmplData = this.model.toJSON();
		}
		
		if (typeof this.template === 'function') {
			container = this.getContainer();
			container.innerHTML = this.template(tmplData);
			this.containerNode = container;
		}
		
		window.scrollTo(0,1);
		
	};
	
	window.View = View;
	
})();