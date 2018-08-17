<div class="row" id="fidsTableHeader">
	<div class="input-field col m4 right-align">
		<!--select id="coursesSelect">
			<option value="" disabled selected>Choose Golf Course</option>			
		</select>
        <label>Golf Course</label-->
        <img src="<?=base_url('assets/foresthills_logo.png');?>" style="width:130px;" alt="Foresthills Image">
    </div>	
    <div class="col m4 green-text left-align">
        <h3 class="center-align" id="headerTitle" style="margin-top:60px;"></h3>
    </div>
	<div class="input-field col m4">
        <img src="<?=base_url('assets/double-eagle.png');?>" style="width:130px;" alt="Double Eagle Image">
		<!--p>
			<label>
				<input type="checkbox" id="isPaging"/>
				<span>Paging</span>
			</label>
		</p-->
	</div>
</div>
<div class="row green-text darken-4" id="fidsTableContainer">	
    <div class="col s12">
        <table class='fids-table centered'>
            <thead>
                <tr>
                    <th>TIME</th>
                    <th>COURSE</th>
                    <th>PLAYER 1</th>
                    <th>PLAYER 2</th>
                    <th>PLAYER 3</th>
                    <th>PLAYER 4</th>
                    <th>PLAYER 5</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>
</div>


<script src="<?=base_url('assets/app/fidsv2.js');?>"></script>
<script type="text/javascript">
    $(document).ready(function(){
        fids.init();
    });
    $(function(){        
        
        $('.sidenav').sidenav();
        /*$('#courseTypeSelect').formSelect();
        $('.fixed-action-btn').floatingActionButton();
        fidsApp.getCourse();
        var liWrap = $("<li></li>");
        var liWrapRow = $("<div class='row'></div>");
        var liWrapRowCol = $("<div class='col s12'></div>");
        var announceCheck = $("<label><input type='checkbox' id='isAnnounce'/> <span>Enable Announcement?</span></label>");
        liWrapRowCol.append(announceCheck);
        liWrapRow.append(liWrapRowCol);
        liWrap.append(liWrapRow);
        
        $("#slide-out>li:last-child").before(liWrap);
        
        $('#setSettings').on('click', function(){
            var txtCourseType = $("#courseTypeSelect option:selected").text();
            var txtCourse = $('#coursesSelect option:selected').text();            
            $("#headerTitle").html("");
            if($("#coursesSelect").val() != "" && $("#courseTypeSelect").val() != ""){
                $("#headerTitle").append(txtCourse + " - " + txtCourseType);
                fidsApp.init();
                fidsApp.getTodayFlights($("#coursesSelect").val());
            }else{
                swal('No Course or Course Type Selected!');
            }
            
        });*/
    });
    
</script>