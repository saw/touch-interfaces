var startPos, lastPos;
function handleTouchEvents(e){
	
	//going left or right?
	var direction = 0;
	
	if(e.type == 'touchstart'){
		startPos = e.touches[0].clientX;
		lastPos = startPos;
		direction = 0;
		if(slideData[currentSlide] && slideData[currentSlide].node){
			cleanTransitions(slideData[currentSlide].node);
		}
		
		if(slideData[currentSlide + 1] && slideData[currentSlide + 1].node){
			cleanTransitions(slideData[currentSlide + 1].node);
		}
		
		if(slideData[currentSlide - 1] && slideData[currentSlide -1].node){
			cleanTransitions(slideData[currentSlide -1].node);
		}
		
	}else if(e.type == 'touchmove'){
		e.preventDefault();
		//if the last position is bigger than the starting position, the 
		//gesture is moving right
		if(lastPos > startPos){
			direction = -1;
		}else{
			direction = 1;
		}
		
		//Move the currently visible slide with the gesture, as well as
		//the next or previous, depending on the direction
		if(slideData[currentSlide]){
			setPosition(slideData[currentSlide].node, e.touches[0].clientX - startPos);
			if(direction !== 0 && slideData[currentSlide + direction]){
				if(direction < 0){
					setPosition(slideData[currentSlide + direction].node, 
						(e.touches[0].clientX - startPos) - boundingBox[0]);
				}else if(direction > 0){
					setPosition(slideData[currentSlide + direction].node, 
						(e.touches[0].clientX - startPos) + boundingBox[0]);	
				}
			} 
		}
		
		//record the last position
		lastPos = e.touches[0].clientX;
		
	}else if(e.type == 'touchend'){
		
		//check if the threshold was crossed
		if(lastPos - startPos > 50){
			goTo(currentSlide-1);
		} else if(lastPos - startPos < -50){
			goTo(currentSlide+1);
		}else{
		
			//we didn't go far enough, so snap back to the last position
			addTransitions(slideData[currentSlide].node);
			setPosition(slideData[currentSlide].node, 0);
			
			if(slideData[currentSlide + 1] && slideData[currentSlide + 1].node){
				addTransitions(slideData[currentSlide + 1]);
				setPosition(slideData[currentSlide + 1].node, boundingBox[0]);
			}
			
			if(slideData[currentSlide - 1] && slideData[currentSlide - 1].node){
				addTransitions(slideData[currentSlide - 1]);
				setPosition(slideData[currentSlide - 1].node, 0 - boundingBox[0]);
			}
			
		}


	}
	
}