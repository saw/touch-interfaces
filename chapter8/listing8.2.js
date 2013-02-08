
var uibusy = false;


function handleResponse(response) {
	
	if(uibusy) {
		window.setTimeout(function(){
			handleResponse(response)
		}), 100);
	} else {
		//handle response
	}
	
}