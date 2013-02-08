(function() {
	
	var template, 
	fetching = false, 
	page = 1, 
	loaded = {},  
	loadedBirds = {}, 
	slideCache = [], 
	slideMap = {},
	lastScrollY = window.pageYOffset,
	
	//window cache
	scrollY = window.pageYOffset,
	innerHeight,
	topViewPort,
	bottomViewPort,
	visCache = {};
	
	template =	Handlebars.compile(document.getElementById('slide').innerHTML);

	
	function isVisible(id) {
		
		var offTop, offsetHeight, data;
		
		if(slideMap[id]){
			offTop = slideMap[id].offTop;
			offsetHeight = slideMap[id].offsetHeight;
		}else {
			
			node = document.getElementById('s-' + id);
			offsetHeight = parseInt(node.offsetHeight);
			offTop = parseInt(node.offsetTop);
			data = {
				node:node,
				offTop:offTop,
				offsetHeight:offsetHeight
			};
			
			slideMap[id] = data;
		}

		
		if(offTop + offsetHeight > topViewPort && offTop < bottomViewPort) { 
			return true;
		} else {
			return false;
		}
	}
	
	function updateSlideCache(node) {
		var list = node.querySelectorAll('.slide');
		
		var len = list.length;
		slideCache = [];
		var obj;
		
		for (var i=0; i < len; i++) {
			obj = {
				node:list[i],
				id:list[i].getAttribute('data-id'),
				img:list[i].querySelector('.img')
			}
			
			obj.src = obj.img.getAttribute('data-src');
			slideCache.push(obj);
		};
		
	}
	
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
	

	function handleDefer() {
		console.time('defer');
		var list = slideCache;
		var thisImg;
		for (var i=0, len = list.length; i < len; i++) {
			thisImg = list[i].img
			var deferSrc = list[i].src;

			if(isVisible(list[i].id)) {
				
				//create a closure for for simple preload stuff
				var handler = function() {
					var node, src;
					node = thisImg;
					src = deferSrc;
					
					return function () {
						node.src = src;
						node.style.opacity = 1;
						loaded[deferSrc] = true;
					}
				}();
	
				var img = new Image();
				img.onload = handler;
				img.src = list[i].src;
			
			}
		}
		console.timeEnd('defer');
	}

	function handleScroll(e, force) {
		
		//if scroll hasn't changed, do nothing;
		if(!force && lastScrollY == window.scrollY) {
			window.setTimeout(handleScroll, 100);
			return;
		} else {
			lastScrollY = window.scrollY;
		}
		
		scrollY = window.scrollY;
		innerHeight = window.innerHeight;
		topViewPort = scrollY -1000;
		bottomViewPort = scrollY + innerHeight + 1000;

		if(window.scrollY + innerHeight + 2000 > document.body.offsetHeight) {
			fetchBirds();
		}
		
		handleDefer();
		window.setTimeout(handleScroll, 100);
	} 
	
	window.setTimeout(handleScroll, 100);
	
	fetchBirds();
	
}());

