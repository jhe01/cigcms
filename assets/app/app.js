let flightsOnFlight = {};
let flightsOnBooking = {};
let courses = {};
let settings = { firstTeeTime: '5:30 AM', lastTeeTime: '4:00 PM' };
let teetimeInterval;
let container = $('#teetimesTableContainer');
let pagingInterval;
let flightInterval;
let intervalCounter = 1;

var app = {
    init: () => {
        //$('#dateToday').html(moment().format("YYYY-MM-DD"));
        $('body').attr('class', 'tidsBody');
        $('#dateToday').html(moment().format("dddd MMMM DD, YYYY"));    
        app.getClubSettings();
        //app.getCourse();
        //flightInterval = setInterval(app.reloadFlights, 10000);
        var liWrap = $("<li></li>");
        var liWrapRow = $("<div class='row'></div>");
        var liWrapRowCol = $("<div class='col s12'></div>");
        var announceCheck = $("<label><input type='checkbox' id='isHideMaxPlayers'/> <span>Hide row/s with 5 players?</span></label>");
        liWrapRowCol.append(announceCheck);
        liWrapRow.append(liWrapRowCol);
        liWrap.append(liWrapRow);

        $("#slide-out>li:last-child").before(liWrap);
    },
    ajax: (data) => {
        $.ajax({
            url: data.url,
            data: data.data,
            type: 'POST',
            dataType: 'json',
            success: (res) => {
                data.callback(res);
            },
            error: (jqXHR, textStatus, errorThrown) => {
                swal('Error processing your request!');
            }
        });
    },
    generateHashIds: (param) => {
        var hashids = new Hashids('Kin@lik0tN1K1k0', 6, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890');
        return (hashids.encode(param));
    },
    getClubSettings: () => {
        var c_id = '5b024d62116787f';
        var options = {};
        options.url = appUrl() + 'teetime/get_club_settings';
        options.data = { club_id: c_id };        
        options.callback = app.getClubSettingsCallback;
        app.ajax(options);
    },
    getClubSettingsCallback: (res) => {
        settings.firstTeeTime = moment(res.club.opening_time, 'HH:mm').format('hh:mm A');
        settings.lastTeeTime = moment(res.club.closing_time, 'HH:mm').format('hh:mm A');
        teetimeInterval = res.club.teetime_minterval;
        app.generateTeeTimeTable();
    },
    getCourse: () => {
        var options = {};
        options.url = appUrl() + 'teetime/get_courses';

        options.data = { course_id: 3 };
        
        options.callback = app.setCourses;

        app.ajax(options);
    },
    setCourses: (res) => {
        for(var i = 0 ; i < res.courses.length ; i++){
            $("#coursesSelect").append("<option value=" + res.courses[i].facility_id + ">" + res.courses[i].facility + "</option>");
        }
        $('#coursesSelect').formSelect();        
    },
    reloadFlights: () => {
        var c_id = $('#coursesSelect').val();
        var table = $('.teetime-table');
        var rows = table.find('tbody').children();
        var row = rows.not('tr.hide').first();
        //var row = rows.not('tr.hide').filter(function(i,e){ return i < 2 });
        var tNow = moment().format('HH:mm A');
        var xTNow = moment(tNow, 'HH:mm  A').format('x');

        //console.log(row);

        if(moment(row.attr('data-time'), 'x').isBefore(moment(xTNow, 'x'))){
            var cls = row.attr('data-c-time')
            //$('.' + cls).addClass('hide');
        }

        app.getTodayFlights(c_id);
    },
    getTodayFlights: (c_id) => {
        var options = {};
        options.url = appUrl() + 'teetime/get_flights';
        options.data = { course: c_id, course_type: '' };        
        options.callback = app.getTodayFlightsCallback;
        
        app.ajax(options);
    },
    getTodayFlightsCallback: (res) => {
        flightsOnFlight = res.flight_f;
        //courses = res.courses;
        app.renderFlights();
    },
    renderFlights: () => {
        //var flightsB = flightsOnBooking;
        $('td.flight-player-td').html("");
        
        var flightsF = flightsOnFlight;        
        //console.log(flightsF);
        for(var i = 0 ; i < flightsF.length ; i++){
            var flightMateCount = flightsF[i].flightmates.length;
            var xTime = moment(flightsF[i].teetime, 'HH:mm A').format('x');
            var teetimeRow = (app.splitCourse(flightsF[i].course) == 'Front 9'?$('.teetime_' + xTime + '.F-9'):$('.teetime_' + xTime + '.B-9'));
            if(flightsF[i].course == 'Front 9'){
                for(var x = 0 ; x < flightMateCount ; x++){           
                    teetimeRow.find('.flight-player-' + (x+1) + '-teetime_' + xTime).html(flightsF[i].flightmates[x].golfer);
                }
            }else{                
                for(var x = 0 ; x < flightMateCount ; x++){           
                    teetimeRow.find('.flight-player-' + (x+1) + '-teetime_' + xTime).html(flightsF[i].flightmates[x].golfer);
                }
            }
            if(flightMateCount == 5){
                if($('#isHideMaxPlayers').is(':checked')){
                    teetimeRow.addClass('hide');
                }
            }
        }
    },
    generateTeeTimeTable: () => {
        $('.teetime-table').parent().remove();

        var createTable = () => {
            var table = $("<table class='teetime-table centered'></table>");
            return table;
        };

        var createHeadings = () => {
            var tHead = $('<thead></thead>');
            var tRow = $('<tr></tr>');
            tRow.append('<th>TIME</th>');
            tRow.append('<th>COURSE</th>');
            tRow.append('<th>PLAYER 1</th>');
            tRow.append('<th>PLAYER 2</th>');
            tRow.append('<th>PLAYER 3</th>');
            tRow.append('<th>PLAYER 4</th>');
            tRow.append('<th>PLAYER 5</th>');
            tHead.append(tRow);

            return tHead;
        };

        var createBody = (data) => {
            var startTime = moment(data[0], 'HH:mm A').format('x');
            var endTime = moment(data[data.length - 1], 'HH:mm A').format('x');
            var tBody = $('<tbody></tbody>');
            do{
                //var xTime = moment(startTime, 'x').format('HH:mm A');
                for(var i = 1 ; i <= 2 ; i++){                    
                    var row = $("<tr class='teetime_" + startTime + " " + (i==1?"F-9":"B-9") + "' data-c-time='teetime_" + startTime + "' data-time='" + startTime + "'></tr>");
                    row.append("<td class='flight-time'>" + moment(startTime, 'x').format('HH:mm') + "</td>");
                    row.append("<td class='flight-course'>" + (i==1?"Front 9":"Back 9") + "</td>");
                    row.append("<td class='flight-player-td flight-player-1-teetime_" + startTime + "'></td>");
                    row.append("<td class='flight-player-td flight-player-2-teetime_" + startTime + "'></td>");
                    row.append("<td class='flight-player-td flight-player-3-teetime_" + startTime + "'></td>");
                    row.append("<td class='flight-player-td flight-player-4-teetime_" + startTime + "'></td>");
                    row.append("<td class='flight-player-td flight-player-5-teetime_" + startTime + "'></td>");

                    tBody.append(row);
                }

                startTime = moment(startTime, 'x').add(teetimeInterval, 'm');
            }while(moment(endTime, 'x') >= moment(startTime, 'x'));

            return tBody;
        };

        var divideTable = () => {
            var counter = 0;
            var startTime = moment(settings.firstTeeTime, 'HH:mm A').format('x');
            var endTime = moment(settings.lastTeeTime, 'HH:mm A').format('x');

            var teetimes = [];

            do{                    
                teetimes.push(moment(startTime, 'x').format('HH:mm A'));
                startTime = moment(startTime, 'x').add(10, 'm');
                counter++;
            }while(moment(endTime, 'x') >= moment(startTime, 'x'));
            
            var divContainer = $('<div class="col s12 m12"></div>');
            divContainer.append(createTable());
            divContainer.find("table").append(createHeadings());
            divContainer.find("table").append(createBody(teetimes));

            container.append(divContainer);
        };

        divideTable();

    },
    pagingTeeTimeTable: () => {
        var table = $('.teetime-table');
        var tableRows = table.find('tbody').children();
        var numRows = table.find('tbody').children().length;

        for(var i = 0 ; i < numRows ; i++){
            if(i < 16){
                $(tableRows[i]).addClass('paging-batch-1')}
            
            if(i > 15 && i < 32){
                $(tableRows[i]).addClass('paging-batch-2')}

            if(i > 31 && i < 48){
                $(tableRows[i]).addClass('paging-batch-3')}

            if(i > 47 && i < 64){
                $(tableRows[i]).addClass('paging-batch-4')}
        }

        app.triggerStartPaging();
    },
    stopPagingTeeTimeTable: () => {
        var table = $('.teetime-table');
        var tableRows = table.find('tbody').children();
        var numRows = table.find('tbody').children().length;

        tableRows.removeClass('paging-batch-1 paging-batch-2 paging-batch-3 paging-batch-4 hide');
        app.triggerStopPaging();
    },
    triggerStartPaging: () => {
        var table = $('.teetime-table');
        var tableRows = table.find('tbody').children();
        var numRows = table.find('tbody').children().length;
        
        var hidePagingInactiveRow = () => {
            tableRows.removeClass('hide');

            tableRows.not(".paging-batch-" + intervalCounter).addClass('hide');            

            if(intervalCounter == 4){
                intervalCounter = 1;
            }else{
                intervalCounter = intervalCounter + 1; 
            }            
        };
        hidePagingInactiveRow();
        pagingInterval = setInterval(hidePagingInactiveRow, 5000);
    },
    triggerStopPaging: () => {
        clearInterval(pagingInterval);
    },
    convertCourseType: (code) => { 
        var type = '';
        if(code == "F-9"){
            type = 'Front 9';
        }else{
            type = 'Back 9';
        }
        return type;
    },
    splitCourse: (crse) => {
        var r = crse.split('-');

        return r[1];
    },
};

app.init();