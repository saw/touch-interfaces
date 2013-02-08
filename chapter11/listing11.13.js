//hardcoded values from the large size of the 
//chicken image
var imageHeight = 1267;
var imageWidth = 1900;
	
function $(selector) {
	return document.querySelector(selector);
}
	
var hero = (function(init){
		
	var currentDims = [], top = 0, left = 0, center = [0,0]
	
	image = $('#img');

	setSrc('images/chicken_s.jpg');

		
	//set a new src, waits until the new image is loaded before replacing it
	function setSrc(src) {
		var img = new Image();
		img.onload = function(){
			console.log('loaded ' + src);
			image.style.backgroundImage = 'url('+ src+ ')';
		}
		img.src = src;
	}
		
	function setScale(scale, animate) {
		/* See listing 12.14 */
	}
		
		
	function fitToBox(dimsArr) {		
		var imgw, imgh, scaleFactor;
		var w = dimsArr[0], h = dimsArr[1];
			
		//this is a landscape photo so I can assume w > h
		imgw = w;
			
		scaleFactor = w/imageWidth;
		imgh = Math.round(imageHeight * scaleFactor);
		image.style.width = imgw  +'px';
		image.style.height = imgh + 'px';
		currentDims = [imgw, imgh];
		top = (h/2) - (imgh/2);
		image.style.top = top + 'px';

	}
		
	function setCenter(centerArr) {
		center = centerArr;
	}
		
	return {
			
		setScale: setScale,
		setCenter: setCenter,
		fitToBox: fitToBox,
		setSrc:setSrc	
	}		
}());