function fetchBirds() {
	
	//don't refetch if a fetch is in progress
	if(fetching) {
		return;
	} else {
		fetching = true;
	}

	window.birdData.fetchPhotos('seagull', page++, function(data) {
		console.time('render');
		var len = data.length,
		str = '',
		frag;
		
		for (var i=0; i < len; i++) {
			str += template(data[i]);
		}
		frag = document.createElement('div');
		frag.innerHTML = str;
		document.getElementById('wrapper').appendChild(frag);
		updateSlideCache(frag);
		fetching = false;
		//fire the defer code once to make sure the visible photos
		//load
		handleScroll(null, true);
		console.timeEnd('render');
	});
}