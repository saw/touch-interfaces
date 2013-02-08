<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="viewport" content="width=device-width">
	<title>bounce</title>
	<style type="text/css">
		#holder {
			height: 1000px	;
		}
		.thumb {
			height: 90px;
			width: 60px;
			display: inline-block;
			padding: 5px;
			text-align: center;
			
		}
		
		.thumb img {
			max-width: 100%;
			max-height: 100%;
			box-shadow: 2px 2px 5px #000;
			border:2px solid #fff;
		}
	</style>
</head>
<body>
<div id="holder">
	<?php
	
	for ($i=1; $i <= 10; $i++) { 
		$dig = str_pad($i,2,'0',STR_PAD_LEFT);
		$name = "thumbs/thumb-$dig.jpg";
		?>
		<div class="thumb">
			<a href="#"><img src="<?=$name?>"></a>
		</div>
		<?php
	}
	
	?>
</div>
</body>
<script type="text/javascript">
	window.onload = function(){
		window.setTimeout(function(){
			scrollTo(0,1);
		},10)
	}
</script>
</html>