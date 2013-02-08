var currentSlide, nextSlide, lastSlide,
moving = false,
THRESHOLD = 100,
nextSlide,
prevSlide;

function prepare() {
	//find out if there are more slides to make
	var nextBird = birds.nextBird(),
	    prevBird = birds.prevBird();
	
	//make a slide if we can and we haven't already
	if(nextBird && (!nextSlide || nextSlide.id !== nextBird)) {
		getBirdData(birds.nextBird().path, function(resp) {
			nextSlide = new Slide(birds.nextBird().name, resp);
			nextSlide.hide();
			nextSlide.setLeft(window.innerWidth);
		});
		
	} else if(!nextBird) {
		nextSlide = false;
	}
	
	//same for the previous
	if(prevBird && (!prevSlide || prevSlide.id != prevBird)){
		getBirdData(birds.prevBird().path, function(resp) {
			prevSlide = new Slide(birds.prevBird().name, resp);
			prevSlide.hide();
			prevSlide.setLeft(-window.innerWidth);
		});
	} else if (!prevBird){
		prevSlide = false;
	}
}