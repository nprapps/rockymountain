var AUDIO = (function() {
    var setupAudioPlayers = function() {
        $audioPlayer.jPlayer({
            ended: EVENTS.onEnded,
            loop: false,
            seeked: EVENTS.onSeek,
            supplied: 'mp3',
            timeupdate: EVENTS.onTimeupdate,
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
        if (animate) {
            camera.play();
        }
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

    return {
        'setupAudioPlayers': setupAudioPlayers,
        'playAudio': playAudio,
        'pauseAudio': pauseAudio,
        'resumeAudio': resumeAudio,
        'stopAllAudio': stopAllAudio,
        'toggleAmbiAudio': toggleAmbiAudio
    }
})();