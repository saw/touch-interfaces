function setNumFromUrl() {
	if(location.search) {
		var match = location.search.match(/num=([0-9]+)/);
		if(match) {
			document.getElementById('number').innerHTML = match[1];
			document.title = 'Number ' + match[1];
		}
	} else {
		document.getElementById('number').innerHTML = 1;
		document.title = 'Number 1';
	}
}
