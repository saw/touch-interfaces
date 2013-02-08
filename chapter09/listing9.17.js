function buildSlide (slideNum) {
	
	var thisSlide, s, img, scaleFactor = 1, w, h;
	
	if(!slideData[slideNum] || slideData[slideNum].node){
		return false;
	}
	
	thisSlide = slideData[slideNum];
	s = slideTemplate(thisSlide);
	
	img = s.querySelector('div');
	
	//image is too big! scale it!
	if(thisSlide.width > boundingBox[0] || thisSlide.height > boundingBox[1]){
		
		if(thisSlide.width > thisSlide.height) {
			scaleFactor = boundingBox[0]/thisSlide.width;
		} else {
			scaleFactor = boundingBox[1]/thisSlide.height;
		}
		
		w = Math.round(thisSlide.width * scaleFactor);
		h = Math.round(thisSlide.height * scaleFactor);
		img.style.height = h + 'px';
		img.style.width = w + 'px';
		
	}else{
		img.style.height = thisSlide.height + 'px';
		img.style.width = thisSlide.width + 'px';
	}

	thisSlide.node = s;
	wrapper.appendChild(s);
	setPosition(s, boundingBox[0]);
	return s;
}