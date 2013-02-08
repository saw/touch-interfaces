function $(selector) {
	return document.querySelector(selector);
}

window.saw = (function($){
	
	var TRANSITION     = 'transition',
		TRANSFORM      = 'transform',
		TRANSITION_END = 'transitionend',
		TRANSFORM_CSS  = 'transform',
		TRANSITION_CSS = 'transition';
		
	if(typeof document.body.style.webkitTransform !== undefined) {
		TRANSITION = 'webkitTransition';
		TRANSFORM = 'webkitTransform';
		TRANSITION_END = 'webkitTransitionEnd';
		TRANSFORM_CSS = '-webkit-transform';
		TRANSITION_CSS = '-webkit-transition'
	}
	
	var wrapperTemplate = function(){
		var div = document.createElement('div');
		div.innerHTML = '<div class="controls">'+
		'<a class="prev" href="#">prev</a> | '+
		'<a class="next" href="#">next</a></div>'+
		'</div>';
		div.className = "slidewrap";
		return div;
	}
	
	function slideTemplate(slide){
		var div = document.createElement('div');
		div.className = 'slide';
		div.innerHTML = '<div style="background-image:url('+slide.url+')">'+
		'<div class="caption"><a class="flickr-link" href="'+slide.link+'">By '+slide.owner+' on Flickr</a></div'+
		'</div>';
		return div;
	}
	
	function Lightbox (selector) {
		
		var containerNode = $(selector), 
			wrapper, 
			chromeBuilt, 
			
			currentSlide = 0,
			slideData =[],
			
			boundingBox = [0,0],
			
			slideMap = {};
		
		
		function buildChrome(){
			wrapper = wrapperTemplate();
			document.body.appendChild(wrapper);
			boundingBox[0] = wrapper.getAttribute('offsetWidth');
			chromeBuilt = true;
		}

		function handleClicks(e){
			var targ = e.target;
			
			//prevent default is only called when conditions match
			//so that clicks to external resoures (like Flickr) work.
			if(targ.className == 'next') {
				e.preventDefault();
				goTo(currentSlide + 1);
			} else if(targ.className == 'prev'){
				e.preventDefault();
				goTo(currentSlide - 1);
			} else if (targ.className != 'flickr-link') {
				e.preventDefault();
				hide();
			}
		}

		function attachEvents(){
			wrapper.addEventListener('click', handleClicks);
		}
		
		
		function init(){
			var slides = containerNode.querySelectorAll('li');
			var thisSlide, thisImg;
			
			for (var i=0; i < slides.length; i++) {
				thisSlide = {}, thisImg = slides[i].querySelector('img');
				thisSlide.url = thisImg.getAttribute('src').replace(/_s|_q/, '_z');
				thisSlide.height = thisImg.getAttribute('data-full-height');
				thisSlide.width = thisImg.getAttribute('data-full-width');
				thisSlide.owner = thisImg.getAttribute('data-owner');
				thisSlide.link = slides[i].querySelector('a').href;
				slideMap[thisSlide.link] = slideData.push(thisSlide) - 1;
				thisSlide.id = slideMap[thisSlide.link];
			}
		}
		
		function buildSlide (slideNum) {
			
			var thisSlide, s, img, scaleFactor = 1, w, h;
			
			if(!slideData[slideNum] || slideData[slideNum].node){
				return false;
			}
			
			thisSlide = slideData[slideNum];
			s = slideTemplate(thisSlide);
			
			img = s.querySelector('div');
			
			//image is too big! scale it!
			if(thisSlide.width > boundingBox[0] || thisSlide.height > boundingBox[1]){
				
				if(thisSlide.width > thisSlide.height) {
					scaleFactor = boundingBox[0]/thisSlide.width;
				} else {
					scaleFactor = boundingBox[1]/thisSlide.height;
				}
				
				w = Math.round(thisSlide.width * scaleFactor);
				h = Math.round(thisSlide.height * scaleFactor);
				img.style.height = h + 'px';
				img.style.width = w + 'px';
				
			}else{
				img.style.height = thisSlide.height + 'px';
				img.style.width = thisSlide.width + 'px';
			}

			thisSlide.node = s;
			wrapper.appendChild(s);
			setPosition(s, boundingBox[0]);
			return s;
		}
		
		var i =0;
		
		var startPos, lastPos;
		function handleTouchEvents(e){
			
			var direction = 0;
			
			if(e.type == 'touchstart'){
				startPos = e.touches[0].clientX;
				lastPos = startPos;
				direction = 0;
				if(slideData[currentSlide] && slideData[currentSlide].node){
					cleanTransitions(slideData[currentSlide].node);
				}
				
				if(slideData[currentSlide + 1] && slideData[currentSlide + 1].node){
					cleanTransitions(slideData[currentSlide + 1].node);
				}
				
				if(slideData[currentSlide - 1] && slideData[currentSlide -1].node){
					cleanTransitions(slideData[currentSlide -1].node);
				}
				
			}else if(e.type == 'touchmove'){
				e.preventDefault();
				if(lastPos > startPos){
					direction = -1;
				}else{
					direction = 1;
				}
				if(slideData[currentSlide]){
					setPosition(slideData[currentSlide].node, e.touches[0].clientX - startPos);
					if(direction !== 0 && slideData[currentSlide + direction]){
						if(direction < 0){
							setPosition(slideData[currentSlide + direction].node, (e.touches[0].clientX - startPos) - boundingBox[0]);
						}else if(direction > 0){

							setPosition(slideData[currentSlide + direction].node, (e.touches[0].clientX - startPos) + boundingBox[0]);	
						}
						
					} 
				}
				
				lastPos = e.touches[0].clientX;
			}else if(e.type == 'touchend'){
				if(lastPos - startPos > 50){
					goTo(currentSlide-1);
				} else if(lastPos - startPos < -50){
				
					goTo(currentSlide+1);
				}else{
				
					//snap back!
					addTransitions(slideData[currentSlide].node);
					setPosition(slideData[currentSlide].node, 0);
					
					if(slideData[currentSlide + 1] && slideData[currentSlide + 1].node){
						addTransitions(slideData[currentSlide + 1]);
						setPosition(slideData[currentSlide + 1].node, boundingBox[0]);
					}
					
					if(slideData[currentSlide - 1] && slideData[currentSlide - 1].node){
						addTransitions(slideData[currentSlide - 1]);
						setPosition(slideData[currentSlide - 1].node, 0 - boundingBox[0]);
					}
					
				}


			}
			
		}
		
		function attachTouchEvents() {

			var bd = document.querySelector('html');
			bd.addEventListener('touchmove', handleTouchEvents);
			bd.addEventListener('touchstart', handleTouchEvents);
			bd.addEventListener('touchend', handleTouchEvents);
			
		}

		function setPosition(node, left) {
			node.style[TRANSFORM] =  "translate3d("+left+"px, 0, 0)";
		}
		
		function addTransitions(node){
			node.style[TRANSITION] = TRANSFORM_CSS + ' .25s ease-in-out';
			
			node.addEventListener(TRANSITION_END, function(e){
				window.setTimeout(function(){
					e.target.style[TRANSITION] = 'none;'
				}, 0)
			})
		}
		
		function cleanTransitions(node){
			node.style[TRANSITION] = 'none';
		}
		
		function goTo(slideNum){
			
			var thisSlide;
			
			//failure, return to last slide
			if(!slideData[slideNum]){
				goTo(currentSlide);
			}
			
			if(Math.abs(currentSlide - slideNum) !== 1 && 
			slideData[currentSlide] && slideData[currentSlide].node){
				//current slide not adjacent to new slide!
				setPosition(slideData[currentSlide].node, 
				(slideNum < currentSlide)  ? boundingBox[0] : 0 -  boundingBox)
			}
			
			thisSlide = slideData[slideNum];
			
			//build the adjacent slide
			buildSlide(slideNum);
			buildSlide(slideNum + 1);
			buildSlide(slideNum - 1);
			
			//animate the slides entering and leavign
			if(thisSlide.node){
				addTransitions(thisSlide.node);
				setPosition(thisSlide.node, 0);
			}
			
			if(slideData[slideNum - 1] && slideData[slideNum-1].node){
				addTransitions(slideData[slideNum - 1 ].node);
				setPosition( slideData[slideNum - 1 ].node , (0 - boundingBox[0]) );
			}
			
			if(slideData[slideNum + 1] && slideData[slideNum + 1].node){
				addTransitions(slideData[slideNum + 1 ].node);
				setPosition(slideData[slideNum + 1 ].node, boundingBox[0] );
			}
			
			currentSlide = slideNum;
		}
		
		function show(startSlide){
			if(!chromeBuilt){
				buildChrome();
				attachEvents();
			}
			wrapper.style.display = 'block';
			boundingBox = [ window.innerWidth, window.innerHeight ];

			goTo(slideMap[startSlide]);
			attachTouchEvents();
		}
		
		function hide(){
			wrapper.style.display = 'none';
		}
		
		init();
		
		return {
			
			show: show,
			hide: hide
		};
		
	}
	
	return {
		Lightbox:Lightbox
	};
}($));