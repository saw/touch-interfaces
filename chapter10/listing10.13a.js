window.addEventListener("orientationchange", function(){
	if(window.orientation !== 0){
		THRESHOLD = 25;
	 } else {
		THRESHOLD = 100;
	}
});