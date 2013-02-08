//The First slide
currentSlide = new Slide(thisBird, false, '.slide');
prepare();

document.addEventListener('touchstart', handleTouch);
document.addEventListener('touchmove', handleTouch);
document.addEventListener('touchend', handleTouch);

//prime the cache
birds.birdAtOffset(-2) && getBirdData(birds.birdAtOffset(-2).path);
birds.birdAtOffset(2) && getBirdData(birds.birdAtOffset(2).path);
birds.birdAtOffset(3) && getBirdData(birds.birdAtOffset(3).path);