function moverMS(e) {
	if(!touches[e.pointerId]) {
		touches[e.pointerId] = new MyTouch(e.pointerId);
	}
	rescue(e.pointerId);
	touches[e.pointerId].setPos(e.clientX, e.clientY);
}