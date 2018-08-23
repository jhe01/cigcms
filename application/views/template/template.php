<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?><!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Forest Hills Golf & Country Club - GCMS</title>
	<link rel="stylesheet" href="<?=base_url('assets/materialize/fonts/material-icons.css');?>">
	<link rel="stylesheet" href="<?=base_url('assets/materialize/css/materialize.min.css');?>">
	
	<link rel="stylesheet" href="<?=base_url('assets/css/app.css');?>">
	<!--meta name="viewport" content="width=device-width, initial-scale=1.0"/-->

	<script src="<?=base_url('assets/jquery/jquery.min.js');?>"></script>
	<script src="<?=base_url('assets/jquery/moment.js');?>"></script>
	
	
	<script type="text/javascript">
		var surl = () => {
			return '<?= app_sokcket_url();?>';
		}

		var appUrl = () => {
			return '<?= base_url();?>';
		}
	</script>
	<script src="<?=base_url('assets/materialize/js/materialize.min.js');?>"></script>
	<script src="<?=base_url('assets/sweetalert/sweet-alert.all.min.js');?>"></script>
	<script src="<?=base_url('assets/jquery/hashids.js');?>"></script>
	<script src="<?=base_url('assets/jquery/playSound.js');?>"></script>

	
	
	
	
</head>
<body>
	<!--nav class="teal darken-4">
		<div class="nav-wrapper">
			<a href="#" class="brand-logo">GCMS</a>
			<ul id="nav-mobile" class="right hide-on-med-and-down">
				<li><a href="#">Logout</a></li>
			</ul>
		</div>
	</nav>
	<a href="#" data-target="slide-out" class="sidenav-trigger"><i class="material-icons">menu</i></a>


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
	<ul id="slide-out" class="sidenav">
		<li>
			<div class="user-view">
				<div class="background">
					<img src="<?=base_url('assets/foresthills_logo.png');?>">				
				</div>			
			</div>
		</li>
		<li>
			<div class="row">
				<div class="input-field col m12">
					<select id="coursesSelect">
						<option value="" disabled selected>Choose Golf Course</option>
						<option value="p">Palmer</option>
						<option value="n">Nicklaus</option>
					</select>					
				</div>
			</div>			
		</li>
		<!--li>
			<div class="row">
				<div class="input-field col m12">
					<select id="courseTypeSelect">
						<option value="" disabled selected>Choose Course Type</option>
						<option value="F-9">Front 9</option>
						<option value="B-9">Back 9</option>
					</select>					
				</div>
			</div>			
		</li>
		<li>
			<div class="row">
				<div class="col s12">
					<label><input type='checkbox' id='showAll'/> <span>Show All Courses?</span></label>
				</div>
			</div>
		</li-->
		<li>
			<div class="row">
				<div class="col m12">
					<a class="waves-effect waves-light btn" id="setSettings" style="width:100%;">SET</a>
					<a class="waves-effect waves-light btn" id="btnA" style="width:100%;">SET</a>		
				</div>
			</div>			
		</li>
		<!--li>
			<div class="row">
				<div class="input-field col m12">
					<select id="firstToAnnounce" class='announcementOrder'>
						<option value="" disabled selected>Choose Golf Course</option>	
						<option value="p-front-9">Nicklaus - Front 9</option>
						<option value="p-front-9">Nicklaus - Back 9</option>
						<option value="p-front-9">Palmer - Front 9</option>
						<option value="p-front-9">Palmer - Back 9</option>		
					</select>					
				</div>
			</div>			
		</li>
		<li>
			<div class="row">
				<div class="input-field col m12">
					<select id="secondToAnnounce" class='announcementOrder'>
						<option value="" disabled selected>Choose Option</option>	
						<option value="p-front-9">Nicklaus - Front 9</option>
						<option value="p-front-9">Nicklaus - Back 9</option>
						<option value="p-front-9">Palmer - Front 9</option>
						<option value="p-front-9">Palmer - Back 9</option>			
					</select>					
				</div>
			</div>			
		</li>
		<li>
			<div class="row">
				<div class="input-field col m12">
					<select id="thirdToAnnounce" class='announcementOrder'>
						<option value="" disabled selected>Choose Option</option>	
						<option value="p-front-9">Nicklaus - Front 9</option>
						<option value="p-front-9">Nicklaus - Back 9</option>
						<option value="p-front-9">Palmer - Front 9</option>
						<option value="p-front-9">Palmer - Back 9</option>			
					</select>					
				</div>
			</div>			
		</li>
		<li>
			<div class="row">
				<div class="input-field col m12">
					<select id="fourthToAnnounce" class='announcementOrder'>
						<option value="" disabled selected>Choose Golf Course</option>		
						<option value="p-front-9">Nicklaus - Front 9</option>
						<option value="p-front-9">Nicklaus - Back 9</option>
						<option value="p-front-9">Palmer - Front 9</option>
						<option value="p-front-9">Palmer - Back 9</option>		
					</select>					
				</div>
			</div>			
		</li-->
	</ul>
  <!--a href="#" data-target="slide-out" class="sidenav-trigger"><i class="material-icons">menu</i></a-->
	<div class="fixed-action-btn">
		<a class="btn-floating teal waves-effect waves-light sidenav-trigger" data-target="slide-out">
			<i class="large material-icons">menu</i>
		</a>
	</div>
	<script>
		$(function(e){
			$("#btnA").on('click', function(){
				if (document.documentElement.requestFullScreen) {
					document.documentElement.requestFullScreen();
				} else if (document.documentElement.mozRequestFullScreen) {
					document.documentElement.mozRequestFullScreen();
				} else if (document.documentElement.webkitRequestFullScreen) {
					document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
				}
			});
			$('#coursesSelect').formSelect();
			
		});
	</script>
	<?= $contents ?>
</body>
</html>