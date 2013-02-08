function handleScroll(e) {
	if(window.scrollY + window.innerHeight + 1000 > document.body.offsetHeight) {
		fetchBirds();
	}
	handleDefer();	
} 
window.addEventListener('scroll', handleScroll);