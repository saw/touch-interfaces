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
    
    NodeFacade.prototype.on = function(evt, callback, scope) {
        
        var scopeObj;
        
        if(!scope) {
            scopeObj = this._node;
        } else{
            scopeObj = scope;
        }

        
        if (evt === 'tap') {
            this._node.addEventListener(TOUCHSTART, function() {
                callback.apply(scope, arguments);
            });
        } else if (evt === 'tapend') {
            this._node.addEventListener(TOUCHEND, function() {
                callback.apply(scope, arguments);
            });
        } else {
            this._node.addEventListener(evt, function() {
                callback.apply(scope, arguments);
            });
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
