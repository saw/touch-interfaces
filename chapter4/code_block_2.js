function updatePhoto() {
	var heroImg = document.querySelector('.hero-img');

	//shorthand for "random member of this array"
	var thisPhoto = photoList[Math.floor(Math.random() * photoList.length)];
	$('.hero-img').style.backgroundImage 
				= 'url('+ thisPhoto.url_z + ')';
	
	//update the link
	getEl('imglink').href = 
		'http://www.flickr.com/photos/' + 
		thisPhoto.owner +
		'/'+ thisPhoto.id;
	
	//update attribution	
	var attr = getEl('attribution');
	attr.href = 'http://www.flickr.com/photos/' 
		    + thisPhoto.owner;

	attr.innerHTML = thisPhoto.ownername;

}
