<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?><!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Forest Hills Golf & Country Club - GCMS</title>
	
	<?=app_asset_css('materialize/fonts/material-icons.css');?>
	<?=app_asset_css('materialize/css/materialize.min.css');?>
	<?=app_asset_css('css/app.css');?>
	<meta name="viewport" content="width=device-width, initial-scale=1.0"/>

	<script type="text/javascript" src="<?= app_sokcket_url().'socket.io/socket.io.js';?>"></script>
	<?=app_asset_js('jquery/jquery.min.js');?>
	<script type="text/javascript">
		var surl = () => {
			return '<?= app_sokcket_url();?>';
		}

		var appUrl = () => {
			return '<?= app_url();?>';
		}
	</script>
</head>
<body>
	<nav class="teal darken-4">
		<div class="nav-wrapper">
			<a href="#" class="brand-logo">GCMS</a>
			<ul id="nav-mobile" class="right hide-on-med-and-down">
				<li><a href="#">Logout</a></li>
			</ul>
		</div>
	</nav>
	<!--a href="#" data-target="slide-out" class="sidenav-trigger"><i class="material-icons">menu</i></a>


	<ul id="slide-out" class="sidenav">
		<li>
			<div class="user-view">
				<div class="background">
					<img src="#">
				</div>
				<a href="#user"><img class="circle" src="#"></a>
				<a href="#name"><span class="white-text name">John Doe</span></a>
				<a href="#email"><span class="white-text email">jdandturk@gmail.com</span></a>
			</div>
		</li>
		<li><a href="#!"><i class="material-icons">cloud</i>First Link With Icon</a></li>
		<li><a href="#!">Second Link</a></li>
		<li><div class="divider"></div></li>
		<li><a class="subheader">Subheader</a></li>
		<li><a class="waves-effect" href="#!">Third Link With Waves</a></li>
	</ul-->
  
	<?= $contents ?>

	
	<?=app_asset_js('materialize/js/materialize.min.js');?>
	<?=app_asset_js('sweetalert/sweet-alert.all.min.js');?>
	<?=app_asset_js('jquery/hashids.js');?>
	<?=app_asset_js('app/socket_app.js');?>
	<?=app_asset_js('app/app.js');?>
	<script type="text/javascript">
		$(function(){

		});
	</script>
</body>
</html>