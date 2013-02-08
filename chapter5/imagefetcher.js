(function(){
	
	var key = 'b04fabc8322a5f5f45f5b172c9c176fd';
	var flickr = new Flickr(key);		
	
	//a couple of convenience functions
	var $ = function(selector) {
		return document.querySelector(selector);
	}
	
	var getEl = function(id) {
		return document.getElementById(id);
	}
	

	function changePhoto(latinName) {
		//show the user we are loading something....
		var photoList;
		
		var heroImgElement = $('.hero-img');
		heroImgElement.style.background = '#ccc';
		heroImgElement.innerHTML = '<p>Loading...</p>';

		var name = latinName;

		/* with cache layer */

		birdData.fetchPhotos(name, function(photos) {
			photoList = photos;
			updatePhoto(photoList);
		});
		
	}
	
	
	function updatePhoto(photoList) {
		var heroImgElement, thisPhoto, img, thisPhoto, attr;
		
		heroImgElement = $('.hero-img');
		
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
		
	}
	
	window.birdData.updatePhoto = updatePhoto;
	window.birdData.changePhoto = changePhoto;
	
})();