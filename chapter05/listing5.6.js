function handleStateChange(count) {
	num.innerHTML = count;
	document.title = 'Number ' + count;
	link.href = '?num=' + (parseInt(count,10) + 1);
}
