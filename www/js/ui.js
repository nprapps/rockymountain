var UI = (function() {
    var fadeInContent = function() {
        $content.css({
            'opacity': 1,
            'visibility': 'visible'
        });
    }

    var setupDeviceNarrativeUI = function() {
        $playerWrapper.show();
        $fullscreen.show();
        $more360.show();
        $annotation.show();
        $mute.hide();
        $learnMore.hide();
        $scene.find('.vr-annotation').attr('visible', 'false');
    }

    var setupDeviceZenUI = function() {
        $playerWrapper.hide();
        $fullscreen.show();
        $more360.show();
        $annotation.show();
        $mute.show();
        $mute.find('.mute-button').addClass('playing');
        $learnMore.show();
        $scene.find('.vr-annotation').attr('visible', 'false');
    }

    var setupVRUI = function() {
        $playerWrapper.hide();
        $fullscreen.hide();
        $more360.hide();
        $annotation.hide();
        $mute.hide();
        $learnMore.hide();
        $scene.find('.vr-annotation').attr('visible', 'true');
    }

    var updateSceneData = function() {
        $annotation.html($scene.data('annotation'));
        $detailBlock.find('.desc').html($scene.data('description'));
        $detailBlock.find('h6').html($scene.data('details'));
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

    var setAudioPlayerToPlaying = function() {
        $pause.show();
        $play.hide();
    }

    var toggleMuteButton = function() {
        if ($ambiPlayer.data('jPlayer').status.paused) {
            $mute.find('.mute-button').removeClass().addClass('playing mute-button');
        } else {
            $mute.find('.mute-button').removeClass().addClass('paused mute-button');
        }
    }

    var navigateToInterstitial = function() {
        $section.hide();
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

    var animateTitlecard = function() {
        if ($intro.is(':visible')) {
            var newWidth = calculateImgWrapperWidth();
            var windowWidth = $body.width();
            var difference = newWidth - windowWidth;
            var translatePercentage = ((difference / newWidth) * 100).toString() + '%';
            $imgWrapper.width(newWidth);

            setTimeout(function() {
                if (isSafari) {
                    $imgWrapper.velocity({
                        translateX: '-' + translatePercentage,
                    }, {
                        duration: 120000,
                        easing: 'linear'
                    });
                } else {
                    $imgWrapper.css({
                        'transform': 'translateX(-' + translatePercentage + ')'
                    });
                }
            }, 2000);
        }
    }

    var calculateImgWrapperWidth = function() {
        return $imgWrapper.height() * 3.084337349;
    }

    return {
        'fadeInContent': fadeInContent,
        'updateSceneData': updateSceneData,
        'setupDeviceNarrativeUI': setupDeviceNarrativeUI,
        'setupDeviceZenUI': setupDeviceZenUI,
        'setupVRUI': setupVRUI,
        'setupConclusionCard': setupConclusionCard,
        'toggleAudioPlayer': toggleAudioPlayer,
        'setAudioPlayerToPlaying': setAudioPlayerToPlaying,
        'toggleMuteButton': toggleMuteButton,
        'navigateToInterstitial': navigateToInterstitial,
        'navigateToVR': navigateToVR,
        'navigateToConclusion': navigateToConclusion,
        'showDetailModal': showDetailModal,
        'closeModal': closeModal,
        'animateTitlecard': animateTitlecard,
        'calculateImgWrapperWidth': calculateImgWrapperWidth
    }

})();