function handleEvent(event) {
	switch (event.pointerType) {
		
		case event.MSPOINTER_TYPE_TOUCH:
			//The pointer was a finger.
			break;
		case event.MSPOINTER_TYPE_PEN:
			// The pointer was a stylus
			break;
		case event.MSPOINTER_TYPE_MOUSE:
			// The pointer was a mouse
			break;
	}
}

element.addEventListener("MSPointerDown", handleEvent, false);