
var socket = io.connect(surl());

socket.emit("logged:in", {data: "logged .."});

socket.on("bagdrop checkin callback", function(data){
    var res = data.cbdata.res;
    var golfer = res.data.golfer;
    var booking = {};

    if(data.booking){
        booking = res.data.booking;
    }
    
    var html = 'Confirmed Checkin of <strong> ' +
    golfer.salutation + ' ' + golfer.firstName + ' ' + golfer.lastName +
    '</strong>' + (data.booking?'<br/> with Tee Time of <strong> ' + booking.teedate  + ' ' + booking.f9_starttime + '</strong>':'') + '<br/>' +
    '<img src="'+ golfer.photo +'" alt="" class="circle responsive-img center-align">';

    swal({
        title: data.message,
        type: 'info',
        html: html,
    });
});