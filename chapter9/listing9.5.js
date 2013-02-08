case 'touchmove':
	goTo = (e.touches[0].pageX - l);
	
	if(goTo < 119 && goTo > 0) {
		lastX = e.touches[0].pageX - l;
		
		//update the position
		theSwitch.style[TRANSFORM] = 'translate3d(' + 
		(e.touches[0].pageX - l) + 'px' + ',0,0)';
	}
	
	if(goTo > 60 && !isOn) {
		console.log('turn on');
		turnOn();
	} else if (goTo < 60 && isOn) {
		console.log('turn off');
		turnOff();
	}
	
	break;