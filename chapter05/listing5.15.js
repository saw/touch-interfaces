var pages = {};
var idInc = 0;
var tmpl = document.getElementById('tmpl').innerHTML;

function hidePages() {
	var page;
	
	for (page in pages) {
		pages[page].style.display = 'none';
	}
}
