function fadeIn() {
	var h = document.querySelector(".picture");
	var opacity = parseFloat(h.style.opacity);
	if(opacity < 1) {
		opacity = opacity + 0.1;
		h.style.opacity = opacity;
		window.setTimeout(fadeIn, 33);
	}
}
