<div class="row" id="teetimeTableHeader" style="vertical-align:bottom;">
	<div class="input-field col m2">
		<!--select id="coursesSelect">
			<option value="" disabled selected>Choose Golf Course</option>			
		</select>
		<label>Golf Course</label-->
		<img src="<?=base_url('assets/foresthills_logo.png');?>" style="width:130px;" alt="Foresthills Image">
	</div>
	<div class="col m8">
		<h3 class="center-align green-text darken-2" id="headerTitle" style="margin-top:60px;"><span id="dateToday"></span> | <span id="coursePos"></span></h3>
	</div>
	<div class="input-field col m2 right-align">
		<!--p>
			<label>
				<input type="checkbox" id="isPaging"/>
				<span>Paging</span>
			</label>
		</p-->
		<img src="<?=base_url('assets/double-eagle.png');?>" style="width:130px;" alt="Double Eagle Image">
	</div>
</div>
<h3 class="center-align green-text darken-2"></h3>
<div class="row green-text darken-4" id="teetimesTableContainer">	
</div>

<script src="<?=base_url('assets/app/app.js');?>"></script>
<script type="text/javascript">
	$(function(){
		$('.fixed-action-btn').floatingActionButton();
		$('.sidenav').sidenav();

		$('#courseTypeSelect').formSelect();

		$('#setSettings').on('click', function(e){
			app.generateTeeTimeTable();	
			$('#coursePos').html('');
			clearInterval(flightInterval);
			if($('#coursesSelect').val() != null){
				//app.getTodayFlights($('#coursesSelect').val());
				flightInterval = setInterval(app.reloadFlights, 5000);
				var course = $('#coursesSelect').find('option:selected').text();
				$('#coursePos').append(course);
			}else{
				swal('Please Select a Course or Course Type!');
			}
			e.preventDefault();
		});
	});
</script>