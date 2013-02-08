<?php

$list = file_get_contents('birdlist.txt');

$arr = explode("\n", $list);

$out = array();

foreach($arr as $item) {
	$items = explode(',', $item);
	$thisItem = array(
		'latin' => $items[1],
		'name'  => $items[0],
		'id'	=> uniqid('b-')
	);
	$out[] = $thisItem;
}
$outStr = json_encode($out);
header('Content-type: application/json');
file_put_contents('birds.json', $outStr);
echo $outStr;

