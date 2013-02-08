function handleTouch(e) {

	var diff, anchor, direction = 0;
	
	if(moving) {
		return;
	}
	
	//if the target is inside the scrollable area,
	//stop handling events
	if(getAncestor(e.target, 'DIV').className == 'bd') {
		nextSlide.hide();
		return;	
	} else {
		e.preventDefault();
	}
	
	switch (e.type) {
		case 'MSPointerDown':
		case 'touchstart':

			startPoint = e.touches ? e.touches[0].pageX : e.screenX;
			currentSlide.cleanTransitions();
			if(nextSlide) {
				nextSlide.cleanTransitions();
				nextSlide.show();
			}		
			if(prevSlide) {
				prevSlide.cleanTransitions();
				prevSlide.show();
			}
			lastPos = e.touches ? e.touches[0].pageX : e.screenX;
			break;
		case 'MSPointerMove':
		case 'touchmove':
			e.preventDefault();
			
			diff = e.touches ? e.touches[0].pageX - startPoint : e.screenX - startPoint;
			
			currentSlide.setLeft(diff);
			if(diff > 0) {
				prevSlide && prevSlide.setLeft(diff - window.innerWidth);
			} else {
				nextSlide && nextSlide.setLeft(diff + window.innerWidth);
			}
			lastPos = e.touches ? e.touches[0].pageX : e.screenX;
			break;
			
		case 'MSPointerUp':
		case 'touchcancel':
		case 'touchend':
			//unchanged
			break;
	}
}