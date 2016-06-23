var EVENTS = (function() {
    var onBeginClick = function() {
        UI.navigateToInterstitial();
    }

    var onBeginStoryClick = function() {
        AUDIO.playAudio($audioPlayer, ASSETS_SLUG + 'geology-edit616.mp3');

        if ($(this).hasClass('guided')) {
            VR.turnOnAnimations();
        }
        if ($(this).hasClass('vr-device')) {
            VR.enterVR();
        }
        VR.setCurrentScene(0);
        VR.changeVRScene();

        UI.setupDeviceNarrativeUI();
        UI.updateSceneData();
        UI.toggleAudioPlayer();
        UI.setupConclusionCard();
        UI.navigateToVR();

    }

    var onZenButtonClick = function(e) {
        currentScene = $(this).data('scene');
        VR.enterMomentOfZen();
    }

    var onFullscreenButtonClick = function() {
        if (
            document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.mozFullScreenElement ||
            document.msFullscreenElement
        ) {
            UTILS.exitFullscreen();
        } else {
            UTILS.requestFullscreen();
        }
    }

    var onMore360Click = function() {
        UTILS.exitFullscreen();
        UI.navigateToConclusion();
        AUDIO.stopAllAudio();
        UI.toggleAudioPlayer();
    }

    var onPlayClick = function() {
        AUDIO.resumeAudio();
        UI.toggleAudioPlayer();
    }

    var onPauseClick = function() {
        AUDIO.pauseAudio();
        UI.toggleAudioPlayer();
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
        UI.closeModal($(this));
    }

    var onLearnMoreClick = function() {
        UI.showDetailModal();
    }

    var onCursorClick = function() {
        if ($audioPlayer.data('jPlayer').status.paused) {
            AUDIO.resumeAudio();
        } else {
            AUDIO.pauseAudio();
        }
    }

    var onVREnter = function() {
        setupVRNarrativeUI();
    }

    var onVRExit = function() {
        setupDeviceNarrativeUI();
    }

    var onSceneSwitch = function() {
        VR.changeVRScene();
        UI.updateSceneData();
    }

    return {
        'onBeginClick': onBeginClick,
        'onBeginStoryClick': onBeginStoryClick,
        'onZenButtonClick': onZenButtonClick,
        'onFullscreenButtonClick': onFullscreenButtonClick,
        'onMore360Click': onMore360Click,
        'onMuteClick': onMuteClick,
        'onPlayClick': onPlayClick,
        'onPauseClick': onPauseClick,
        'onModalCloseClick': onModalCloseClick,
        'onLearnMoreClick': onLearnMoreClick,
        'onCursorClick': onCursorClick,
        'onVREnter': onVREnter,
        'onVRExit': onVRExit,
        'onSceneSwitch': onSceneSwitch
    }
})();