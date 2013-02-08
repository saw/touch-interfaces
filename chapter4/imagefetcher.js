(function(){
	var key = 'b04fabc8322a5f5f45f5b172c9c176fd';
	var flickr = new Flickr(key);	
	var photoList;
	
	
	//a couple of convenience functions
	var $ = function(selector) {
		return document.querySelector(selector);
	}
	
	var getEl = function(id) {
		return document.getElementById(id);
	}
	
	//show the user we are loading something....
	var heroImgElement = $('.hero-img');
	heroImgElement.style.background = '#ccc';
	heroImgElement.innerHTML = '<p>Loading...</p>';
	
	
	/* with cache layer */
	birdData.fetchPhotos('Larus californicus', function(photos) {
		photoList = photos;
		updatePhoto();
	});
	
	/* no cache layer */
	
	// flickr.makeRequest(
	// 	'flickr.photos.search', 
	// 	
	// 	{text:'Larus californicus', extras:'url_z,owner_name', license:5, per_page:50}, 
	// 	
	// 	function(data) {
	// 		photoList = data.photos.photo;
	// 		updatePhoto();
	// 	}
	// );
	
	
	
	function updatePhoto() {
		var heroImg, thisPhoto, img, thisPhoto, attr;

		
		thisPhoto = photoList[Math.floor(Math.random() * photoList.length)];

		heroImgElement.innerHTML = '';
		heroImgElement.style.backgroundImage =
			'url('+ thisPhoto.url_z + ')';
		
		
		
		
		getEl('imglink').href = 
			'http://www.flickr.com/photos/' + 
			thisPhoto.owner +
			'/'+ thisPhoto.id;
			
		attr = getEl('attribution');
		attr.href = 'http://www.flickr.com/photos/' + thisPhoto.owner;

		attr.innerHTML = thisPhoto.ownername;
		console.log('image updated');
		
	}
	
})();