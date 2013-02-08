var birds = (function() {
	var currentBird,
	myBirdList,
		
	currentBird,
	myBirdList = birdList;
	
	var birdMap = {};
	
	/* Turn the array into a hash table for
       faster lookup */
	function init() {
		for (var i=0, len = myBirdList.length; i < len; i++) {
			birdMap[myBirdList[i].name] = i;
		}
		
		setBird(thisBird);
	}
	
	// Find out about the bird at the index
	function getInfo(index) {
		return myBirdList[index];
	}
	
	function nextBird() {
		return myBirdList[currentBird + 1];
	}
	
	//find out about the bird offset items away
	function birdAtOffset(offset) {
		return myBirdList[currentBird + offset];
	}
	
	//get the current bird
	function getThisBird() {
		return myBirdList[currentBird];
	}
	
	function prevBird() {
		return myBirdList[currentBird - 1];
	}
	
	//set the bird, smart enough to do it from a path,
	//a name, or something inbetween
	function setBird(birdname) {
		
		//if it is a path or underscore version
		if(birdname.indexOf('_') !== -1) {
			//sometimes it might have the /bird/ in front of it
			//but this thing won't care
			matches = birdname.match(/(?:\/bird\/)?(.+)/);
			birdname = matches[1].replace('_', ' ');
		}
		
		currentBird = birdMap[birdname];
	}
	
	
	return {
		init:init,
		nextBird:nextBird,
		prevBird:prevBird,
		thisBird:getThisBird,
		birdAtOffset:birdAtOffset,
		
		advance:function() {
			if(myBirdList[currentBird + 1]) {
				currentBird++;
			}
		},
		
		setBird:setBird
	}
}());

birds.init();