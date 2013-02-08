var startLen;
	
function handleTouch(e) {

	e.preventDefault;
	
	var x,y,len;
		
	if(e.type == 'touchstart') {
		//update the src for higher quality zooming
		hero.setSrc('images/chicken_l.jpg');
			
		if(e.touches.length > 1) {

			startLen = dist(
				[e.touches[0].screenX, e.touches[0].screenY], 
				[e.touches[1].screenX, e.touches[1].screenY]
			);

		}
			
	} else if(e.type == 'touchmove' && e.touches.length == 2) {
			
			x = (e.touches[0].pageX + e.touches[1].pageX)/2;
			y = (e.touches[0].pageY + e.touches[1].pageY)/2;

			hero.setCenter([Math.round(x),Math.round(y)]);

			if(pointB) {
				len = dist(
					[e.touches[0].screenX,e.touches[0].screenY], 
					[e.touches[1].screenX, e.touches[1].screenY]
				);
			}

			hero.setScale(len/startLen);
	
			
	} else if (e.type == 'touchend' || e.type == 'touchcancel'){

		hero.setScale(1, true);
			
	}
}