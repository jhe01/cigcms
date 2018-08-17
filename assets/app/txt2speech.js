$(function(){
    var voiceSelect = $('#voiceSelect');
    var voices;
    var v = 'Microsoft Zira Desktop - English (United States)';

    speechSynthesis.onvoiceschanged = function () {
        if (voices)
            return;
        voices = speechSynthesis.getVoices();

        voices.forEach(function (voice, i) {
            var voiceName = voice.name;
            var selected = '';

            if (voiceName == 'native') {
                selected = 'selected';
            }
            var option = "<option value='" + voiceName + "' " + selected + " >" + voiceName + "</option>";
            voiceSelect.append(option);
        });
    };

    voiceSelect.change(function () {
        var aiload = $('#ai').val();
        var msg = new SpeechSynthesisUtterance(aiload);
        msg.volume = 1; // 0 to 1
        msg.rate = .9; // 0.1 to 10
        msg.pitch = 1; //0 to 2
        msg.text = aiload;

        var val = $(this).val();
        var voice = voices.filter(function (v) {
                return v.name == val;
            })[0];
        if (!voice) return;

        msg.lang = 'en-US';
        msg.voice = voice;

        msg.onend = function (e) {
            console.log('Finished in ' + event.elapsedTime + ' seconds.');
        };

        speechSynthesis.cancel();
        speechSynthesis.speak(msg);
    });


});