case 'touchcancel':
//fall through to touchend, logic is the same
case 'touchend':
	if(lastX > 60) {
		endPoint = 119;
	} else {
		endPoint = 0;
	}
	
	theSwitch.style[TRANSITION] = TRANSFORM_CSS + ' .1s ease-out';
	theSwitch.style[TRANSFORM] = 'translate3d('+endPoint+'px,0,0)';
	break;