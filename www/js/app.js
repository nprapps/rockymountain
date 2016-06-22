// Global jQuery references
var $document;
var $body;
var $content;
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
var $mute;
var $introModal;
var $detailModal;
var $detailGraf;
var $modalClose;
var $learnMore;
var scene;
var cursor;
var vrToggleAudio;

var NO_AUDIO = (window.location.search.indexOf('noaudio') >= 0);
var ASSETS_SLUG = APP_CONFIG.DEPLOYMENT_TARGET !== 'production' ? 'http://stage-apps.npr.org/' + APP_CONFIG.PROJECT_SLUG + '/assets/' : 'assets/'
var currentScene;
var isTouch = Modernizr.touchevents;
var playedStory = false;

/*
 * Run on page load.
 */
var onDocumentLoad = function(e) {
    // Cache jQuery references
    $window = $('window');
    $document = $('document');
    $body = $('body');
    $content = $('.content');
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
    $zenButtons = $('.scene-buttons .card')
    $fullscreen = $('.fullscreen');
    $annotation = $('.annotation');
    $more360 = $('.more-360');
    $mute = $('.mute');
    $canvas = $('canvas.a-canvas');
    $introModal = $('.intro-modal');
    $detailModal = $('.detail-modal');
    $detailGraf = $('.details');
    $modalClose = $('.modal__box label');
    $learnMore = $('.learn-more');

    cursor = document.querySelector('a-entity[cursor]')
    scene = document.querySelector('a-scene');
    camera = document.querySelector('a-entity[camera]')
    vrToggleAudio = document.querySelector('#toggle-audio');

    $begin.on('click', onBeginClick);
    $beginStory.on('click', onBeginStoryClick);
    $play.on('click', AUDIO.resumeAudio);
    $pause.on('click', AUDIO.pauseAudio);
    $zenButtons.on('click', onZenButtonClick);
    $fullscreen.on('click', onFullscreenButtonClick);
    $more360.on('click', onMore360Click);
    $mute.on('click', onMuteClick);
    $modalClose.on('click', onModalCloseClick);
    $learnMore.on('click', onLearnMoreClick);

    scene.addEventListener('enter-vr', onVREnter);
    scene.addEventListener('exit-vr', onVRExit);
    cursor.addEventListener('click', onCursorClick);

    $content.css({
        'opacity': 1,
        'visibility': 'visible'
    });
    AUDIO.setupAudioPlayers();

    readURL();
}

var readURL = function() {
    var scene = getParameterByName('scene', window.location.href);

    if (scene) {
        currentScene = scene;
        $introModal.css('visibility', 'visible')
        enterMomentOfZen();
    }
}

var showCurrentScene = function() {
    $scene = $('#' + currentScene);
    $scenes.find('.sky').attr('visible', 'false');
    $scene.find('.sky').attr('visible', 'true');
    camera.setAttribute('camera', {
        'fov': $scene.data('fov')
    });
    $annotation.html($scene.data('annotation'));
    $detailGraf.html($scene.data('details'));

    $canvas.velocity('fadeIn', {
        duration: 1000,
        complete: function() {
            if (!isTouch && !$audioPlayer.data('jPlayer').status.paused) {
                //camera.emit('enter-' + currentScene); -enable animations
            }
        }
    });
}

var enterMomentOfZen = function() {
    showCurrentScene();
    handleUI('ZEN');
}

var handleUI = function(mode) {
    $section.hide();
    $vr.show();

    switch(mode) {
        case 'NARRATIVE':
            $playerWrapper.show();
            $fullscreen.show();
            $more360.show();
            $mute.hide();
            $learnMore.hide();
            if (!isTouch) {
                // camera.setAttribute('drag-look-controls', 'enabled', 'false'); -turn off click and drag
            }
            break;
        case 'ZEN':
            $playerWrapper.hide();
            $fullscreen.show();
            $more360.show();
            camera.setAttribute('drag-look-controls', 'enabled', 'true');
            var ambiAudio = ASSETS_SLUG + $scene.data('ambi');
            AUDIO.playAudio($ambiPlayer, ambiAudio);
            $mute.show();
            $mute.find('.mute-button').addClass('playing');
            $learnMore.show();
            break;
        default:
            break;
    }
}

var setupConclusionCard = function() {
    $('.story').hide();
    $('.replay-story').show();
}

var onBeginClick = function() {
    $intro.hide();
    $interstitial.show();
}

var onBeginStoryClick = function() {
    currentScene = $scenes.eq(0).attr('id');
    showCurrentScene();
    handleUI('NARRATIVE');
    AUDIO.playAudio($audioPlayer, ASSETS_SLUG + 'geology-edit616.mp3');
    playedStory = true;
    setupConclusionCard();

    if ($(this).hasClass('vr-device')) {
        document.querySelector('a-scene').enterVR();
    }
}

var onZenButtonClick = function(e) {
    var $this = $(this);
    currentScene = $this.data('scene');

    // update URL
    var newURL = APP_CONFIG.S3_BASE_URL + '/?scene=' + currentScene;
    history.replaceState(null, null, newURL);

    enterMomentOfZen();
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
    $ambiPlayer.jPlayer('stop');
    history.replaceState(null, null, APP_CONFIG.S3_BASE_URL);
}

var onMuteClick = function() {
    if ($ambiPlayer.data('jPlayer').status.paused) {
        $ambiPlayer.jPlayer('play');
        $mute.find('.mute-button').removeClass().addClass('playing mute-button');
    } else {
        $ambiPlayer.jPlayer('pause');
        $mute.find('.mute-button').removeClass().addClass('paused mute-button');
    }
}

var onModalCloseClick = function() {
    $(this).parents('.modal').css('visibility', 'hidden');
}

var onLearnMoreClick = function() {
    $detailModal.css('visibility', 'visible');
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

var getParameterByName = function(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

$(onDocumentLoad);
