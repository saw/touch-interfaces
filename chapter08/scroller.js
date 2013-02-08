(function() {
	
	var template, 
		fetching = false,
		page = 1;
	
	template = Handlebars.compile(document.getElementById('slide').innerHTML);
	
	function isVisible(node) {
		var scrollTop = window.scrollY,
			offTop = node.offsetTop,
			offsetHeight = node.offsetHeight,
			innerHeight = window.innerHeight,
			topViewPort = scrollTop,
			bottomViewPort = scrollTop + innerHeight;
		
		if(offTop + offsetHeight > topViewPort && offTop < bottomViewPort) { 
			return true;
		} else {
			return false;
		}
	}
	
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
	
	function handleDefer() {
		console.time('defer');
		//find all the slides
		var list = document.querySelectorAll('.slide');
		for (var i=0, len = list.length; i < len; i++) {
			thisImg = list[i].querySelector('.img');
			if(thisImg.src) {
				continue;
			}
			//if they are visible, update the src
			if(isVisible(list[i])) {
				var src = thisImg.getAttribute('data-src');
				if(src) {
					thisImg.src = src;
					thisImg.removeAttribute('data-src');
				}
				
			}
		}
		console.timeEnd('defer');
	}
	
	function handleScroll(e) {
		if(window.scrollY + window.innerHeight + 1000 > document.body.offsetHeight) {
			fetchBirds();
		}
		handleDefer();	
	} 
	
	window.addEventListener('scroll', handleScroll);
	
	fetchBirds();
	
}());

