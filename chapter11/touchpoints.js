"use strict";
(function() {


    var touches = {};
    var killers = {};


    var TRANSITION = 'transition',
        TRANSFORM = 'transform',
        TRANSITION_END = 'transitionend',
        TRANSFORM_CSS = 'transform',
        TRANSITION_CSS = 'transition';

    if (typeof document.body.style.webkitTransform !== "undefined") {
        TRANSITION = 'webkitTransition';
        TRANSFORM = 'webkitTransform';
        TRANSITION_END = 'webkitTransitionEnd';
        TRANSFORM_CSS = '-webkit-transform';
        TRANSITION_CSS = '-webkit-transition'
    }


    function MyTouch(id) {
        this.id = id;
        var touchee = document.createElement('div');
        touchee.className = 'touched';
        touchee.style.opacity = 0;
		touchee.id = id;
        touchee.addEventListener(TRANSITION_END, function() {
            touchee.style[TRANSFORM] = '';
        });

        document.body.appendChild(touchee);
        this.node = touchee;
    }

    MyTouch.prototype.setPos = function(posX, posY) {

        this.node.style.opacity = 1;
        var x = Math.round(posX - 50) + 'px';
        var y = Math.round(posY - 50) + 'px';
        this.node.style[TRANSFORM] = "translate3d(" + x + "," + y + ",0)"

    }

    MyTouch.prototype.destroy = function(cb) {
		this.fade();
		var node = this.node, id = this.id;
		window.setTimeout(function() {
			node.parentNode && node.parentNode.removeChild(node);
			delete(touches[id]);
		}, 1000);
        
    }

    MyTouch.prototype.fade = function() {
        this.node.style[TRANSITION] = 'opacity .5s ease-in-out';
        this.node.style.opacity = 0;

    }

    function kill(id) {
		touches[id] && touches[id].destroy();
    }

    
    function reaper() {
        var id;
        for (id in touches) {
            kill(id);
        }
    }

    function moverMS(e) {
        if (!touches[e.pointerId]) {
            touches[e.pointerId] = new MyTouch(e.pointerId);
        }
     
        touches[e.pointerId].setPos(e.clientX, e.clientY);
    }

    function mover(e) {
        e.preventDefault();
        var len = e.touches.length,
            thistouch;
        for (var i = 0; i < len; i++) {
            thistouch = e.touches[i];
            if (!touches[thistouch.identifier]) {
                touches[thistouch.identifier] = new MyTouch(thistouch.identifier);
            }
            touches[thistouch.identifier].setPos(thistouch.pageX, thistouch.pageY);
        }
    }
    
    function touchend(e) {
        window.clearTimeout(reap);
        for (var i=0; i < e.changedTouches.length; i++) {
            kill(e.changedTouches[i].identifier);
        }

        //kill any stray touches that don't get cleaned
        reap = window.setTimeout(reaper, 100);
    }
    
    function touchendMS(e) {
        window.clearTimeout(reap);
        kill(e.pointerId);
        
        //kill any stray touches that don't get cleaned
        reap = window.setTimeout(reaper, 100);
    }



    document.addEventListener('touchstart', mover);
    document.addEventListener('touchmove', mover);

    document.addEventListener('MSPointerStart', moverMS);
    document.addEventListener('MSPointerMove', moverMS);

    document.addEventListener('MSPointerUp', touchendMS);
    
    var reap;
    document.addEventListener('touchend', touchend);
    document.addEventListener('touchcancel', touchend);
}());
