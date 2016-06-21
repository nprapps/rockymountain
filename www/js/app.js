// Global jQuery references
var $document;
var $body;
var $section;
var $intro;
var $interstitial;
var $vr;
var $conclusion;
var $begin;
var $beginStory;
var $ambiPlayer;
var $audioPlayer;
var $playerWrapper;
var $scenes;
var $canvas;
var $play;
var $pause;
var $zenButtons;
var $fullscreen;
var $annotation;
var $more360;
var scene;
var cursor;
var vrToggleAudio;


var NO_AUDIO = (window.location.search.indexOf('noaudio') >= 0);
var ASSETS_SLUG = APP_CONFIG.DEPLOYMENT_TARGET !== 'production' ? 'http://stage-apps.npr.org/' + APP_CONFIG.PROJECT_SLUG + '/assets/' : 'assets/'
var currentScene;
var isTouch = Modernizr.touchevents;

/*
 * Run on page load.
 */
var onDocumentLoad = function(e) {
    // Cache jQuery references
    $window = $('window');
    $document = $('document');
    $body = $('body');
    $section = $('.section');
    $intro = $('.intro');
    $interstitial = $('.interstitial');
    $vr = $('.vr');
    $conclusion = $('.conclusion');
    $begin = $('.begin');
    $beginStory = $('.begin-story');
    $ambiPlayer = $('.ambi-player');
    $audioPlayer = $('#audio-player');
    $playerWrapper = $('.player-wrapper');
    $scenes = $('a-entity.scene');
    $play = $('.play');
    $pause = $('.pause');
    $zenButtons = $('.scene-buttons button')
    $fullscreen = $('.fullscreen');
    $annotation = $('.annotation-wrapper p');
    $more360 = $('.more-360');

    cursor = document.querySelector('a-entity[cursor]')
    scene = document.querySelector('a-scene');
    camera = document.querySelector('a-entity[camera]')
    vrToggleAudio = document.querySelector('#toggle-audio');

    $begin.on('click', onBeginClick);
    $beginStory.on('click', onBeginStoryClick);
    $play.on('click', AUDIO.resumeAudio);
    $pause.on('click', AUDIO.pauseAudio);
    $zenButtons.on('click', onZenButtonClick);
    $fullscreen.on('click', onFullscreenButtonClick)
    $more360.on('click', onMore360Click);

    scene.addEventListener('enter-vr', onVREnter);
    scene.addEventListener('exit-vr', onVRExit);
    cursor.addEventListener('click', onCursorClick);

    $section.css({
        'opacity': 1,
        'visibility': 'visible'
    });
    AUDIO.setupAudioPlayers();
}

var showCurrentScene = function() {
    $scene = $('#' + currentScene);
    $scenes.find('.sky').attr('visible', 'false');
    $scene.find('.sky').attr('visible', 'true');
    camera.setAttribute('camera', {
        'fov': $scene.data('fov')
    });
    $annotation.html($scene.data('annotation'));

    // var ambiAudio = ASSETS_SLUG + $scene.data('ambi');
    // AUDIO.playAudio($ambiPlayer, ambiAudio);

    $vr.velocity('fadeIn', {
        duration: 1000,
        complete: function() {
            if (!isTouch && !$audioPlayer.data('jPlayer').status.paused) {
                camera.emit('enter-' + currentScene);
            }
        }
    });
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
    $intro.hide();
    $interstitial.show();
}

var onBeginStoryClick = function() {
    currentScene = $scenes.eq(0).attr('id');
    $canvas = $('canvas.a-canvas');
    $section.hide();
    showCurrentScene();
    $fullscreen.show();
    $more360.show();

    AUDIO.playAudio($audioPlayer, ASSETS_SLUG + 'geology-edit616.mp3');

    if (!isTouch) {
        camera.setAttribute('drag-look-controls', 'enabled', 'false');
    }

    if ($(this).hasClass('vr-device')) {
        document.querySelector('a-scene').enterVR();
    }
}

var onCursorClick = function() {
    if ($audioPlayer.data('jPlayer').status.paused) {
        resumeAudio();
    } else {
        pauseAudio();
    }
}

var onVREnter = function() {
    $playerWrapper.hide();
    $annotation.hide();
    $more360.hide();
    vrToggleAudio.setAttribute('visible', 'true');
}

var onVRExit = function() {
    $playerWrapper.show();
    $annotation.show();
    $more360.show();
    vrToggleAudio.setAttribute('visible', 'false');
}

var onZenButtonClick = function(e) {
    var $this = $(this);
    currentScene = $this.data('scene');
    showCurrentScene();

    // setup UI
    $section.hide();
    $playerWrapper.hide();
    $vr.show();
    $fullscreen.show();
    $more360.show();
    camera.setAttribute('drag-look-controls', 'enabled', 'true');
}

var onFullscreenButtonClick = function() {
    if (
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
    ) {
        exitFullscreen();
    } else {
        requestFullscreen();
    }
}

var onMore360Click = function() {
    exitFullscreen();
    $vr.hide();
    $fullscreen.hide();
    $conclusion.show();
    $audioPlayer.jPlayer('stop');
}

$(onDocumentLoad);
