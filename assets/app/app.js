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

    $('.btn-daycard').on('click', function(){
        var g_id = $(this).closest("tr").data('golfer-id');
        
        swal({
            title: 'Bag Claim Tag',
            input: 'text',
            inputPlaceholder: 'Enter Daycard',
            showCancelButton: true,
            inputValidator: function inputValidator(value) {
                if(value){
                    console.log(g_id);
                }else{
                    return 'Please enter daycard details!';
                }
            }
        });
    });

    var checkGolfer = (res) => {
        var data = res.data;
        var golfer = data.golfer;
        var booking = {};

        if(data.booking){
            booking = data.booking;
        }
        
        var html = 'Confirmed Tag of <strong> ' +
        golfer.salutation + ' ' + golfer.firstName + ' ' + golfer.lastName +
        '</strong>' + (data.booking?'<br/> with Tee Time of <strong> ' + booking.teedate  + ' ' + booking.f9_starttime + '</strong>':'') + '<br/>' +
        '<img src="'+ golfer.photo +'" alt="" class="circle responsive-img center-align">';

        if(res.status == 'OK'){
            swal({
                title: 'Bag Claim Tag',
                html: html,
                input: 'text',
                inputPlaceholder: 'Enter Bag Claim Tag',
                showCancelButton: true,
                inputValidator: function inputValidator(value) {
                    if(value){
                        var params = {                            
                            
                            status: 'Checked-in',
                            golferIdInt: golfer.ID,
                            golferId: golfer.golfer_id,
                            bct: value
                        };

                        if(data.booking){
                            params.bookingId = booking.booking_no;                            
                        }
                        
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