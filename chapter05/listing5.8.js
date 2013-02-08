//consolidate the update into one place
function handleStateChange(count) {
	num.innerHTML = count;
	document.title = 'Number ' + count;
}

if(!useHash) {
	
	//this is the lightweight bversion
	addEventListener('popstate', function(e) {
		if( e.state && e.state.count ) {
			handleStateChange(e.state.count);
		} else {			
			setNumFromUrl();			
		}		
	});
	
} else {
	
	//because the first popstate isn't called,
	//we need to call this manually
	setNumFromUrl();
	
	//we need to know the old value
	//to be able to see if ti changed
	var oldHash = location.hash;
	
	//poll every 100ms
	window.setInterval(function(){

		var match;
		if( window.hash !== oldHash ){
			match = location.hash.match(hashExp);
			oldHash = location.hash;
			if(match) {
				handleStateChange(match[1]);
			}
		}
		
	}, 100);
}
