<?php

$files = array(
	"ajax.js",
	"handlebars.js",
	"router.js",
	"model.js",
	"view.js",
	"bird_data.js",
	"app.js",
);

$outStr = '';

foreach($files as $file) {
	$outStr .= file_get_contents($file);
}

header('Content-type: text/plain');
echo $outStr;

