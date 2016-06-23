var AUDIO = (function() {
    var setupAudioPlayers = function() {
        $audioPlayer.jPlayer({
            ended: onEnded,
            loop: false,
            seeked: onSeek,
            supplied: 'mp3',
            timeupdate: onTimeupdate,
            volume: NO_AUDIO ? 0 : 1
        });

        $ambiPlayer.jPlayer({
            loop: true,
            supplied: 'mp3',
            volume: NO_AUDIO ? 0 : 1,
            cssSelectorAncestor: null
        })
    }

    var playAudio = function($player, audioURL) {
        $player.jPlayer('setMedia', {
            mp3: audioURL
        }).jPlayer('play');
        playedStory = true;
    }

    var pauseAudio = function() {
        $audioPlayer.jPlayer('pause');
        if (animate) {
            camera.pause();
        }
    }

    var resumeAudio = function() {
        $audioPlayer.jPlayer('play');
    }

    var toggleAmbiAudio = function() {
        if ($ambiPlayer.data('jPlayer').status.paused) {
            $ambiPlayer.jPlayer('play');
        } else {
            $ambiPlayer.jPlayer('pause');
        }
    }

    var stopAllAudio = function() {
        $audioPlayer.jPlayer('stop');
        $ambiPlayer.jPlayer('stop');
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
                        complete: EVENTS.onSceneSwitch
                    });
                    break;
                }
            }
        }
    }

    var onSeek = function(e) {
        if (animate) {
            camera.emit('cancel-' + currentScene);
        }
    }

    var onEnded = function(e) {
        UTILS.exitFullscreen();
        UI.navigateToConclusion();
        stopAllAudio();
        if (animate) {
            camera.emit('cancel-' + currentScene);
        }
    }

    return {
        'setupAudioPlayers': setupAudioPlayers,
        'playAudio': playAudio,
        'pauseAudio': pauseAudio,
        'resumeAudio': resumeAudio,
        'stopAllAudio': stopAllAudio,
        'toggleAmbiAudio': toggleAmbiAudio
    }
})();