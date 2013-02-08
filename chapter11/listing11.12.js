function rebuild(){

	setTimeout(function(){

		var box;
		if(Math.abs(window.orientation) > 0 ) {
			box = [screen.height, screen.width - hchrome];
		} else {
			box = [screen.width, screen.height - vchrome];
		}

		$('#holder').style.height = box[1] + 'px';
		$('#holder').style.width = box[0] + 'px';
		hero.fitToBox(box);
		window.scrollTo(0,1);

	}, 50);
}
	

window.setTimeout(function(){
	window.scrollTo(0,1);
	rebuild();
}, 50);

document.addEventListener('orientationchange', rebuild);