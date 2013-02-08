link.addEventListener('click', function(e) {
	e.preventDefault();
	var myNum = parseInt(num.innerHTML, 10);
	num.innerHTML = ++myNum;
	history.pushState({count:myNum}, null, '?num=' + myNum);
	document.title = ‘Number ‘ + myNum;
});