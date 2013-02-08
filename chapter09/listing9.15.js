function handleClicks(e){
	var targ = e.target;
	
	//prevent default is only called when conditions match
	//so that clicks to external resoures (like Flickr) work.
	if(targ.className == 'next') {
		e.preventDefault();
		goTo(currentSlide + 1);
	} else if(targ.className == 'prev'){
		e.preventDefault();
		goTo(currentSlide - 1);
	} else if (targ.className != 'flickr-link') {
		e.preventDefault();
		hide();
	}
}

function attachEvents(){
	wrapper.addEventListener('click', handleClicks);
}