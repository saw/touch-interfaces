function goTo(slideNum){
	
	var thisSlide;
	
	//failure, return to last slide
	if(!slideData[slideNum]){
		goTo(currentSlide);
	}
	
	if(Math.abs(currentSlide - slideNum) !== 1 && 
	slideData[currentSlide] && slideData[currentSlide].node){
		//current slide not adjacent to new slide!
		setPosition(slideData[currentSlide].node, 
		(slideNum < currentSlide)  ? boundingBox[0] : 0 -  boundingBox)
	}
	
	thisSlide = slideData[slideNum];
	
	//build the adjacent slide
	buildSlide(slideNum);
	buildSlide(slideNum + 1);
	buildSlide(slideNum - 1);
	
	//animate the slides entering and leavign
	if(thisSlide.node){
		addTransitions(thisSlide.node);
		setPosition(thisSlide.node, 0);
	}
	
	if(slideData[slideNum - 1] && slideData[slideNum-1].node){
		addTransitions(slideData[slideNum - 1 ].node);
		setPosition( slideData[slideNum - 1 ].node , (0 - boundingBox[0]) );
	}
	
	if(slideData[slideNum + 1] && slideData[slideNum + 1].node){
		addTransitions(slideData[slideNum + 1 ].node);
		setPosition(slideData[slideNum + 1 ].node, boundingBox[0] );
	}
	
	currentSlide = slideNum;
}