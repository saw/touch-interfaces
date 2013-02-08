function touchendMS(e) {
	window.clearTimeout(reap);
	kill(e.pointerId);
	
	//kill any stray touches that don't get cleaned
	reap = window.setTimeout(reaper, 100);
}

document.addEventListener('MSPointerUp', touchendMS);