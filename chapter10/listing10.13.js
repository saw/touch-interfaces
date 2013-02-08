function isLink(element) {
	return getAncestor(element, 'A');
}

function getAncestor(element, tag) {
	if(!element.tagName || !tag) {
		return false;
	}
	if (element.tagName == tag) {
		return element;
	} else if(element.tagName !== 'BODY'){
		return getAncestor(element.parentNode, tag);
	} else {
		return false
	}
}

var lastPos, startPoint;

function handleTouch(e) {
	var diff, anchor, direction = 0, bd;
	
	if(moving) {
		return;
	}
	
	
	//if the target is inside the scrollable area,
	//stop handling events
	bd = getAncestor(e.target, 'DIV');
	if(bd && bd.className == 'bd') {
		nextSlide.hide();
		return;	
	} else {
		e.preventDefault();
	}
	
	switch (e.type) {
		case 'touchstart':
			startPoint = e.touches[0].pageX;
			
			//make sure transitions are cleaned off
			currentSlide.cleanTransitions();
			
			//show the hidden slides
			if(nextSlide) {
				nextSlide.cleanTransitions();
				nextSlide.show();
			}
			
			if(prevSlide) {
				prevSlide.cleanTransitions();
				prevSlide.show();
			}
			
			lastPos = e.touches[0].pageX;
			break;
			
		case 'touchmove':
			e.preventDefault();
			diff = e.touches[0].pageX - startPoint;
			
			//move all three slides together
			currentSlide.setLeft(diff);
			if(diff > 0) {
				prevSlide && prevSlide.setLeft(diff - window.innerWidth);
			} else {
				nextSlide && nextSlide.setLeft(diff + window.innerWidth);
			}
			
			lastPos = e.touches[0].pageX;
			break;
			
		case 'touchcancel':
		case 'touchend':
			diff = lastPos - startPoint;
			
			//if the swipe was very short,
			//and on an anchor, assume it was a tap
			if(Math.abs(diff) < 5) {
				anchor = isLink(e.target);
				if(isLink(e.target)) {
					window.location = anchor.href;
				}
			}
			
			//figure out if we are advancing,
			//going back or going nowhere
			if(diff < -THRESHOLD && nextSlide) {
				goTo(1);
			}else if (diff > THRESHOLD && prevSlide) {
				goTo(-1);
			} else {
				//snap back if we are going nowhere
				currentSlide.moveTo(0);
				nextSlide.moveTo(window.innerWidth);
				prevSlide.moveTo(-window.innerWidth);
			}
			break;
	}
}