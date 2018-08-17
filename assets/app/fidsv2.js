let fids = {
    flights: {},
    settings: { 
        firstTeeTime: '5:30 AM', 
        lastTeeTime: '11:50 PM', 
        teeTimeInterval: 10, },
        //courses: {'Palmer': 'PALMER', 'Nicklaus': 'Nicklaus',},
    fidsTable: $('.fids-table'),
    flightInterval: undefined,
    announcementInterval: undefined,
    mssg: '',
    rowMonitoringInterval: undefined,
    voices: undefined,
    announced: [],
    announcementCounter: 0,
    stopRowMonitoring: false,
    isRepeated: false,
    init: () => {
        $('body').attr('class', 'fidsBody');
        fids.getClubSettings();
        
        //speechSynthesis.onvoiceschanged = function () {
        //    if (fids.voices != undefined){
        //        return;
        //    }
        //    fids.voices = speechSynthesis.getVoices();
        //    console.log(fids.voices);
        //};
        
        var liWrap = $("<li></li>");
        var liWrapRow = $("<div class='row'></div>");
        var liWrapRowCol = $("<div class='col s12'></div>");
        var announceCheck = $("<label><input type='checkbox' id='isAnnounce'/> <span>First to Announce?</span></label>");
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
    getClubSettings: () => {
        var c_id = '5b024d62116787f';
        var options = {};
        options.url = appUrl() + 'teetime/get_club_settings';
        options.data = { club_id: c_id };        
        options.callback = fids.getClubSettingsCallback;

        fids.ajax(options);
    },
    getClubSettingsCallback: (res) => {
        fids.settings.firstTeeTime = moment(res.club.opening_time, 'HH:mm').format('hh:mm A');
        fids.settings.lastTeeTime = moment(res.club.closing_time, 'HH:mm').format('hh:mm A');
        fids.settings.teeTimeInterval = res.club.teetime_minterval;
        /*fids.settings.courses = res.courses;
        
        if(fids.settings.courses.length > 0){
            fids.setCourse();            
        }*/
        fids.setUpFidsTable();
    },
    setCourse: () => {
        $.each(fids.settings.courses, function(i, v){
            $("#coursesSelect").append("<option value=" + v.facility_id + ">" + v.facility + "</option>");
        });
        
        $("#coursesSelect").formSelect();
    },
    setUpFidsTable: () => {
        var tBody = fids.fidsTable.find("tbody");
        var startTime = moment(fids.settings.firstTeeTime, 'HH:mm A').subtract(30, 'm').format('x');
        var endTime = moment(fids.settings.lastTeeTime, 'HH:mm A').format('x');
        var currTime = moment().subtract(10, 'm').format('hh:mm A');
        //var currTime = moment().format('hh:mm A');
        var currTimeX = moment(currTime, 'hh:mm A').format('x');
        var counter = 0;
        do{
            var isHidden = (moment(startTime, 'x').isAfter(moment(currTimeX, 'x')));  
            for(var i = 1 ; i <= 2 ; i++){
                var row = $("<tr class='teetime_" + startTime + " " + (i==1?"F-9":"B-9") + " " + (!isHidden?"hide":"") + "' data-time=" + moment(startTime, 'x').format('HH:mm') + "></tr>");
                row.append("<td class='flight-time'>" + moment(startTime, 'x').format('HH:mm') + "</td>");
                
                row.append("<td class='flight-course'>" + (i==1?"Front 9":"Back 9") + "</td>");
                if(counter <= 2){
                    row.append("<td class='flight-player-td td-player-1 initial-flight flight-player-1-teetime_" + startTime + "'>-</td>");
                    row.append("<td class='flight-player-td td-player-2 initial-flight flight-player-2-teetime_" + startTime + "'>-</td>");
                    row.append("<td class='flight-player-td td-player-3 initial-flight flight-player-3-teetime_" + startTime + "'>-</td>");
                    row.append("<td class='flight-player-td td-player-4 initial-flight flight-player-4-teetime_" + startTime + "'>-</td>");
                    row.append("<td class='flight-player-td td-player-5 initial-flight flight-player-5-teetime_" + startTime + "'>-</td>");
                }else{
                    row.append("<td class='flight-player-td td-player-1 flight-player-1-teetime_" + startTime + "'></td>");
                    row.append("<td class='flight-player-td td-player-2 flight-player-2-teetime_" + startTime + "'></td>");
                    row.append("<td class='flight-player-td td-player-3 flight-player-3-teetime_" + startTime + "'></td>");
                    row.append("<td class='flight-player-td td-player-4 flight-player-4-teetime_" + startTime + "'></td>");
                    row.append("<td class='flight-player-td td-player-5 flight-player-5-teetime_" + startTime + "'></td>");
                }

                tBody.append(row);
            }
            startTime = moment(startTime, 'x').add(fids.settings.teeTimeInterval, 'm');
            counter++;
        }while(moment(endTime, 'x') >= moment(startTime, 'x'));

        //fids.rowMonitoringInterval = setInterval(fids.rowMonitoring, 1000);
    },
    getFlights: (c_id) => {
        
        var options = {};
        options.url = appUrl() + 'teetime/get_flights';
        options.data = { course: c_id, course_type: '', };        
        options.callback = fids.getFlightsCallback;
        
        fids.ajax(options);
    },
    getFlightsCallback: (res) => {
        fids.flights = res.flight_f;
        fids.renderFlights(fids.flights);
    },
    renderFlights: (flights) => {
        var tBody = fids.fidsTable.find('tbody'); 
        $('.flight-player-td').not('.initial-flight').html('');
        $.each(flights, function(i, v){
            var teetimeX = moment(v.teetime, 'HH:mm').format('x');
            var row = tBody.find('tr.teetime_' + teetimeX + '.' + convertCourseType(v.course));
            
            $.each(v.flightmates, function(x, k){
                row.find('td.td-player-' + (x+1)).append(k.golfer);
            });
        });
        //console.log(flights);
    },
    reloadFlights: () => {
        var c_id = $('#coursesSelect').val();
        if(c_id != ""){
            fids.getFlights(c_id);
        }
        //console.log(fids.voices);
    },
    rowMonitoring: () => {
        var rows = fids.fidsTable.find('tbody').children().not('.hide'); //fids.rowCheck()
        //var currTime = moment().subtract(20, 'm').format('hh:mm A');
        
        var currTime = moment().format('hh:mm A');
        var currTimeX = moment(currTime, 'hh:mm A').format('x');

        var f2Rows = rows.filter(function(i, e){
            return i < 2;
        });

        $.each(f2Rows, function(i, v){
            var rTime = moment($(v).attr('data-time'), 'HH:mm:ss').format('HH:mm');   
            //console.log("Row Monitoring ..... " + currTime + " | " + rTime);         
            if(!moment(rTime, 'HH:mm').isAfter(moment(currTimeX, 'x'))){
                $(v).addClass('hide');
                //if(fids.hideCheck()){ //changes
                //    $(v).addClass('hide');
                //}
                fids.stopRowMonitoring = true;
            }
        });

        if(fids.stopRowMonitoring){
            clearInterval(fids.rowMonitoringInterval);
            setTimeout(function(){ fids.stopRowMonitoring = false; }, 5000);
            
        }
    },
    aiAnnouncer: (row) => {        
        var vo = 'Microsoft Zira Desktop - English (United States)';
        window.utterances = [];
        var aiload = fids.mssg;
        var msg = new SpeechSynthesisUtterance(aiload);
        var voices = window.speechSynthesis.getVoices();
        msg.volume = 1; // 0 to 1
        msg.rate = .9; // 0.1 to 10
        msg.pitch = 1; //0 to 2
        msg.text = aiload;

        //var rows = fids.fidsTable.find('tbody').children();

        //var thrdRow = rows.not('.hide').filter(function(i, e){
        //    return i == 5;
        //});
        //console.log(row);
        //var voice = fids.voices.filter(function (v) {
        //        return v.name == vo;
        //    })[0];
        
        //if (!voice) return;
        msg.lang = 'en-US';
        msg.voice = voices[0];
        console.log(voices);
        msg.onstart = function (e) {
            clearInterval(fids.announcementInterval);
            //console.log(row);
           // console.log("Announcement!"); 
            $(row).addClass('tr-attention-to');
        };
        //console.log(fids.announced);
        
        msg.onend = function (e) {
            if(fids.isRepeated){
                $(row).removeClass('tr-attention-to');
                if(fids.announced.length == 2){
                    fids.announced = [];
                    fids.rowMonitoringInterval = setInterval(fids.rowMonitoring, 1000);
                    utterances = [];
                }
                fids.isRepeated = false;
                //console.log(fids.isRepeated);
                fids.announcementInterval = setInterval(fids.announcement, 5000);
            }else{
                fids.aiAnnouncer(row);  
                fids.isRepeated = true;
            }
            
            //console.log('Test');
            console.log('Finished in ' + event.elapsedTime + ' seconds.');
        };
        
        utterances.push(msg);
        speechSynthesis.speak(msg);
    },
    generateTextToSpeechAnnouncement: (player1, player2, player3, player4, player5, teetime, course) => {
        var message = "Attention please! Attention please! " + teetime + " teetime, the following players must proceed to the teebox now. ";
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
        
        message += ". You will Tee Off in " + (fids.checkIfFirstToAnnounce()?29:20-2) + " minutes at " + course + " course. Thank You!"
        return message;
    },
    announcement: () => {
        var currTime = moment().add((fids.checkIfFirstToAnnounce()?20:20-2), 'm').format('hh:mm A');
        var currTimeX = moment(currTime, 'hh:mm A').format('x');
        var rows = fids.fidsTable.find('tbody').children().not('tr.hide');
        //var rows = fids.rowCheck();
        //var tNow = moment(currTimeX, 'x').add(20, 'm').format('HH:mm:ss');
        var tNow = moment(currTimeX, 'x').format('HH:mm:ss');
        var isAnnounce = false;
        //console.log(currTime);
        var re;
        if(fids.announced.indexOf('first') == -1){
            re = 6;
        }else if(fids.announced.includes('first') && fids.announced.indexOf('second') == -1){
            re = 7;
        }

        var row = rows.filter(function(i, e){
            return i == re;
        });
        
        if(moment(row.attr('data-time'), 'HH:mm').isSame(moment(tNow, 'HH:mm'))){
            fids.announcementCounter=fids.announcementCounter+1;
           
            if(fids.announcementCounter <= 2){
                if(!fids.announced.includes('first')){
                    fids.announced.push('first');
                }
                else if(fids.announced.includes('first') && fids.announced.indexOf('second') == -1){
                    fids.announced.push('second');
                }
                isAnnounce = true;
                
            }else{
                isAnnounce = false;
            }
        }else{
            isAnnounce = false;
            fids.announcementCounter = 0;
        }

        if(isAnnounce){
            if(row.find('td.td-player-1').text() != ""){
                var course = $("#headerTitle").text() + " " + row.find("td.flight-course").text();
                var player1 = row.find("td.td-player-1").text();
                var player2 = row.find("td.td-player-2").text();
                var player3 = row.find("td.td-player-3").text();
                var player4 = row.find("td.td-player-4").text();
                var player5 = row.find("td.td-player-5").text();
                var teetime = row.find("td.flight-time").text();

                fids.mssg = fids.generateTextToSpeechAnnouncement(player1, player2, player3, player4, player5, teetime, course);
            }else{
                fids.mssg = '';
                
            }

            if(fids.mssg != ""){
                $.playSound(appUrl() + "assets/sndeffect.mp3");
                setTimeout(function(){ fids.aiAnnouncer(row);}, 3300);
            }else{
                fids.aiAnnouncer(row);
            }
            
        }
        
    },
    announcementV2: () => {
        var currTime = moment().add((fids.checkIfFirstToAnnounce()?20:20-2), 'm').format('hh:mm A');
        var currTimeX = moment(currTime, 'hh:mm A').format('x');
        var rows = fids.rowCheck();
        //var tNow = moment(currTimeX, 'x').add(20, 'm').format('HH:mm:ss');
        var tNow = moment(currTimeX, 'x').format('HH:mm:ss');
        var isAnnounce = false;
        //console.log(currTime);
        //console.log(rows);
        var firstTeeTime = '02:00', secondTeeTime = '02:10', thirdTeeTime = '02:20', fourthTeeTime = '02:30';
        var re, row, rowTime, isObj, o;
        if(fids.announced.indexOf('first') == -1){
            re = 6;
        }else if(fids.announced.includes('first') && fids.announced.indexOf('second') == -1){
            re = 7;
        }

        if(moment().isBefore(moment(fourthTeeTime, 'HH:mm'))){
            row = rows;
            rowTime = $(row).attr('data-time');
            isObj = true;
        }
        
        if(moment().isAfter(moment(fourthTeeTime, 'HH:mm'))){
            row = rows.filter(function(i, e){
                return i == re;
            });
            rowTime = row.attr('data-time');
            isObj = false;
        }

        /*var row = rows.filter(function(i, e){
            return i == re;
        });*/
        console.log(currTime);
        //if(moment(rowTime, 'HH:mm').isSame(moment(secondTeeTime, 'HH:mm'))){
        //    console.log(rowTime + " " + secondTeeTime);
        //}
        if(moment(rowTime, 'HH:mm').isSame(moment(tNow, 'HH:mm')) || moment(rowTime, 'HH:mm').isSame(moment(firstTeeTime, 'HH:mm')) || moment(rowTime, 'HH:mm').isSame(moment(secondTeeTime, 'HH:mm')) || moment(rowTime, 'HH:mm').isSame(moment(thirdTeeTime, 'HH:mm'))){
            fids.announcementCounter=fids.announcementCounter+1;
           
            if(fids.announcementCounter <= 2){
                if(!fids.announced.includes('first')){
                    fids.announced.push('first');
                }
                else if(fids.announced.includes('first') && fids.announced.indexOf('second') == -1){
                    fids.announced.push('second');
                }
                isAnnounce = true;
                
            }else{
                isAnnounce = false;
            }

            //console.log(rowTime + " | " + tNow);
        }else{
            isAnnounce = false;
            fids.announcementCounter = 0;
        }

        if(isAnnounce){
            if(row.find('td.td-player-1').text() != ""){                
                if(isObj){
                    o = $(row);
                }else{
                    o = row;
                }
                var course = $("#headerTitle").text() + " " + o.find("td.flight-course").text();
                var player1 = o.find("td.td-player-1").text();
                var player2 = o.find("td.td-player-2").text();
                var player3 = o.find("td.td-player-3").text();
                var player4 = o.find("td.td-player-4").text();
                var player5 = o.find("td.td-player-5").text();
                var teetime = o.find("td.flight-time").text();

                fids.mssg = fids.generateTextToSpeechAnnouncement(player1, player2, player3, player4, player5, teetime, course);
                console.log(o);
            }else{
                fids.mssg = '';
                
            }

            if(fids.mssg != ""){
                $.playSound("http://localhost/cigcms/assets/sndeffect.mp3");
                setTimeout(function(){fids.aiAnnouncer(row);}, 3300);
            }else{
                fids.aiAnnouncer(row);
            }
            
        }
        
    },
    checkIfFirstToAnnounce: () => {
        var r = false;
        if($("#isAnnounce").is(':checked')){
            r = true;
        }
        return r;
    },
    hideCheck: () => {
        var currTime = moment().format('HH:mm');
        var firstTeeTime = '02:00', secondTeeTime = '02:10', thirdTeeTime = '02:20', fourthTeeTime = '02:30';
        var fTteeTime = moment(firstTeeTime, 'HH:mm').add(1, 'm').format('HH:mm');
        var sTteeTime = moment(secondTeeTime, 'HH:mm').add(1, 'm').format('HH:mm');
        var tTteeTime = moment(thirdTeeTime, 'HH:mm').add(1, 'm').format('HH:mm');
        var h = false;

        if(moment(currTime, 'HH:mm').isSame(moment(fTteeTime, 'HH:mm'))){
            h = false;
        }else if(moment(currTime, 'HH:mm').isSame(moment(sTteeTime, 'HH:mm'))){
            h = false;
        }else if(moment(currTime, 'HH:mm').isSame(moment(tTteeTime, 'HH:mm'))){
            h = false;
        }

        if(moment(currTime, 'HH:mm').isAfter(moment(fourthTeeTime, 'HH:mm'))){
            h = true;
        }
        return h;
    },
    rowCheck: () => {
        var currTime = moment().add(20, 'm').format('HH:mm');
        var currTimeX = moment(currTime, 'HH:mm').format('x');
        var tNow = moment(currTimeX, 'x').format('HH:mm:ss');
        var firstTeeTime = '02:00', secondTeeTime = '02:10', thirdTeeTime = '02:20', fourthTeeTime = '02:30';
        var rows, row;
        
        if(moment(currTime, 'HH:mm').isSame(moment(firstTeeTime, 'HH:mm'))){
            row = fids.fidsTable.find('tbody').children().first();
            //console.log(moment().format('HH:mm') + " | " + 1);
        }else if(moment(currTime, 'HH:mm').isSame(moment(secondTeeTime, 'HH:mm'))){
            rows = fids.fidsTable.find('tbody').children().not('tr.hide');
            row = rows.filter(function(i, e){
                return i == 1;
            });
            //console.log(moment().format('HH:mm') + " | " + 2);
        }else if(moment(currTime, 'HH:mm').isSame(moment(thirdTeeTime, 'HH:mm'))){
            rows = fids.fidsTable.find('tbody').children().not('tr.hide');
            row = rows.filter(function(i, e){
                return i == 2;
            });
            //console.log(moment().format('HH:mm') + " | " + 3);
        }

        if(moment(currTime, 'HH:mm A').isSame(moment(fourthTeeTime, 'HH:mm'))){
            row = fids.fidsTable.find('tbody').children().not('tr.hide');
            //console.log(moment().format('HH:mm') + " | " + 4);
        }
        //console.log(row.attr('data-time'));
        return row;
    },
};

var convertCourseType = function(cType){
    var r = '';
    var t = cType.split('-');
    if(t[1] == 1)
        r = 'F-9';
    else
        r = 'B-9';
    

    //console.log(r);
    return r;
};

var convertCourseCode = function(code){
    var course = '';
    if(code == 'F-9'){
        course = 'Front 9';
    }
    if(code == 'B-9'){
        course = 'Back 9';
    }

    return course;
};

$(function(){
    $("#setSettings").on("click", function(){
        
        
        $("#headerTitle").html("");
        if($("#coursesSelect").val() != ""){
            $("#headerTitle").append($("#coursesSelect option:selected").text());
            fids.getFlights($("#coursesSelect").val());
            clearInterval(fids.flightInterval);
            //fids.flightInterval = setInterval(fids.getFlights($('#coursesSelect').val()), 5000);
            fids.flightInterval = setInterval(fids.reloadFlights, 5000);
            clearInterval(fids.announcementInterval);
            fids.announcementInterval = setInterval(fids.announcement, 5000);
        }else{
            swal("Please select Course!");
        }       
    });
});