function dist(pointA, pointB) {
	return Math.sqrt(
		Math.pow((pointA[0] - pointB[0]),2) + 
		Math.pow((pointA[1] - pointB[1]),2)
	);
}
