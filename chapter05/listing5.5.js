var useHash = false;
var hashExp = /#([0-9]+)/;
if(!history.pushState) {
	useHash = true;
}
useHash = true;