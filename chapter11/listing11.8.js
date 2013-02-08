var reap;

function touchend(e) {
	window.clearTimeout(reap);
	for (var i=0; i < e.changedTouches.length; i++) {
		kill(e.changedTouches[i].identifier);
	}

	//kill any stray touches that don't get cleaned
	reap = window.setTimeout(reaper, 100);
}

document.addEventListener('touchend', touchend);
document.addEventListener('touchcancel', touchend);