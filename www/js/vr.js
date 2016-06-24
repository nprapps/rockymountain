var VR = (function() {
    var setCurrentScene = function(index) {
        currentScene = $scenes.eq(index).attr('id');
    }

    var enterVR = function() {
        scene.enterVR();
    }

    var turnOnAnimations = function() {
        camera.setAttribute('drag-look-controls', 'enabled', 'false');
        animate = true;
    }

    var turnOffAnimations = function() {
        camera.setAttribute('drag-look-controls', 'enabled', 'true');
        animate = false;
    }

    var enterMomentOfZen = function() {
        var newURL = APP_CONFIG.S3_BASE_URL + '/?scene=' + currentScene;
        history.replaceState(null, null, newURL);

        turnOffAnimations();
        changeVRScene();
        UI.updateSceneData();
        UI.setupDeviceZenUI();
        UI.navigateToVR();

        var ambiAudio = ASSETS_SLUG + $scene.data('ambi');
        AUDIO.playAudio($ambiPlayer, ambiAudio);
    }

    var getNewVRSceneFromAudioPosition = function(position) {
        for (var i = 0; i < COPY['vr'].length; i++) {
            var thisRow = COPY['vr'][i];
            if (position < thisRow['end_time'] && position > 0) {
                if (thisRow['id'] === currentScene) {
                    break;
                } else {
                    currentScene = thisRow['id'];
                    $canvas.velocity('fadeOut', {
                        duration: 1000,
                        complete: EVENTS.onSceneSwitch
                    });
                    break;
                }
            }
        }
    }

    var changeVRScene = function() {
        $scene = $('#' + currentScene);
        $scenes.find('.sky').attr('visible', 'false');
        $scene.find('.sky').attr('visible', 'true');
        camera.setAttribute('camera', 'fov', $scene.data('fov'));

        if (animate) {
            camera.emit('enter-' + currentScene);
        }
    }

    var cancelAnimation = function() {
        if (animate) {
            camera.emit('cancel-' + currentScene);
        }
    }

    return {
        'setCurrentScene': setCurrentScene,
        'enterVR': enterVR,
        'turnOnAnimations': turnOnAnimations,
        'turnOffAnimations': turnOffAnimations,
        'enterMomentOfZen': enterMomentOfZen,
        'getNewVRSceneFromAudioPosition': getNewVRSceneFromAudioPosition,
        'changeVRScene': changeVRScene,
        'cancelAnimation': cancelAnimation
    }
})();