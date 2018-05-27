
var socket = io.connect(surl());

socket.emit("logged:in", {data: "logged .."});

socket.on("bagdrop checkin callback", function(data){
    var res = data.cbdata.res;
    swal({
        title: data.message,
        type: 'info',
        html: 'Golfer: <strong> ' +
        res.golfer.salutation + ' ' + res.golfer.firstName + ' ' + res.golfer.lastName +
        '</strong><br/> with Tee Time of <strong> ' + res.golfer.teedate  + ' ' + res.golfer.f9_starttime + '</strong><br/>' +
        '<img src="'+ res.golfer.photo +'" alt="" class="circle responsive-img center-align">',
    });
});