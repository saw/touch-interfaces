/**
  * This is very basic flickr api interface
  * it uses jsonp to fetch data, does not 
  * support calls requiring authentication
  * it also does not support errors at all
  */
(function(){
	
	var ENDPOINT = "http://api.flickr.com/services/rest/";
	
	//this makes sure the callback functions for the api
	//are always unique
	var cbCount = 0;
	
	//this is a Crockford-style superconstructor
	function Flickr(key, sec) {
		
		var apiKey = key,
		    secret = sec;
		
		return {
		
			makeRequest: function (method, data, callback) {
				
				var d, requestArray, scriptTag, callbackName, key;
				
				//if there is no data object, create it
				d = data || {};
			
				//add the parameters needed in every call.
				d.method = method;		
				d.api_key = apiKey;
				d.format = 'json';
				
				//create a unique callback name
				callbackName = 'flcb' + cbCount++;
				d.jsoncallback = callbackName;
				
				scriptTag = document.createElement('script');
				
				
				//this is the callback the jsonp will call,
				//I'll use this to remove the script tag as well
				window[callbackName] = function(data) {
					callback(data);
					document.body.removeChild(scriptTag);
				};
				
				//This is step one in building the query params
				requestArray = [];
				
				for (key in data) {
					requestArray.push(key + '=' + data[key]);
				}
				
				var url = ENDPOINT + '?' + requestArray.join('&');
				scriptTag.src = url;
				
				//attaching the script tag to the body actually causes
				//the request
				document.body.appendChild(scriptTag);
			}
			
		};
		
	}
	
	//
	window.Flickr = Flickr;
	
})();
(function(){
	
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
			
			flickr = new Flickr('b04fabc8322a5f5f45f5b172c9c176fd');
			
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
(function() {
	
	
	function makeRequest(url, callback, scope) {
		
		var xhr = new XMLHttpRequest();
		var cb = callback, sc = scope;
		xhr.open('get', url, true);
		
		xhr.onreadystatechange = function() {
			if (this.readyState == 4 ) {
				cb.apply(sc, [this]);
			}
		}
		xhr.send();
	}
	
	
	window.ajax = {
		makeRequest:makeRequest
	}
	
})();
(function() {

	var router = {};
	
	var routes = [];
	
	
	//this will push the new route onto the 
	//list of routes.
	function addRoute(route, callback, scope){
		
		//create a consistant signature that 
		//we can rely on later
		var routeObj = {
			route: route,
			callback: callback,
			scope: scope
		};
		
		routes.push(routeObj);
	}
	
	//looks for matching routes, then calls the callbk
	function handleRoute(path, pop) {
		
		var len = routes.length, scope;
		
		for (var i=0; i < len; i++) {
			if(path.match(routes[i].route)) {
				
				//if the caller provided a scope,
				//we use it, otherwise we will execute
				//the callback in the window scope
				if(routes[i].scope) {
					scope = routes[i].scope;
				} else {
					scope = window;
				}
				
				// if this is from a popstate,
				// we shouldn't push state again
				if(!pop) {
					history.pushState({}, null, path);
				}
				
				routes[i].callback.apply(scope, [path]);
			}
		}
	}
	
	window.addEventListener('popstate', function(e) {

		handleRoute(window.location.href, true);
	})
	
	window.router = {
		handleRoute:handleRoute,
		addRoute: addRoute
	};
	
})();


//build up data for routes, so we don't 
//have to keep looking up latin names
var latinNameMap = {};
var links = document.querySelectorAll('.nav-link');
var href;

var pageCache = {};

for (var i=0, len = links.length; i < len; i++) {
	
	href = links[i].href.match(/([a-z_]+\.html)/)[1];
	latinNameMap[href] = links[i].getAttribute('data-latin');
}

function handlePage(path) {
	var href = path.match(/([a-z_]+\.html)/)[1];
	birdData.changePhoto(latinNameMap[href]);
	if(pageCache[href]) {
		document.querySelector('.content').innerHTML = pageCache[href];
		console.timeEnd('click');
	} else {
		ajax.makeRequest(href.replace('.html', '_frag.html'), function(xhr) {
			document.querySelector('.content').innerHTML = xhr.responseText;
			pageCache[href] = xhr.responseText;
			console.timeEnd('click');
		}, this);
	}	
}

router.addRoute(/[a-z_]+\.html/, handlePage);

document.addEventListener('click', function(e) {
	
	var className = e.target.className;
	
	if(className == 'nav-link') {
		console.time('click');
		e.preventDefault();
		router.handleRoute(e.target.href);
	}

}, true);