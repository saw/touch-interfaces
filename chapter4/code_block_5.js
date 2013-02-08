var appCache = window.applicationCache;

appCache.addEventListener('updateready', function(e) {
	
	//let's be defensive and double check the status
	if (appCache.status == appCache.UPDATEREADY) {
		
		//swap in the new cache!
		appCache.swapCache();
		
		//Reload the page
		window.location.reload();
		
	}
	
});

appCache.update();
