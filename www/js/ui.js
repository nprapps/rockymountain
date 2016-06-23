var UI = (function() {
    var setupDeviceNarrativeUI = function() {
        $playerWrapper.show();
        $fullscreen.show();
        $more360.show();
        $mute.hide();
        $learnMore.hide();
        vrToggleAudio.setAttribute('visible', 'false');
    }

    var setupDeviceZenUI = function() {
        $playerWrapper.hide();
        $fullscreen.show();
        $more360.show();
        $mute.show();
        $mute.find('.mute-button').addClass('playing');
        $learnMore.show();
    }

    var setupVRNarrativeUI = function() {
        $playerWrapper.hide();
        $annotation.hide();
        $more360.hide();
        vrToggleAudio.setAttribute('visible', 'true');
    }

    var updateSceneData = function() {
        $annotation.html($scene.data('annotation'));
        $detailGraf.html($scene.data('details'));
        $canvas.velocity('fadeIn', {
            duration: 1000
        });
    }

    var setupConclusionCard = function() {
        $('.story').hide();
        $('.replay-story').show();
    }

    var toggleAudioPlayer = function() {
        $pause.toggle();
        $play.toggle();
    }

    var navigateToInterstitial = function() {
        $intro.hide();
        $interstitial.show();
    }

    var navigateToVR = function() {
        $section.hide();
        $vr.show();
    }

    var navigateToConclusion = function() {
        $vr.hide();
        $conclusion.show();
        history.replaceState(null, null, APP_CONFIG.S3_BASE_URL);
    }

    var showDetailModal = function() {
        $detailModal.css('visibility', 'visible');
    }

    var closeModal = function($modal) {
        $modal.parents('.modal').css('visibility', 'hidden');
        var checkbox = $modal.parents('.modal').find('input[type="checkbox"]');
        setTimeout(function() {
            checkbox.prop('checked', !checkbox.prop('checked'))
        }, 1000);
    }

    return {
        'updateSceneData': updateSceneData,
        'setupDeviceNarrativeUI': setupDeviceNarrativeUI,
        'setupDeviceZenUI': setupDeviceZenUI,
        'setupVRNarrativeUI': setupVRNarrativeUI,
        'setupConclusionCard': setupConclusionCard,
        'toggleAudioPlayer': toggleAudioPlayer,
        'navigateToInterstitial': navigateToInterstitial,
        'navigateToVR': navigateToVR,
        'navigateToConclusion': navigateToConclusion,
        'showDetailModal': showDetailModal,
        'closeModal': closeModal,
    }

})();