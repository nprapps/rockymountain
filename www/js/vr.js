var VR = (function() {
    var setCurrentScene = function(index) {
        currentScene = $scenes.eq(index).attr('id');
    }

    var enterVR = function() {
        scene.enterVR();
    }

    var exitVR = function() {
        scene.exitVR();
    }

    var turnOnAnimations = function() {
        camera.setAttribute('drag-look-controls', 'enabled', 'false');
        camera.setAttribute('rotation', '0 0 0');
        camera.setAttribute('position', '0 0 0');
        animate = true;
    }

    var turnOffAnimations = function() {
        camera.setAttribute('drag-look-controls', 'enabled', 'true');
        // ensure we can click and drag
        camera.play();
        animate = false;
    }

    var enterMomentOfZen = function() {
        var newURL = APP_CONFIG.S3_BASE_URL + '/?scene=' + currentScene;
        history.replaceState(null, null, newURL);

        turnOffAnimations();
        changeVRScene();
        UI.updateSceneData();
        UI.navigateToVR();
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
        $scenes.find('.sky, .instructions, .vr-annotation').attr('visible', 'false');
        $scene.find('.sky').attr('visible', 'true');

        if (inVR) {
            $scene.find('.vr-annotation').attr('visible', 'true');
        }

        camera.setAttribute('camera', 'fov', $scene.data('fov'));

        if (animate) {
            cancelAnimation();
            camera.emit('enter-' + currentScene);
        }
    }

    var cancelAnimation = function() {
        if (animate) {
            camera.emit('cancel');
        }
    }

    var navigateToEndScene = function() {
        $scenes.find('.sky').attr('visible', 'false');
        $scenes.find('.vr-annotation').attr('visible', 'false');
        $('.end-scene').find('a-image').attr('visible', 'true');
        $('.end-sky').attr('visible', 'true');
        endedAudioInVR = true;
    }

    var loadImages = function() {
        for (var i = 0; i < assets.children.length; i++) {
            var $img = $(assets.children[i]);
            var src = $img.data('src');
            $img.attr('src', src);
        }
    }

    return {
        'setCurrentScene': setCurrentScene,
        'enterVR': enterVR,
        'exitVR': exitVR,
        'turnOnAnimations': turnOnAnimations,
        'turnOffAnimations': turnOffAnimations,
        'enterMomentOfZen': enterMomentOfZen,
        'getNewVRSceneFromAudioPosition': getNewVRSceneFromAudioPosition,
        'changeVRScene': changeVRScene,
        'cancelAnimation': cancelAnimation,
        'navigateToEndScene': navigateToEndScene,
        'loadImages': loadImages
    }
})();