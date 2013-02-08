function kill(id) {
	touches[id] && touches[id].destroy();
}
	
function reaper() {
	var id;
	for (id in touches) {
		kill(id);
	}
}
