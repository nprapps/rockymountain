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
var $play;
var $pause;
var $returnButtons;

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
    $play = $('.play');
    $pause = $('.pause');
    $returnButtons = $('.scene-buttons button')

    $begin.on('click', onBeginClick);
    $play.on('click', resumeAudio);
    $pause.on('click', pauseAudio);
    $returnButtons.on('click', onReturnButtonClick);

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
            exitFullscreen();
            $vr.hide();
            $conclusion.show();
            $audioPlayer.jPlayer('stop');
        }
    }
}

var requestFullscreen = function() {
    if (document.body.requestFullscreen) {
        document.body.requestFullscreen();
    } else if (document.body.mozRequestFullScreen) {
        document.body.mozRequestFullScreen();
    } else if (document.body.webkitRequestFullscreen) {
        document.body.webkitRequestFullscreen();
    } else if (document.body.msRequestFullscreen) {
        document.body.msRequestFullscreen();
    }
}

var exitFullscreen = function() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

var onBeginClick = function() {
    $section.hide();
    currentScene = $scenes.eq(0).attr('id');
    playAudio(ASSETS_SLUG + 'test.mp3');

    requestFullscreen();

    $canvas = $('canvas.a-canvas')
}

var onReturnButtonClick = function(e) {
    var $this = $(this);
    currentScene = $this.data('scene');

    requestFullScreen();

    $conclusion.hide();
    $vr.show();
    $scenes.attr('visible', 'false');
    $('#' + currentScene).attr('visible', 'true');
}

$(onDocumentLoad);
