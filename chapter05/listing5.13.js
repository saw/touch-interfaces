var regexp = /(?:\{\{)([a-zA-z][^\s\}]+)(?:\}\})/g

function render(template, data) {
	
	return template.replace(regexp, function(fullMatch, capture) {
		if(data[capture]) {
			return data[capture];
		} else {
			return fullMatch;
		}
	});
}

window.renderTemplate = render;
