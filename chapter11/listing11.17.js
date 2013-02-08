(function(){
	
    var TRANSITION = 'transition',
        TRANSFORM = 'transform',
        TRANSITION_END = 'transitionend',
        TRANSFORM_CSS = 'transform',
		TRANSFORM_ORIGIN = 'transformorigin',
        TRANSITION_CSS = 'transition';

    if (typeof document.body.style.webkitTransform !== "undefined") {
        TRANSITION = 'webkitTransition';
        TRANSFORM = 'webkitTransform';
        TRANSITION_END = 'webkitTransitionEnd';
		TRANSFORM_ORIGIN = 'webkitTransformOrigin';
        TRANSFORM_CSS = '-webkit-transform';
        TRANSITION_CSS = '-webkit-transition'
    }
	
	var vchrome, hchrome;
	
	if(window.navigator.userAgent.match(/iphone/)) {
		vchrome = 65;
		hchrome = 50;
	} else {
		vchrome = 65;
		hchrome = 50;
	}
	
	
	
	var marker = document.createElement('div');
	$('#img').appendChild(marker);
	marker.style.position = 'absolute';
	marker.style.top = 0;
	marker.style.left = 0;
	marker.style.height = '2px';
	marker.style.width = '2px';
	
	marker.style.background = 'red';

	
	var imageHeight = 1267;
	var imageWidth = 1900;
	
	function $(selector) {
		return document.querySelector(selector);
	}
	
	var hero = (function(init){
		
		var image = $('#img');
		var currentDims = [];
		
		var top = 0, left = 0;

		setSrc('images/chicken_s.jpg');
		
		var center = [0,0];
		
		function setSrc(src) {
			var img = new Image();
			img.onload = function(){
				image.style.backgroundImage = 'url('+ src+ ')';
			}
			img.src = src;
		}
		
		
		//translateX = (scalePointX * (newWidth - oldWidth)) / newWidth
		function setScale(scale, animate) {
			
			if(animate) {
				image.style.webkitTransition = '-webkit-transform 0.2s ease-out';
			} else {
				image.style.webkitTransition = 'none';
			}
			
			

			var tx = center[0] + scale * (0 - center[0]);
			var ty = center[1] + scale *  (top - center[1]);
			ty = ty - top;

			image.style.webkitTransform = 'matrix3d('+scale+',0,0,0,0,'+scale+',0,0,0,0,1,0,'+tx+','+ty+',0,1)';
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
			
			// center[1] = center[1] - top;
			// image.style['-webkit-transform-origin'] = centerArr[0] + 'px ' + centerArr[1] + 'px';
		}
		
		return {
			
			setScale: setScale,
			setCenter: setCenter,
			fitToBox: fitToBox,
			setSrc:setSrc
			
		}
		
	}());
	
	function rebuild(){

		setTimeout(function(){

			var box;
			// if(Math.abs(window.orientation) > 0 ) {
			// 	box = [screen.height, screen.width - hchrome];
			// } else {
			// 	box = [screen.width, screen.height - vchrome];
			// }
			box = [window.innerWidth, window.innerHeight];

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
	
	var startA, startB, startLen;
	
	function dist(pointA, pointB) {
		return Math.sqrt(
			Math.pow((pointA[0] - pointB[0]),2) + 
			Math.pow((pointA[1] - pointB[1]),2)
		);
	}
	
	var lastScale;
	function handleTouch(e) {

		e.preventDefault;
		
		if(e.type == 'touchstart') {
			hero.setSrc('images/chicken_l.jpg');
			
			if(e.touches.length > 1) {
				
				var pointA = e.touches[0];
				var pointB = e.touches[1];
				
				if(pointB) {
					startLen = dist([pointA.screenX,pointA.screenY], [pointB.screenX, pointB.screenY]);
				}
				
				// console.log(st);
				console.log(startLen);

			}
		}
		
		if(e.type == 'touchmove' && e.touches.length == 2) {
			
				var x = (e.touches[0].pageX + e.touches[1].pageX)/2;
				var y = (e.touches[0].pageY + e.touches[1].pageY)/2;

				hero.setCenter([Math.round(x),Math.round(y)]);

				var pointA = e.touches[0];
				var pointB = e.touches[1];
				
				if(pointB) {
					var len = dist([pointA.screenX,pointA.screenY], [pointB.screenX, pointB.screenY]);
				}

				hero.setScale(len/startLen);
				lastScale = len/startLen;
			
			
		} else if (e.type == 'touchend' || e.type == 'touchcancel'){

			if(lastScale < 1.5) {
					hero.setScale(1, true); //with animation
				} else {
					hero.setScale(2, true);
				}
			
			
		}
	}

	document.addEventListener('touchstart', handleTouch);
	document.addEventListener('touchmove', handleTouch);
	document.addEventListener('touchend', handleTouch);
	document.addEventListener('touchcancel', handleTouch);
	
	document.ontouchmove = function(e){
		e.preventDefault();
	}
	
}());
