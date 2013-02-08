var hidden = true;
var h = document.querySelector(".picture");

function togglePicture(){
	if(hidden) {
		h.className = "picture";
		hidden = false;
	} else {
		h.className = "picture hidden";
		hidden = true;
	}
}

$('.button').on('tap', function(e) {
	e.preventDefault();
	togglePicture();
	e.target.className = "active button";
}).on('tapend', function(e) {
	e.target.className = "button";
});