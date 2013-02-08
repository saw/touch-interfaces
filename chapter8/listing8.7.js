function isVisible(node) {
	//get the dimensions we need
	var scrollTop = window.scrollY,
		offTop = node.offsetTop,
		offsetHeight = node.offsetHeight,
		innerHeight = window.innerHeight,
		topViewPort = scrollTop,
		bottomViewPort = scrollTop + innerHeight;
		
	//figure out if it is in the viewport or not
	return offTop + offsetHeight > topViewPort && offTop < bottomViewPort;
}

function handleDefer() {
	//find all the slides, I'm fetching the container
	//rather than the image because I don't know the image
	//heights yet
	var list = document.querySelectorAll('.slide');
	for (var i=0, len = list.length; i < len; i++) {
		thisImg = list[i].querySelector('.img');
		if(thisImg.src) {
			continue;
		}
		//if they are visible, update the src
		if(isVisible(list[i])) {
			var src = thisImg.getAttribute('data-src');
			if(src) {
				thisImg.src = src;
				thisImg.removeAttribute('data-src');
			}
			
		}
	}
}