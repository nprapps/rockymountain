// Global jQuery references
var $document;
var $body;
var $section;
var $begin;
var $audioPlayer;
var $scenes;

var NO_AUDIO = (window.location.search.indexOf('noaudio') >= 0);
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
                $scenes.attr('visible', 'false');
                $('#' + thisCheckpoint['id']).attr('visible', 'true');
                break;
            }
        }
    }
}

var onBeginClick = function() {
    $section.hide();
    currentScene = $scenes.eq(0).attr('id');
    playAudio('assets/test.mp3');
}

$(onDocumentLoad);
