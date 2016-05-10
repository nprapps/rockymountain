// Global jQuery references
var $document;
var $body;
var $section;
var $intro;
var $vr;
var $conclusion;
var $begin;
var $audioPlayer;
var $scenes;
var $canvas;

var NO_AUDIO = (window.location.search.indexOf('noaudio') >= 0);
var ASSETS_SLUG = APP_CONFIG.DEPLOYMENT_TARGET !== 'production' ? 'http://stage-apps.npr.org/' + APP_CONFIG.PROJECT_SLUG + '/assets/' : 'assets/'

var CHECKPOINTS = [];
var currentScene;

/*
 * Run on page load.
 */
var onDocumentLoad = function(e) {
    // Cache jQuery references
    $document = $('document');
    $body = $('body');
    $section = $('.section');
    $intro = $('.intro');
    $vr = $('.vr');
    $conclusion = $('.conclusion');
    $begin = $('.begin');
    $audioPlayer = $('#audio-player');
    $scenes = $('a-entity.scene');

    $begin.on('click', onBeginClick);
    $section.css({
        'opacity': 1,
        'visibility': 'visible'
    });


    setupAudioPlayer();
    buildCheckpoints();
}

var setupAudioPlayer = function() {
    $audioPlayer.jPlayer({
        loop: false,
        supplied: 'mp3',
        timeupdate: onTimeupdate,
        volume: NO_AUDIO ? 0 : 1
    });
}

var buildCheckpoints = function() {
    for (var i = 0; i < $scenes.length; i++) {
        var $scene = $scenes.eq(i);

        var obj = {
            'id': $scene.attr('id'),
            'checkpoint': $scene.data('checkpoint')
        }
        CHECKPOINTS.push(obj);
    }
}

var playAudio = function(audioURL) {
    $audioPlayer.jPlayer('setMedia', {
        mp3: audioURL
    }).jPlayer('play');
}

var pauseAudio = function() {
    $audioPlayer.jPlayer('pause');
}

var resumeAudio = function() {
    $audioPlayer.jPlayer('play');
}

var onTimeupdate = function(e) {
    var duration = e.jPlayer.status.duration;
    var position = e.jPlayer.status.currentTime;

    for (var i = 0; i < CHECKPOINTS.length; i++) {
        var thisCheckpoint = CHECKPOINTS[i]
        if (position < thisCheckpoint['checkpoint']) {
            if (thisCheckpoint['id'] === currentScene) {
                break;
            } else {
                currentScene = thisCheckpoint['id'];
                $canvas.velocity('fadeOut', {
                    duration: 1000,
                    complete: function() {
                        $scenes.attr('visible', 'false');
                        $('#' + currentScene).attr('visible', 'true');
                        $canvas.velocity('fadeIn', {
                            duration: 1000
                        });
                    }
                });
                break;
            }
        } else if (position > 50) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }

            $vr.hide();
            $conclusion.show();
        }
    }
}

var onBeginClick = function() {
    $section.hide();
    currentScene = $scenes.eq(0).attr('id');
    playAudio(ASSETS_SLUG + 'test.mp3');

    $canvas = $('canvas.a-canvas')

    var canvas = document.body;
    if (canvas.requestFullscreen) {
        canvas.requestFullscreen();
    } else if (canvas.mozRequestFullScreen) {
        canvas.mozRequestFullScreen();
    } else if (canvas.webkitRequestFullscreen) {
        canvas.webkitRequestFullscreen();
    } else if (canvas.msRequestFullscreen) {
        canvas.msRequestFullscreen();
    }
}

$(onDocumentLoad);
