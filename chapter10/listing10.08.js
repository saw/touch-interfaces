function getBirdData(path, callback) {
	path = path.replace('/bird/', '/fragments/');
	var data = modelCache.get(path);
	
	if(data) {
		window.setTimeout(function(){
			callback && callback(data);
		}, 1);
		return;
	}
	
	makeRequest(path, function(xhr) {
		modelCache.set(path, xhr.responseText);
		callback && callback(xhr.responseText);
	})
}