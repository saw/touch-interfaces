function fetchBirds() {
	if(fetching) {
		return;
	} else {
		fetching = true;
	}

	window.birdData.fetchPhotos('seagull', page++, function(data) {
		console.time('render');
		var len = data.length;
		for (var i=0; i < len; i++) {
			document.getElementById('wrapper').innerHTML += template(data[i]);
		}
		fetching = false;
		handleDefer();
		console.timeEnd('render');
	});
}