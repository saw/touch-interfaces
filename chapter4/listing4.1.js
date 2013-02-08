//a couple of convenience functions
var $ = function(selector) {
	return document.querySelector(selector);
};

var getEl = function(id) {
	return document.getElementById(id);
};


var flickr = new Flickr(apikey);	
var photoList;

flickr.makeRequest(
	'flickr.photos.search', 
	
	{
		text:'Larus californicus',
		extras:'url_z,owner_name', 
		license:5, 
		per_page:50
	}, 
	
	function(data) {
		photoList = data.photos.photo;
		updatePhoto();
	}
);
