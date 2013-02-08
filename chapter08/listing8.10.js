var slideCache;

function updateSlideCache(node) {
	var list = node.querySelectorAll('.slide'),
		len = list.length
		obj;

	slideCache = [];
	
	for (var i=0; i < len; i++) {
		obj = {
			node:list[i],
			id:list[i].getAttribute('data-id'),
			img:list[i].querySelector('.img')
		}
		
		obj.src = obj.img.getAttribute('data-src');
		slideCache.push(obj);
	}
}