function setNumFromUrl() {

	//There is a query string, so handle that
	if(location.search) {
		
		var match = location.search.match(/num=([0-9]+)/);
		if(match) {
			
			//if pushState doesn't work, we need to 
			//scrub the query string and redirect to the hash version
			if(useHash) {
				location = 'history.HTML#' + match[1];
				
			} else {
				document.getElementById('number').innerHTML = match[1];
				document.title = 'Number ' + match[1];
			}
		}
	
	//No query string, but there is a hash, so we should use that
	}else if (location.hash) {
		
		var match = location.hash.match(hashExp);
		
		
		document.getElementById('number').innerHTML = match[1];
		document.title = 'Number ' + location.hash;
		
		//if the user can use push state, but came with a hash url, 
		//we can upgrade the url with replaceState.
		if(!useHash) {
			history.replaceState({count:match[1]}, null, '
						history.HTML?num=' + match[1]);
		}
	
	//The default state
	} else {
		document.getElementById('number').innerHTML = 1;
		document.title = 'Number 1';
	}
}
