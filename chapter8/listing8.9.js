function handleDefer() {
	console.time('defer');
	var i, list, thisImg, deferSrc, img, handler,
	
	//the slide cache is populated by the function that
	//loads the data so that the defer code doesn't need
	//to keep querying the dom.
	list = slideCache, 
	len = listLength;
	
	
	for (i=0; i < len; i++) {
		thisImg = list[i].img
		var deferSrc = list[i].src;
		if(isVisible(list[i].id)) {
			
			//create a closure for for simple preload stuff
			handler = function() {
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