var wrapperTemplate = function(){
	var div = document.createElement('div');
	div.innerHTML = '<div class="controls">'+
	'<a class="prev" href="#">prev</a> | '+
	'<a class="next" href="#">next</a></div>'+
	'</div>';
	div.className = "slidewrap";
	return div;
}

function buildChrome(){
	wrapper = wrapperTemplate();
	document.body.appendChild(wrapper);
	boundingBox[0] = wrapper.getAttribute('offsetWidth');
	chromeBuilt = true;
}