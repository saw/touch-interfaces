var slideMap = {};

//to simplify look up this now takes a photo id,
//which is the same as a slide id.
function isVisible(id) {
	
	var offTop, offsetHeight, data;
	
	//if the slide is cached we can get the
	//values from there
	if(slideMap[id]){
		offTop = slideMap[id].offTop;
		offsetHeight = slideMap[id].offsetHeight;
	
	//if the slide is not cached, update the cache
	}else {
		node = document.getElementById('s-' + id);
		offsetHeight = parseInt(node.offsetHeight);
		offTop = parseInt(node.offsetTop);
		data = {
			node:node,
			offTop:offTop,
			offsetHeight:offsetHeight
		};
		
		slideMap[id] = data;
	}

	//in the cached case this is just math, no DOM inspection at all
	if(offTop + offsetHeight > topViewPort && offTop < bottomViewPort) { 
		return true;
	} else {
		return false;
	}
}