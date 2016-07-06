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
var $scene;
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
var $detailBlock;
var $toInterstitial;
var $modalClose;
var $learnMore;
var $restartStory;
var $modalDevice;
var $modalVR;
var $instructionsModal;
var $imgWrapper;
var scene;
var cursor;

var NO_AUDIO = (window.location.search.indexOf('noaudio') >= 0);
var ASSETS_SLUG = APP_CONFIG.DEPLOYMENT_TARGET !== 'production' ? 'http://stage-apps.npr.org/' + APP_CONFIG.PROJECT_SLUG + '/assets/' : 'assets/'
var currentScene;
var isTouch = Modernizr.touchevents;
var playedStory = false;
var animate = false;
var inVR = false;
var endedAudioInVR = false;
var isSafari = false;

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
    $detailBlock = $('.details');
    $toInterstitial = $('.to-interstitial');
    $modalClose = $('.modal__box label');
    $learnMore = $('.learn-more');
    $restartStory = $('.restart-story');
    $modalDevice = $('.modal-360');
    $modalVR = $('.modal-vr');
    $imgWrapper = $('.img-wrapper');

    cursor = document.querySelector('a-entity[cursor]');
    scene = document.querySelector('a-scene');
    camera = document.querySelector('a-entity[camera]')

    $begin.on('click', EVENTS.onBeginClick);
    $beginStory.on('click', EVENTS.onBeginStoryClick);
    $play.on('click', EVENTS.onPlayClick);
    $pause.on('click', EVENTS.onPauseClick);
    $zenButtons.on('click', EVENTS.onZenButtonClick);
    $fullscreen.on('click', EVENTS.onFullscreenButtonClick);
    $more360.on('click', EVENTS.onMore360Click);
    $mute.on('click', EVENTS.onMuteClick);
    $toInterstitial.on('click', EVENTS.onToInterstitialClick);
    $modalClose.on('click', EVENTS.onModalCloseClick);
    $learnMore.on('click', EVENTS.onLearnMoreClick);
    $restartStory.on('click', EVENTS.onRestartStoryClick);
    $modalDevice.on('click', EVENTS.onModalDeviceClick);
    $modalVR.on('click', EVENTS.onModalVRClick);
    $(window).resize(EVENTS.onResize);
    $(window).on("orientationchange", EVENTS.onOrientationChange);

    scene.addEventListener('enter-vr', EVENTS.onVREnter);
    scene.addEventListener('exit-vr', EVENTS.onVRExit);

    UTILS.detectBrowser();
    UTILS.readURL();
    AUDIO.setupAudioPlayers();
    UI.animateTitlecard();
    VR.loadImages();
}

var onAssetsLoad = function() {
    UI.removeLoadingIndicators();
}

$(onDocumentLoad);
$(window).on('load', onAssetsLoad);
