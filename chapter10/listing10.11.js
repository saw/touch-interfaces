function goTo(direction) {
	moving = true;

	if(direction == 1) {
		//when the moving is done, move on to the next slide,
		//saving object wehre possible.
		currentSlide.onMoveEnd(function(){
			//we don't need this anymore
			currentSlide.destroy();
			prevSlide = currentSlide;
			currentSlide = nextSlide;
			birds.advance();
			prepare();
		});
		
		currentSlide.moveTo(0 - window.innerWidth);
		nextSlide.moveTo(0);
		
	} else {
		
		currentSlide.onMoveEnd(function(){
			currentSlide.destroy();
			currentSlide = prevSlide;
			nextSlide = currentSlide;
			birds.goBack();
			prepare();
		});
		
		currentSlide.moveTo(window.innerWidth);
		nextSlide.moveTo(window.innerWidth);
		prevSlide.moveTo(0);
		
	}

}