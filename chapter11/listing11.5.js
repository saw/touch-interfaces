document.addEventListener('MSPointerStart', function(e){
	touches[e.pointerId] = new MyTouch(e.pointerId);
	touches[e.pointerId].setPos(e.clientX, e.clientY);
});