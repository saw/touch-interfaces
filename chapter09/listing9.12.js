function init(){
	var slides = containerNode.querySelectorAll('li');
	var thisSlide, thisImg;
	
	for (var i=0; i < slides.length; i++) {
		thisSlide = {}, thisImg = slides[i].querySelector('img');
		
		//substitute the large "Z" size image from flickr for the thumbnail
		thisSlide.url = thisImg.getAttribute('src').replace(/_s|_q/, '_z');
		
		thisSlide.height = thisImg.getAttribute('data-full-height');
		thisSlide.width = thisImg.getAttribute('data-full-width');
		thisSlide.link = slides[i].querySelector('a').href;
		
		//add to the slidemap.
		slideMap[thisSlide.link] = slideData.push(thisSlide) - 1;
		thisSlide.id = slideMap[thisSlide.link];
	}
}