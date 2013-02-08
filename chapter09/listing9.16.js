function slideTemplate(slide){
	var div = document.createElement('div');
	div.className = 'slide';
	div.innerHTML = '<div style="background-image:url('+slide.url+')">'+
	'<div class="caption"><a class="flickr-link" href="'+slide.link+'">By '+slide.owner+' on Flickr</a></div'+
	'</div>';
	return div;
}