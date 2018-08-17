let flights = {};
let fidsInterval;
let settings = { firstTeeTime: '5:30 AM', lastTeeTime: '11:50 PM' };
let announcementOrder = {};
let announced = [];
let courses = [];
let pagingInterval;
let flightInterval;
let intervalCounter = 1;
let voices;
let announcementInterval;
let mssg = '';
let annCounter = 0;

var fidsApp = {
    init: () => {
        fidsApp.getClubSettings();
        flightInterval = setInterval(fidsApp.reloadFlights, 5000);
        
        speechSynthesis.onvoiceschanged = function () {
            if (voices)
                return;
            voices = speechSynthesis.getVoices();
        };

        if(fidsApp.checkIfAnnounce()){
            if(fidsApp.checkIfShowAll()){
                announcementInterval = setInterval(fidsApp.makeAnnouncementIntervalWithCourse, 1500);
            }else{
                announcementInterval = setInterval(fidsApp.makeAnnouncementInterval, 1500);
            }
        }
        
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
    getClubSettings: () => {
        var c_id = '5b024d62116787f';
        var options = {};
        options.url = appUrl() + 'teetime/get_club_settings';
        options.data = { club_id: c_id };        
        options.callback = fidsApp.getClubSettingsCallback;

        fidsApp.ajax(options);
    },
    getClubSettingsCallback: (res) => {
        settings.firstTeeTime = moment(res.club.opening_time, 'HH:mm').format('hh:mm A');
        settings.lastTeeTime = moment(res.club.closing_time, 'HH:mm').format('hh:mm A');
        fidsInterval = res.club.teetime_minterval;
        announcementOrder.first = res.club.fids_FirstToAnnounce;
        announcementOrder.second = res.club.fids_SecondToAnnounce;
        announcementOrder.third = res.club.fids_ThirdToAnnounce;
        announcementOrder.fourth = res.club.fids_FourthToAnnounce;
        
        if(fidsApp.checkIfShowAll()){
            fidsApp.generateFidsRowsWithCourse();
        }else{
            fidsApp.generateFidsRows();
            console.log("TEST");
        }
    },
    getTodayFlights: (c_id) => {
        var options = {};
        options.url = appUrl() + 'teetime/get_flights';
        options.data = { course_id: c_id, course_type: $("#courseTypeSelect").val(), };        
        options.callback = fidsApp.getTodayFlightsCallback;
        
        fidsApp.ajax(options);
    },
    getTodayFlightsCallback: (res) => {
        flights = res.flight_f;
        //console.log(res);
        
        if(fidsApp.checkIfShowAll()){
            fidsApp.renderFidsFlightsWithCourse(flights);
        }else{
            fidsApp.renderFidsFlights(flights);
        }
    },
    getCourse: () => {
        var options = {};
        options.url = appUrl() + 'teetime/get_courses';
        options.data = {};        
        options.callback = fidsApp.setCourses;

        fidsApp.ajax(options);
    },
    reloadFlights: () => {
        var c_id = $('#coursesSelect').val();
        if(c_id != ""){
            fidsApp.getTodayFlights(c_id);
        }
    },
    setCourses: (res) => {
        for(var i = 0 ; i < res.courses.length ; i++){
            courses.push(res.courses[i].facility.split(' ').join('-'));
            $("#coursesSelect").append("<option value=" + res.courses[i].facility_id + ">" + res.courses[i].facility + "</option>");
        }
        //console.log(courses);
        fidsApp.getClubSettings();
        $('#coursesSelect').formSelect();
    },
    generateFidsRows: () => {
        var table = $('.fids-table');  
        $("#courseCol").hide();
        var createBody = (data) => {
            var startTime = moment(data[0], 'HH:mm A').format('x');
            var endTime = moment(data[data.length - 1], 'HH:mm A').format('x');
            var tBody = $('<tbody></tbody>');
            var currTime = moment().subtract(20, 'm').format('hh:mm A');
            var currTimeX = moment(currTime, 'hh:mm A').format('x');

            do{
                var isHidden = (moment(startTime, 'x').isAfter(moment(currTimeX, 'x')));
                var xTime = moment(startTime, 'x').format('HH:mm A');
                
                var row = $("<tr class='" + (!isHidden?"hide":"") + " teetime_" + startTime + "' data-time=" + moment(startTime, 'x').format('HH:mm:ss') + "></tr>");
                row.append("<td class='flight-time'>" + moment(startTime, 'x').format('hh:mm A') + "</td>");

                row.append("<td class='flight-player-td td-player-1 flight-player-1-teetime_" + startTime + "'></td>");
                row.append("<td class='flight-player-td td-player-2 flight-player-2-teetime_" + startTime + "'></td>");
                row.append("<td class='flight-player-td td-player-3 flight-player-3-teetime_" + startTime + "'></td>");
                row.append("<td class='flight-player-td td-player-4 flight-player-4-teetime_" + startTime + "'></td>");
                row.append("<td class='flight-player-td td-player-5 flight-player-5-teetime_" + startTime + "'></td>");
            
                tBody.append(row);

                startTime = moment(startTime, 'x').add(fidsInterval, 'm');
            }while(moment(endTime, 'x') >= moment(startTime, 'x'));

            return tBody;
        };

        var createTableBody = () => {
            var counter = 0;
            var startTime = moment(settings.firstTeeTime, 'HH:mm A').format('x');
            var endTime = moment(settings.lastTeeTime, 'HH:mm A').format('x');
            var teetimes = [];

            do{                    
                teetimes.push(moment(startTime, 'x').format('HH:mm A'));
                startTime = moment(startTime, 'x').add(fidsInterval, 'm');
                counter++;
            }while(moment(endTime, 'x') >= moment(startTime, 'x'));
            
            table.append(createBody(teetimes));
        };
        
        createTableBody();
    },
    generateFidsRowsWithCourse: () => {
        var table = $('.fids-table');  
        
        var createBody = (data) => {
            var startTime = moment(data[0], 'HH:mm A').format('x');
            var endTime = moment(data[data.length - 1], 'HH:mm A').format('x');
            var tBody = $('<tbody></tbody>');
            var currTime = moment().subtract(20, 'm').format('hh:mm A');
            var currTimeX = moment(currTime, 'hh:mm A').format('x');

            do{
                var isHidden = (moment(startTime, 'x').isAfter(moment(currTimeX, 'x')));
                var xTime = moment(startTime, 'x').format('HH:mm A');
                
                for(var i = 1; i <= 4; i++){
                    var courseType = '';
                    var courseTypeCode = '';
                    if(i == 1){courseType = courses[0] + "-Front-9";courseTypeCode='N-F9';}
                        
                    if(i == 2){courseType = courses[0] + "-Back-9";courseTypeCode='N-B9';}
                        
                    if(i == 3){courseType = courses[1] + "-Front-9";courseTypeCode='P-F9';}
                        
                    if(i == 4){courseType = courses[1] + "-Back-9";courseTypeCode='P-B9';}                        

                    var row = $("<tr class='" + (!isHidden?"hide":"") + " teetime_" + startTime + " " + courseType + "' data-time=" + moment(startTime, 'x').format('HH:mm:ss') + "></tr>");
                    row.append("<td class='flight-time'>" + moment(startTime, 'x').format('hh:mm A') + "</td>");
                    row.append("<td class='flight-course-td'>" + courseTypeCode + "</td>");
                    row.append("<td class='flight-player-td td-player-1 flight-player-1-teetime_" + startTime + "'></td>");
                    row.append("<td class='flight-player-td td-player-2 flight-player-2-teetime_" + startTime + "'></td>");
                    row.append("<td class='flight-player-td td-player-3 flight-player-3-teetime_" + startTime + "'></td>");
                    row.append("<td class='flight-player-td td-player-4 flight-player-4-teetime_" + startTime + "'></td>");
                    row.append("<td class='flight-player-td td-player-5 flight-player-5-teetime_" + startTime + "'></td>");
                
                    tBody.append(row);
                }

                startTime = moment(startTime, 'x').add(fidsInterval, 'm');
            }while(moment(endTime, 'x') >= moment(startTime, 'x'));
            
            return tBody;
        };

        var createTableBody = () => {
            var counter = 0;
            var startTime = moment(settings.firstTeeTime, 'HH:mm A').format('x');
            var endTime = moment(settings.lastTeeTime, 'HH:mm A').format('x');
            var teetimes = [];

            do{                    
                teetimes.push(moment(startTime, 'x').format('HH:mm A'));
                startTime = moment(startTime, 'x').add(fidsInterval, 'm');
                counter++;
            }while(moment(endTime, 'x') >= moment(startTime, 'x'));
            
            table.append(createBody(teetimes));
        };
        
        createTableBody();
    },
    renderFidsFlights: (data) => {
        $('td.flight-player-td').html("");

        for(var i = 0 ; i < data.length ; i++){
            var flightMateCount = data[i].flightmates.length;
            var xTime = moment(data[i].teetime, 'HH:mm A').format('x')
            var hTeetimeRow = $('.teetime_' + xTime);
            //var teeTimeRow = $('.teetime_' + xTime + '.' + data[i].course.split(' ').join('-') + "-" + data[i].course_type.split(' ').join('-'));
            var teeTimeRow = $('.teetime_' + xTime);
            //$('.teetime_' + xTime + '.' + data[i].course.split(' ').join('-') + "-" + data[i].course_type.split(' ').join('-'));
            //console.log($('.teetime_' + xTime + ' .' + data[i].course.split(' ').join('-') + "-" + data[i].course_type.split(' ').join('-')));
            //console.log(teeTimeRow);
            for(var x = 0 ; x < flightMateCount ; x++){    
                //console.log(teeTimeRow.find('td.flight-player-' + (x+1) + '-teetime_' + xTime).length);            
                teeTimeRow.find('td.flight-player-' + (x+1) + '-teetime_' + xTime).append(data[i].flightmates[x].golfer);
                //console.log(data[i].flightmates[x].golfer);
            }
           
            if(flightMateCount == 5){
                hTeetimeRow.addClass('hide');
            }
        }
        //console.log("test");
        //fidsApp.makeAnnouncementInterval();
        
    },
    renderFidsFlightsWithCourse: (data) => {
        $('td.flight-player-td').html("");

        for(var i = 0 ; i < data.length ; i++){
            var flightMateCount = data[i].flightmates.length;
            var xTime = moment(data[i].teetime, 'HH:mm A').format('x')
            var hTeetimeRow = $('.teetime_' + xTime);
            var teeTimeRow = $('.teetime_' + xTime + '.' + data[i].course.split(' ').join('-') + "-" + data[i].course_type.split(' ').join('-'));
            //var teeTimeRow = $('.teetime_' + xTime);
            //$('.teetime_' + xTime + '.' + data[i].course.split(' ').join('-') + "-" + data[i].course_type.split(' ').join('-'));
            //console.log($('.teetime_' + xTime + ' .' + data[i].course.split(' ').join('-') + "-" + data[i].course_type.split(' ').join('-')));
            //console.log(teeTimeRow);
            for(var x = 0 ; x < flightMateCount ; x++){    
                //console.log(teeTimeRow.find('td.flight-player-' + (x+1) + '-teetime_' + xTime).length);            
                teeTimeRow.find('td.flight-player-' + (x+1) + '-teetime_' + xTime).append(data[i].flightmates[x].golfer);
                //console.log(data[i].flightmates[x].golfer);
            }
           
            if(flightMateCount == 5){
                hTeetimeRow.addClass('hide');
            }
        }
        //console.log("test");
        //fidsApp.makeAnnouncementInterval();
        
    },
    /* pagingFidsTable: () => {
        var table = $('.fids-table');
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

        fidsApp.triggerStartPaging();
    },
    stopPagingFidsTable: () => {
        var table = $('.fids-table');
        var tableRows = table.find('tbody').children();
        var numRows = table.find('tbody').children().length;

        tableRows.removeClass('paging-batch-1 paging-batch-2 paging-batch-3 paging-batch-4 hide');
        fidsApp.triggerStopPaging();
    },
    triggerStartPaging: () => {
        var table = $('.fids-table');
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

        pagingInterval = setInterval(hidePagingInactiveRow, 5000);
    },
    triggerStopPaging: () => {
        clearInterval(pagingInterval);
    }, */
    
    generateTextToSpeechAnnouncement: (player1, player2, player3, player4, player5, teetime, course) => {
        var message = "Announcement! Calling to ";
        if(player1)
            message += player1 + ", ";

        if(player2)
            message += player2 + ", ";

        if(player3)
            message += player3 + ", ";

        if(player4)
            message += player4 + ", ";

        if(player5)
            message += player5 + ", ";

        if(teetime)
            message += "You will Tee Off at " + teetime +  " " + course + " course in 20 minutes. Thank You!"

        return message;
    },
    aiAnnouncer: () => {
        
        var vo = 'Microsoft Zira Desktop - English (United States)';        

        var speech = function() {
            var aiload = mssg;
            var msg = new SpeechSynthesisUtterance(aiload);
            msg.volume = 1; // 0 to 1
            msg.rate = .9; // 0.1 to 10
            msg.pitch = 1; //0 to 2
            msg.text = aiload;

            var rows = $('.fids-table').find('tbody').children();

            var re;

            if(announced.length == 1){
                re = 8;
            }else if(announced.length == 2){
                re = 9;
            }else if(announced.length == 3){
                re = 10;
            }else if(announced.length == 4){
                re = 11;
            }

            var thrdRow = rows.not('.hide').filter(function(i, e){
                return i == re;
            });
            
            var voice = voices.filter(function (v) {
                    return v.name == vo;
                })[0];
                
            if (!voice) return;
            msg.lang = voice.lang;
            msg.voice = voice;

            msg.onstart = function (e) {
                clearInterval(announcementInterval);
                thrdRow.addClass('tr-attention-to');
            };
            
            msg.onend = function (e) {
                thrdRow.removeClass('tr-attention-to');
                announcementInterval = setInterval(fidsApp.makeAnnouncementInterval, 1500);

                if(announced.length == 4){
                    announced = [];
                }
                console.log('Finished in ' + event.elapsedTime + ' seconds.');
            };
            
            //speechSynthesis.cancel();
            speechSynthesis.speak(msg);
        }
        speech();
    },
    checkFidsFirstRow: () => {
        var table = $('.fids-table');        
        var tableRows = table.find('tbody').children();

        var re;

        if(announced.length == 1){
            re = 8;
        }else if(announced.length == 2){
            re = 9;
        }else if(announced.length == 3){
            re = 10;
        }else if(announced.length == 4){
            re = 11;
        }

        var firstRow = tableRows.not('.hide').filter(function(i, e){
            return i == re;
        });
        //console.log(firstRow.find("td.td-player-1").text());
        if($(firstRow).find("td.td-player-1").text() != ""){
            var course = fidsApp.convertCourseCode(firstRow.find("td.flight-course-td").text());
            var player1 = firstRow.find("td.td-player-1").text();
            var player2 = firstRow.find("td.td-player-2").text();
            var player3 = firstRow.find("td.td-player-3").text();
            var player4 = firstRow.find("td.td-player-4").text();
            var player5 = firstRow.find("td.td-player-5").text();
            var teetime = firstRow.find("td.flight-time").text();
            //var course = $("#coursesSelect :selected").text();
            mssg =  fidsApp.generateTextToSpeechAnnouncement(player1, player2, player3, player4, player5, teetime, course);   
            //console.log(mssg);     
            //console.log("test2");
        }else{
            mssg = "";
        }
        fidsApp.aiAnnouncer();
        //console.log(announced);
    },
    makeAnnouncementInterval: () => {
        var currTime = moment().subtract(20, 'm').format('hh:mm A');
        var currTimeX = moment(currTime, 'hh:mm A').format('x');
        var rows = $('.fids-table').find('tbody').children();
        
        var row = rows.not('tr.hide').first();
        var isAnn = false;

        var hideFirstRow = (r) => {
            var tNow = moment(currTimeX, 'x').add(26, 'm').format('HH:mm:ss');
            if(!moment(r.data('time'), 'HH:mm').isAfter(moment(currTimeX, 'x')) ){
                r.addClass('hide');
            }

            var thrdRow = rows.not('.hide').filter(function(i, e){
                return i == 2;
            });
            
            console.log(moment(thrdRow.attr('data-time'), 'HH:mm:ss').format('HH:mm') + " | " + tNow);
            //console.log(thrdRow);
            if(moment(thrdRow.attr('data-time'), 'HH:mm:ss').isSame(moment(tNow, 'HH:mm:ss')) ){
                annCounter=annCounter+1;
                if(annCounter < 1){
                    isAnn = true;
                }else{
                    isAnn = false;
                }
                
            }else{
                isAnn = false;
                annCounter=0;
            }
        };
        
        hideFirstRow(row);

        if(isAnn){
            console.log(announced);
            fidsApp.checkFidsFirstRow();
        }
    },
    makeAnnouncementIntervalWithCourse: () => {
        var currTime = moment().subtract(20, 'm').format('hh:mm A');
        var currTimeX = moment(currTime, 'hh:mm A').format('x');
        var rows = $('.fids-table').find('tbody').children();
        
        var row = rows.not('tr.hide').first();
        var isAnn = false;

        var hideFirstRow = (r) => {
            var tNow = moment(currTimeX, 'x').add(26, 'm').format('HH:mm:ss');
            if(!moment(r.data('time'), 'HH:mm').isAfter(moment(currTimeX, 'x')) ){
                r.addClass('hide');
            }

            var re;

            if(announced.indexOf('first') == -1){
                re = 8;
            }else if(announced.includes('first') && announced.indexOf('second') == -1){
                re = 9;
            }else if(announced.includes('first') && announced.includes('second') && announced.indexOf('third') == -1){
                re = 10;
            }else if(announced.includes('first') && announced.includes('second') && announced.includes('third') && announced.indexOf('fourth') == -1){
                re = 11;
            }
            
            var thrdRow = rows.not('.hide').filter(function(i, e){
                return i == re;
            });
            
            console.log(moment(thrdRow.attr('data-time'), 'HH:mm:ss').format('HH:mm') + " | " + tNow);
            //console.log(thrdRow);
            if(moment(thrdRow.attr('data-time'), 'HH:mm:ss').isSame(moment(tNow, 'HH:mm:ss')) ){
                annCounter=annCounter+1;
                if(annCounter <= 4){
                    if(!announced.includes('first')){
                        announced.push('first');
                    }
                    else if(announced.includes('first') && announced.indexOf('second') == -1){
                        announced.push('second');
                    }
                    else if(announced.includes('first') && announced.includes('second') && announced.indexOf('third') == -1){
                        announced.push('third');
                    }
                    else if(announced.includes('first') && announced.includes('second') && announced.includes('third') && announced.indexOf('fourth') == -1){
                        announced.push('fourth');
                    }
                    isAnn = true;
                }else{
                    isAnn = false;
                }
                
            }else{
                isAnn = false;
                annCounter=0;
            }
        };
        
        hideFirstRow(row);

        if(isAnn){
            console.log(announced);
            fidsApp.checkFidsFirstRow();
        }
    },
    checkAnnouncementOrder: () => {
        var re;
        if(announced.indexOf('first') == -1){
            re = 8;
        }else if(announced.includes('first') && announced.indexOf('second') == -1){
            re = 9;
        }else if(announced.includes('first') && announced.includes('second') && announced.indexOf('third') == -1){
            re = 10;
        }else if(announced.includes('first') && announced.includes('second') && announced.includes('third') && announced.indexOf('fourth') == -1){
            re = 11;
        }

        return re;
    },
    checkCourseCode: (course) => {
        var code = '';
        if(course == 'The Jack Nicklaus Front 9'){
            code = 'N-F9';
        }
        if(course == 'The Jack Nicklaus Back 9'){
            code = 'N-B9';
        }
        if(course == 'The Palmer Front 9'){
            code = 'P-F9';
        }
        if(course == 'The Palmer Back 9'){
            code = 'P-B9';
        }

        return code;
    },
    convertCourseCode: (code) => {
        var course = '';
        if(code == 'N-F9'){
            course = 'The Jack Nicklaus Front 9';
        }
        if(code == 'N-B9'){
            course = 'The Jack Nicklaus Back 9';
        }
        if(code == 'P-F9'){
            course = 'The Palmer Front 9';
        }
        if(code == 'P-B9'){
            course = 'The Palmer Back 9';
        }

        return course;
    },
    checkIfShowAll: () => {
        var r = false;
        if($("#showAll").is(':checked')){
            r = true;
        }

        return r;
    },
    checkIfAnnounce: () => {
        var r = false;
        if($("#isAnnounce").is(':checked')){
            r = true;
        }

        return r;
    },
};

//fidsApp.init();