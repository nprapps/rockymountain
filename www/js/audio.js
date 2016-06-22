var AUDIO = (function() {
    var setupAudioPlayers = function() {
        $audioPlayer.jPlayer({
            ended: onEnded,
            loop: false,
            supplied: 'mp3',
            timeupdate: onTimeupdate,
            volume: NO_AUDIO ? 0 : 1
        });

        $ambiPlayer.jPlayer({
            loop: true,
            supplied: 'mp3',
            volume: NO_AUDIO ? 0 : 0.0,
            cssSelectorAncestor: null
        })
    }

    var playAudio = function($player, audioURL) {
        $player.jPlayer('setMedia', {
            mp3: audioURL
        }).jPlayer('play');
        $play.hide();
        $pause.show();
    }

    var pauseAudio = function() {
        $audioPlayer.jPlayer('pause');
        $pause.hide();
        $play.show();
    }

    var resumeAudio = function() {
        $audioPlayer.jPlayer('play');
        $play.hide();
        $pause.show();
    }

    var onTimeupdate = function(e) {
        var duration = e.jPlayer.status.duration;
        var position = e.jPlayer.status.currentTime;

        for (var i = 0; i < COPY['vr'].length; i++) {
            var thisRow = COPY['vr'][i];
            if (position < thisRow['end_time'] && position > 0) {
                if (thisRow['id'] === currentScene) {
                    break;
                } else {
                    currentScene = thisRow['id'];
                    $canvas.velocity('fadeOut', {
                        duration: 1000,
                        complete: showCurrentScene
                    });
                    break;
                }
            }
        }
    }

    var onEnded = function(e) {
        exitFullscreen();
        $vr.hide();
        $fullscreen.hide();
        $conclusion.show();
        $ambiPlayer.jPlayer('stop');
    }

    return {
        'setupAudioPlayers': setupAudioPlayers,
        'playAudio': playAudio,
        'pauseAudio': pauseAudio,
        'resumeAudio': resumeAudio
    }
})();