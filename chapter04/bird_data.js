/**
  * This is very basic flickr api interface
  * it uses jsonp to fetch data, does not 
  * support calls requiring authentication
  * it also does not support errors at all
  */

(function(){

	//replace with your own flickr API key: 
	// http://www.flickr.com/services/apps/create/apply
	var API_KEY = 'api-key';
	
	window.birdData = {};
	
	var memoryCache = {};
	

	
	var CACHE_TTL    = 86400000, //one day in seconds
	    CACHE_PREFIX = 'ti';
	
	//insert data into the cache
	function setCache(mykey, data) {
		
		var stamp, obj;
		
		stamp = Date.now();
		
		obj = {
			date: stamp,
			data: data
		};
		
		localStorage.setItem(CACHE_PREFIX + mykey, JSON.stringify(obj));
		memoryCache[mykey] = obj;
	}
	
	//fetch cached date if availble, 
	//returns false if not (stale date is treated as unavailable)
	function getCached(mykey) {
		
		var key, obj;
		
		//prefixed keys to prevent
		//collisions in localStorage, not likely, but 
		//a good practice
		key = CACHE_PREFIX + mykey;
		
		if(memoryCache[key]) {
			
			if(memoryCache[key].date - Date.now() > CACHE_TTL) {
				localStorage.removeItem(key);
				delete(memoryCache[key]);
				return false;
			}
			
			return memoryCache[key].data;
		}
		
		obj = localStorage.getItem(key);
		
		if(obj) {
			obj = JSON.parse(obj);
			
			if (Date.now() - parseInt(obj.date, 10) > CACHE_TTL) {
				//cache is expired! let us purge that item 
				localStorage.removeItem(key);
				delete(memoryCache[key]);
				return false;
			}
			memoryCache[key] = obj;
			return obj.data;
		}
	}
	
	// function to fetch CC flickr photos,
	// given a search query. Results are cached for 
	// one day
	function fetchPhotos(query, callback) {
		var flickr, cached;
		
		cached = getCached(query);
		
		if(cached) {
			callback(cached.photos.photo);
		} else {
			
			flickr = new Flickr(API_KEY);
			
			flickr.makeRequest(
				'flickr.photos.search', 

				{text:query, extras:'url_z,owner_name', license:5, per_page:50}, 

				function(data) {
					callback(data.photos.photo);
					
					//set the cache after the callback, so that
					//it happens after any UI updates that may be needed
					setCache(query, data);
				}
			);
		}
		
	}
	
	window.birdData.fetchPhotos = fetchPhotos;
		
})();