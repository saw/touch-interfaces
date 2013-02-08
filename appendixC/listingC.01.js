//based on http://www.nczonline.net/blog/2010/03/09/custom-events-in-javascript/
(function() {
	

	function Model(data) {
	
		if(!data) {
			this._data = {};
		} else {
			this._data = data;
		}
	
		this._listeners = {};
	}
 
	Model.prototype = {
 
		constructor: Model,
	
		set: function (key, value) {
			this._data[key] = value;
			this.fire(key + 'Change');
			this.fire('change');
		},
		
		setData: function (data) {
			var key;
			
			for (key in data) {
				if(data.hasOwnProperty(key)) {
					this._data[key] = data[key];
					this.fire(key + 'Change');
				}
			}
			
			this.fire('change');
		},
	
		get: function (key) {
			return this._data[key];
		},
		
		toJSON: function () {
			return this._data;
		},
		
		load: function () {
			
		},
 
		on: function (type, listener) {
			
 
			if (typeof this._listeners[type] == "undefined") {
				this._listeners[type] = [];
			}
 
			this._listeners[type].push(listener);
		
			var myEvent = type, that = this;
 
			return {
			
				remove: function () {

					//make sure the type still exists
					if (that._listeners[myEvent] instanceof Array) {
						var listeners = that._listeners[myEvent];
						
						//search through the listeners for this listener,
						//remove it with splice
						for (var i = 0, len = listeners.length; i < len; i++){
							if (listeners[i] === listener) {
								listeners.splice(i, 1);
								break;
							}
						}
						
					}
				}
			}
		},
 
		fire: function (event) {
 
			if (this._listeners[event] instanceof Array) {
				var listeners = this._listeners[event];
				for (var i = 0, len = listeners.length; i < len; i++) {
					listeners[i].call(this, event);
				}
			}
 
		}
	}

	window.Model = Model;

})();