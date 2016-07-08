var EVENTS = (function() {
    var onBeginClick = function() {
        UI.navigateToInterstitial();
        ANALYTICS.trackEvent('begin');
    }

    var onBeginStoryClick = function() {
        if ($(this).hasClass('loading')) {
            return;
        }

        ANALYTICS.clearTimeListened();
        AUDIO.playAudio($audioPlayer, ASSETS_SLUG + 'kirby-77.mp3');

        if ($(this).hasClass('guided')) {
            VR.turnOnAnimations();
        } else {
            VR.turnOffAnimations();
        }

        VR.setCurrentScene(0);
        VR.changeVRScene();

        if ($(this).hasClass('vr-device')) {
            VR.enterVR();
            UI.setupVRUI();
        } else {
            UI.setupDeviceNarrativeUI();
        }

        UI.updateSceneData();
        UI.setAudioPlayerToPlaying();
        UI.setupConclusionCard();
        UI.navigateToVR();

        if ($(this).hasClass('guided')) {
            var analyticsSlug = 'guided';
        } else if ($(this).hasClass('click-drag')) {
            var analyticsSlug = 'click-drag';
        } else if ($(this).hasClass('mobile-360')) {
            var analyticsSlug = 'mobile-360';
        } else if ($(this).hasClass('vr-device')) {
            var analyticsSlug = 'vr-device';
        }

        ANALYTICS.trackEvent('begin-story', analyticsSlug);
    }

    var onZenButtonClick = function(e) {
        currentScene = $(this).data('scene');
        VR.enterMomentOfZen();
        UI.setupDeviceZenUI();

        ANALYTICS.clearTimeListened();
        var ambiAudio = ASSETS_SLUG + $scene.data('ambi');
        AUDIO.playAudio($ambiPlayer, ambiAudio);

        ANALYTICS.trackEvent('enter-moz', currentScene);
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

        ANALYTICS.trackEvent('more-360-click');
    }

    var onPlayClick = function() {
        AUDIO.resumeAudio();
        UI.toggleAudioPlayer();
        ANALYTICS.trackEvent('resume-audio');
    }

    var onPauseClick = function() {
        AUDIO.pauseAudio();
        UI.toggleAudioPlayer();
        ANALYTICS.trackEvent('pause-audio');
    }

    var onMuteClick = function() {
        AUDIO.toggleAmbiAudio();
        UI.toggleMuteButton();
        ANALYTICS.trackEvent('mute-audio', currentScene);
    }

    var onModalCloseClick = function(e) {
        if ($(this).hasClass('loading')) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        } else {
            UI.closeModal($(this));
        }
    }

    var onLearnMoreClick = function() {
        UI.showDetailModal();
        ANALYTICS.trackEvent('learn-more-click', currentScene);
    }

    var onVREnter = function() {
        UI.setupVRUI();
        inVR = true;
    }

    var onVRExit = function() {
        var scene = UTILS.getParameterByName('scene', window.location.href);

        if (scene) {
            UI.setupDeviceZenUI();
        } else {

            if (endedAudioInVR) {
                UI.navigateToConclusion();
            } else {
                UI.setupDeviceNarrativeUI();
            }
        }
        inVR = false;
    }

    var onSceneSwitch = function() {
        VR.changeVRScene();
        UI.updateSceneData();
    }

    var onTimeupdate = function(e) {
        var position = e.jPlayer.status.currentTime;
        VR.getNewVRSceneFromAudioPosition(position);
        ANALYTICS.calculateTimeListened(position, 'story');
    }

    var onSeek = function(e) {
        VR.cancelAnimation();
    }

    var onEnded = function(e) {
        if (inVR) {
            VR.cancelAnimation();
            VR.navigateToEndScene();
        } else {
            UTILS.exitFullscreen();
            UI.navigateToConclusion();
        }
        AUDIO.stopAllAudio();
        ANALYTICS.trackEvent('story-completed');
    }

    var onAmbiTimeupdate = function(e) {
        var position = e.jPlayer.status.currentTime;
        ANALYTICS.calculateTimeListened(position, currentScene);
    }

    var onRestartStoryClick = function(e) {
        UI.navigateToInterstitial();
        UTILS.resetState();
        ANALYTICS.trackEvent('restart-story-click');
    }

    var onModalDeviceClick = function(e) {
        if ($(this).hasClass('loading')) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        } else {
            UI.setupDeviceZenUI();
            var ambiAudio = ASSETS_SLUG + $scene.data('ambi');
            AUDIO.playAudio($ambiPlayer, ambiAudio);
            ANALYTICS.trackEvent('zen-modal-click', 'device');
        }
    }

    var onModalVRClick = function(e) {
        if ($(this).hasClass('loading')) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        } else {
            VR.enterVR();
            UI.setupVRUI();
            var ambiAudio = ASSETS_SLUG + $scene.data('ambi');
            AUDIO.playAudio($ambiPlayer, ambiAudio);
            ANALYTICS.trackEvent('zen-modal-click', 'vr');
        }
    }

    var onResize = function() {
        UI.animateTitlecard();
    }

    var onToInterstitialClick = function() {
        $detailModal.css('visibility', 'hidden');
        AUDIO.stopAllAudio();
        UI.navigateToInterstitial();
        UTILS.resetState();
        ANALYTICS.trackEvent('to-interstitial-from-details-click');
    }

    var onOrientationChange = function() {
        if (endedAudioInVR) {
            VR.exitVR();
        }
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
        'onVREnter': onVREnter,
        'onVRExit': onVRExit,
        'onSceneSwitch': onSceneSwitch,
        'onTimeupdate': onTimeupdate,
        'onSeek': onSeek,
        'onEnded': onEnded,
        'onAmbiTimeupdate': onAmbiTimeupdate,
        'onRestartStoryClick': onRestartStoryClick,
        'onModalDeviceClick': onModalDeviceClick,
        'onModalVRClick': onModalVRClick,
        'onResize': onResize,
        'onToInterstitialClick': onToInterstitialClick,
        'onOrientationChange': onOrientationChange
    }
})();
