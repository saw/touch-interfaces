//this function handles the route callbacks
function handlePage(path) {
	var href = normalizeLink(path);
	var thispage;
	
	if(!pages[href]) {
		
		//hide all the other pages right away
		hidePages();
		
		ajax.makeRequest(href.replace('.html', '.json'), function(xhr) {
			var data = JSON.parse(xhr.responseText);
			
			//create an elment to hold the page
			var contentHolder = document.createElement('div');
			
			//give it an id
			contentHolder.id = 'birds-' + idInc++;
			
			//and render the template into it
			contentHolder.innerHTML = renderTemplate(tmpl, data);
			document.querySelector('.main').appendChild(contentHolder);
			
			pages[href] = contentHolder;
			
		}, this);
	} else {
		hidePages();
		pages[href].style.display = 'block';
	}
}
