var routes = [];
	
//this will push the new route onto the 
//list of routes.
function addRoute(route, callback, scope){
	
	//create a consistent signature that 
	//we can rely on later
	var routeObj = {
		route: route,
		callback: callback,
		scope: scope
	};
	
	routes.push(routeObj);
}

//looks for matching routes, then calls the callback
function handleRoute(path, noHistory) {
	
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
			if(!noHistory) {
				//push the path onto the history stack
				history.pushState({}, null, path);
			}
			
			routes[i].callback.apply(scope, [path]);
			return true;
		}
	}
	//no route found, move on
	return false;
}
