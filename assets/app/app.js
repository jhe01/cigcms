var app = {
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
        var hashids = new Hashids("Kin@lik0tN1K1k0", 6, "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890");
        return (hashids.encode(param));
    },
    
};

$(function(){
    $('#nfc_tag').on('change', function(){
        var tag = $(this).val();
        var ajxData = {
            url: appUrl() + 'golfer/get_golfer',
            data: {tag: tag},
            callback: checkGolfer
        };
        app.ajax(ajxData);
    });

    // CB
    var checkGolfer = (res) => {
        var data = res.data;
        console.log();
        if(res.status == 'OK'){
            swal({
                title: 'Bag Claim Tag',
                html: 'Confirmed Tag of <strong> ' +
                data.salutation + ' ' + data.firstName + ' ' + data.lastName +
                '</strong><br/> with Tee Time of <strong> ' + data.teedate  + ' ' + data.f9_starttime + '</strong><br/>' +
                '<img src="'+ data.photo +'" alt="" class="circle responsive-img center-align">',
                input: 'text',
                inputPlaceholder: 'Enter Bag Claim Tag',
                showCancelButton: true,
                inputValidator: function inputValidator(value) {
                    if(value){
                        var params = {                            
                            bookingId: data.booking_no,
                            status: 'Checked-in',
                            golferIdInt: data.ID,
                            golferId: data.golfer_id,
                            bct: value
                        };
                        
                        var ajxData = {
                            url: appUrl() + 'golfer/checkin_golfer',
                            data: params,
                            callback: golferCheckin
                        };

                        app.ajax(ajxData);
                    }else{
                        return 'Please enter bag claim tag!';
                    }
                }
            });
        }
        
    }

    var golferCheckin = (res) => {
        socket.emit('bagdrop:checkin', {res: res});
    };
});