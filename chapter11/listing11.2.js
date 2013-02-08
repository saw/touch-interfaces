var touches = {};

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