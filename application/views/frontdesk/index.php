<div class="row">
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
	

	<!--div class="col s12 m4"></div>
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
	<div class="col s12 m4"></div-->
</div>