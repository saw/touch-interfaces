var el = document.getElementById('grow');

//store only the initial value of offset width
var w = el.offsetWidth;

//continue using the original value without returning to the DOM
function render() {
	w = w + 5;
	el.style.width = w + 'px';
}

function loop(){
	if(w < 800) {
		webkitRequestAnimationFrame(loop);
		render();
	}
}

loop();