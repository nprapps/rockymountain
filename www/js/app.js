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
var animate = false;

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
    $canvas = $('canvas#scene-canvas');
    $introModal = $('.intro-modal');
    $detailModal = $('.detail-modal');
    $detailGraf = $('.details');
    $modalClose = $('.modal__box label');
    $learnMore = $('.learn-more');

    cursor = document.querySelector('a-entity[cursor]')
    scene = document.querySelector('a-scene');
    camera = document.querySelector('a-entity[camera]')
    vrToggleAudio = document.querySelector('#toggle-audio');

    $begin.on('click', EVENTS.onBeginClick);
    $beginStory.on('click', EVENTS.onBeginStoryClick);
    $play.on('click', EVENTS.onPlayClick);
    $pause.on('click', EVENTS.onPauseClick);
    $zenButtons.on('click', EVENTS.onZenButtonClick);
    $fullscreen.on('click', EVENTS.onFullscreenButtonClick);
    $more360.on('click', EVENTS.onMore360Click);
    $mute.on('click', EVENTS.onMuteClick);
    $modalClose.on('click', EVENTS.onModalCloseClick);
    $learnMore.on('click', EVENTS.onLearnMoreClick);

    scene.addEventListener('enter-vr', EVENTS.onVREnter);
    scene.addEventListener('exit-vr', EVENTS.onVRExit);
    cursor.addEventListener('click', EVENTS.onCursorClick);

    $content.css({
        'opacity': 1,
        'visibility': 'visible'
    });
    AUDIO.setupAudioPlayers();
    UTILS.readURL();
}

$(onDocumentLoad);