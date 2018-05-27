<div class="row">
	<div class="col s12">
		<h3>Bag Drop Check-in List</h3>

		<table class="striped responsive-table">
			<thead>
				<tr>
					<th>Name</th>
					<th>Arrival Time</th>
					<th>Delinquent</th>
					<th>Daycard</th>
					<th>Bag Tag</th>
					<th style="width:20%;">Action</th>
				</tr>
			</thead>

			<tbody>
				<tr>
					<td>Juan Dela Cruz</td>
					<td>2018-05-28 05:00 AM</td>
					<td>Active</td>
					<td>-</td>
					<td>SDAF2414</td>
					<td>
						<a class="waves-effect waves-light btn">Assign Daycard</a>
					</td>
				</tr>
				<tr>
					<td>Juana Dela Cruz</td>
					<td>2018-05-28 04:50 AM</td>
					<td>Active</td>
					<td>OK</td>
					<td>SDAF2414</td>
					<td>
						<a class="waves-effect waves-light btn">Change TeeTime</a>
						<a class="waves-effect waves-light btn">Addons</a>
					</td>
				</tr>
				<tr>
					<td>Juane Dela Cruz</td>
					<td>2018-05-28 04:40 AM</td>
					<td>Delinquent</td>
					<td>OK</td>
					<td>SDAF2414</td>
					<td>
						<a class="waves-effect waves-light btn">Change TeeTime</a>
						<a class="waves-effect waves-light btn">Addons</a>
					</td>
				</tr>
				<?php print_r($arrived_golfers);?>
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