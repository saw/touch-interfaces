var previousOrientation = 0;
function checkOrientation(){
	//don't bother changing this if the orientation is the same.
	if(window.orientation !== previousOrientation){
		previousOrientation = window.orientation;
		if(window.orientaiton !== 0) {
			THRESHOLD = 25;
		} else {
			THRESHOLD = 100;
		}
	 }
};

window.addEventListener("resize", checkOrientation);
window.addEventListener("orientationchange", checkOrientation);

//as a final fallback, poll.
setInterval(checkOrientation, 2000);