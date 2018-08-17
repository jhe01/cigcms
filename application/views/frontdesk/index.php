<!--div class="row">
	<div class="col s12">
		<h3>Check-in List</h3>

		<table class="striped responsive-table">
			<thead>
				<tr>
					<th>Image</th>
					<th>Name</th>
					<th>Arrival Time</th>
					<th>Delinquent</th>
					<th>Tee Time</th>
					<th>Daycard</th>
					<th>Bag Tag</th>
					<th>Action</th>
				</tr>
			</thead>

			<tbody>
				<?php foreach($arrived_golfers as $arrived_golfer){ ?>

					<tr data-golfer-id="<?=$arrived_golfer->golfer_id?>">
						<td><img style="width:30%" src="<?= $arrived_golfer->photo?>" alt="Player Image" class="circle responsive-img center-align"></td>
						<td><?= $arrived_golfer->salutation.' '.$arrived_golfer->firstName.' '.$arrived_golfer->middleName.' '.$arrived_golfer->lastName?></td>
						<td><?= $arrived_golfer->bagdrop_dt?></td>
						<td>-- SOON --</td>
						<?php if(property_exists($arrived_golfer, 'booking')){?>
							<td><?=$arrived_golfer->booking->teedate." ".$arrived_golfer->booking->f9_starttime?></td>
							<td><?= $arrived_golfer->booking->daycard?></td>
						<?php }else{ ?>
							<td>NO BOOKING</td>
							<td>--------</td>
						<?php }?>
						<td><?= $arrived_golfer->bct?></td>
						<td>
						<?php if(property_exists($arrived_golfer, 'booking')){?>
							<?php if($arrived_golfer->booking->daycard != ""){?>
								<a class="waves-effect waves-light btn">Change TeeTime</a>
								<a class="waves-effect waves-light btn">Addons</a>
							<?php }else{?>
								<a class="waves-effect waves-light btn btn-daycard">Assign Daycard</a>
							<?php }?>
						<?php }else{?>
							<a class="waves-effect waves-light btn btn-book-teetime">Book Tee Time</a>
						<?php }?>
						</td>
					</tr>
				<?php } ?>				
			</tbody>
		</table>
	</div>
	

	<div class="col s12 m4"></div>
	<div class="col s12 m4">
		<div class="card-panel">
			<div class="row">
				<form class="col s12">
					<div class="row">
						<div class="input-field col s12">
							<i class="material-icons prefix">theaters</i>
							<input id="icon_prefix" type="text" class="validate">
							<label for="icon_prefix">Unique Bag Tag</label>
						</div>			
					</div>
				</form>
			</div>
		</div>
	</div>
	<div class="col s12 m4"></div>
</div-->
<div style="padding-top:10px;"></div>
<div class="row">
	<div class="col s2"></div>
    <div class="col s8">
      <ul class="tabs tabs-fixed-width">
        <li class="tab"><a href="#test1" class="active">SELECT COURSE</a></li>
        <li class="tab"><a href="#test2">SELECT TEE TIME</a></li>
        <li class="tab"><a href="#test3">TEE TIME FORM</a></li>
		<li class="tab"><a href="#test4">CHECK IN</a></li>
		<li class="tab"><a href="#test5">ISSUE DAYCARD</a></li>
      </ul>
	</div>
	<div class="col s2"></div>
	
</div>
<div class="row">
	<div class="col s2"></div>
	<div class="col s8">
		<div id="test1" data-tab-number='1' class="col s12 tab-content">			
			<div class="valign-wrapper" style="height:400px;background:#ececec;">
				<div style="margin:auto;">
					<a class="waves-effect waves-light btn-large btn-xlarge btn-course" data-course="palmer">PALMER</a>
					<a class="waves-effect waves-light btn-large btn-xlarge btn-course" data-course="nicklaus">NICKLAUS</a>
				</div>
			</div>
		</div>
		<div id="test2" data-tab-number='2' class="col s12 tab-content teal-text text-darken-1" style="">
			<div style="overflow-y:auto;height:600px;background:#ececec;">
				<h4 id="dateToday" class="">Date: </h3>
				<table class='fd-teetime-display'>
					<thead>
						<tr>
							<th>TEE TIME</th>
							<th>PLAYER 1</th>
							<th>PLAYER 2</th>
							<th>PLAYER 3</th>
							<th>PLAYER 4</th>
						</tr>
					</thead>
					<tbody>
								
					</tbody>
				</table>
			</div>
		</div>
		<div id="test3" data-tab-number='3' class="col s12 tab-content" style="background:#ececec;">
			<div class="row">
				<div class="col s12 m2"></div>
				<div class="col s12 m8">
					<div class="card">
						<div class="card-content white-text">
							<div class="row">
								<form class="col s12">
									<div class="row">
										<div class="input-field col s12">
											<input id="name" type="text" class="validate">
											<label for="name">Name</label>
										</div>
									</div>
									<div class="row">
										<div class="input-field col s12">
											<input id="course" type="text" class="validate">
											<label for="course">Course</label>
										</div>
									</div>
									<div class="row">
										<div class="input-field col s6">
											<input id="date" type="text" class="validate">
											<label for="date">Date</label>  
										</div>
										<div class="input-field col s6">
											<input id="tee_time" type="text" class="validate">
											<label for="tee_time">Tee Time</label>
										</div>
									</div>
									<div class="row">
										<div class="input-field col s4">
											<input id="holes" type="text" class="validate">
											<label for="holes">Holes</label>
										</div>
										<div class="input-field col s4">
											<input id="start_hole" type="text" class="validate">
											<label for="start_hole">Starting Hole</label>
										</div>
										<div class="input-field col s4">
											<input id="quanity" type="text" class="validate">
											<label for="quanity">No. of Pax to Reserve</label>
										</div>
									</div>
								</form>
							</div>
						</div>
						<div class="card-action right-align">
							<a class="waves-effect waves-light btn ">SAVE</a>
						</div>
					</div>
				</div>
				<div class="col s12 m2"></div>
			</div>
		</div>
		<div id="test4" data-tab-number='4' class="col s12 tab-content" style="background:#ececec;">
			<div class="row">
				<div class="col s12 m12">
					<div class="card">
						<div class="card-content white-text">
							<div class="row">
								<form>
									<div class="col s8">
										<div class="row">
											<div class="input-field col s12">
												<input id="name" type="text" class="validate">
												<label for="name">Name</label>
											</div>
										</div>
										<div class="row">
											<div class="input-field col s12">
												<input id="tee_time" type="text" class="browser-default validate">
												<label for="tee_time">Tee Time</label>
											</div>
										</div>
										<div class="row">
											<div class="input-field col s6">
												<input id="green_fee_rate" type="text" class="validate">
												<label for="green_fee_rate">Green Fee Rate</label>  
											</div>
											<div class="input-field col s6">
												<input id="golf_cart_rate" type="text" class="validate">
												<label for="golf_cart_rate">Golf Cart Rate</label>
											</div>
										</div>
										<div class="row">
											<div class="input-field col s4">
												<input id="amenity_1" type="text" class="validate">
												<label for="amenity_1">Amenity 1</label>
											</div>
											<div class="input-field col s4">
												<input id="amenity_2" type="text" class="validate">
												<label for="amenity_2">Amenity 2</label>
											</div>
											<div class="input-field col s4">
												<input id="other_charges" type="text" class="validate">
												<label for="other_charges">Other Charges</label>
											</div>
										</div>
										<div class="row">
											<div class="input-field col s4"></div>
											<div class="input-field col s4"></div>
											<div class="input-field col s4">
												<input id="subtotal" type="text" class="validate">
												<label for="subtotal">Sub Total</label>
											</div>											
										</div>
									</div>
									<div class="col s4">
										<div class="row">
											<div class="input-field col s12">
												<input id="player_1" type="text" class="validate">
												<label for="player_1">Player 1</label>
											</div>
										</div>
										<div class="row">
											<div class="input-field col s12">
												<input id="player_2" type="text" class="validate">
												<label for="player_2">Player 2</label>
											</div>
										</div>
										<div class="row">
											<div class="input-field col s12">
												<input id="player_3" type="text" class="validate">
												<label for="player_3">Player 3</label>
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>						
					</div>
				</div>
				<div class="col s12 m4"></div>
			</div>
		</div>
		<div id="test5" data-tab-number='5' class="col s12 tab-content" >
			<div class="valign-wrapper" style="height:400px;background:#ececec;">
				<img width="300" src="<?=app_asset_url('qrcode.png');?>" style="margin:auto;">
			</div>
		</div>	
		
	</div>
	<div class="col s2"></div>
	
</div>

<div class="row">
	<div class="col s2"></div>
	<div class="col s8">
		<a class="waves-effect waves-light btn left" id='prevBtn'><i class="material-icons left">navigate_before</i> PREV</a>
		<a class="waves-effect waves-light btn right" id='nextBtn'><i class="material-icons right">navigate_next</i> Next</a>
	</div>
	<div class="col s2"></div>
</div>


<?=app_asset_js('app/frontdesk.js');?>
<script type='text/javascript'>
	$(document).ready(function(){
		$('.fixed-action-btn').addClass('hide');
		$("#dateToday").append(moment().format("Y-m-D"));

		$('.tabs').tabs();


		$('#nextBtn').on('click', function(e){
			var nextActiveTabContent = $('.tab-content.active').next().attr('id');			
			$('.tabs').tabs('select', nextActiveTabContent);
			e.preventDefault();
		});

		$('#prevBtn').on('click', function(e){
			var nextActiveTabContent = $('.tab-content.active').prev().attr('id');			
			$('.tabs').tabs('select', nextActiveTabContent);
			e.preventDefault();
		});

		$('.btn-course').on('click', function(e){
			$.each($('.btn-course'), function(i, v){
				$(v).removeClass('active');
			});
			$(this).addClass('active');
			e.preventDefault();
		});

		generateTeeTimeDisplayBody();
	});
</script>