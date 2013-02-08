(function() {
	var isOn = false;
	
	var $ = function(selector) {
		return document.querySelector(selector);
	}
	
	function turnOn() {
		$('#status').innerHTML = 'ON';
		isOn = true;
	}
	
	function turnOff() {
		$('#status').innerHTML = 'OFF';
		isOn = false;
	}
	
	var theSwitch = $('.switch');
	
	theSwitch.addEventListener('click', function(e) {
		if(isOn) {
			theSwitch.style.left = '0px';
			turnOff();
		} else {
			theSwitch.style.left = '119px';
			turnOn();
		}
	});
	
}());