function setPosition(node, left) {
	node.style[TRANSFORM] =  "translate3d("+left+"px, 0, 0)";
}

function addTransitions(node){
	node.style[TRANSITION] = TRANSFORM_CSS + ' .25s ease-in-out';
	
	node.addEventListener(TRANSITION_END, function(e){
		window.setTimeout(function(){
			e.target.style[TRANSITION] = 'none;'
		}, 0)
	})
}

function cleanTransitions(node){
	node.style[TRANSITION] = 'none';
}