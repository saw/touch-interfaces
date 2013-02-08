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