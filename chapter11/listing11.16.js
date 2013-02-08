function setScale(scale, animate) {			
	//this is to allow animated "snap back behvior"
	if(animate) {
		image.style[TRANSITION] = TRANSFORM_CSS + ' 0.2s ease-out';
	} else {
		image.style[TRANSITION] = 'none';
	}

	//center is the previously set center point of the transform
	var tx = center[0] + scale * (0 - center[0]);
	var ty = center[1] + scale *  (top - center[1]);
	
	//turn page coordinate into an object coordinate.
	//this does not need to be done for X because the image is flush with the
	//side of the browser
	ty = ty - top;
	image.style[TRANSFORM] = 
		'matrix(' + scale+ ',0,0,' + scale + ',' + tx + ',' + ty +')';

}