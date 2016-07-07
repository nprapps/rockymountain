var UTILS = (function() {
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

        $fullscreen.find('.fullscreen-button').removeClass().addClass('fullscreen-button enabled');
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

        $fullscreen.find('.fullscreen-button').removeClass().addClass('fullscreen-button disabled');
    }

    var readURL = function() {
        var scene = UTILS.getParameterByName('scene', window.location.href);

        if (scene) {
            currentScene = scene;
            $scene = $('#' + currentScene);
            $sceneTitle.html($scene.data('name'));
            $introModal.css('visibility', 'visible')

            // specifically load the image we need
            for (var i = 0; i < assets.children.length; i++) {
                var $img = $(assets.children[i]);
                var imgID = $img.attr('id');
                if (imgID === 'image-' + currentScene) {
                    $img.on('load', VR.enterMomentOfZen);
                    $img.attr('src', $img.data('src'));
                }
            }

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

    var resetState = function() {
        animate = false;
        inVR = false;
        endedAudioInVR = false;
    }

    var detectBrowser = function() {
        if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
            $('html').addClass('safari');
            isSafari = true;
        }

        if(navigator.userAgent.indexOf('MSIE')!==-1
        || navigator.appVersion.indexOf('Trident/') > 0){
            $('html').addClass('ie');
        }
    }

    return {
        'requestFullscreen': requestFullscreen,
        'exitFullscreen': exitFullscreen,
        'readURL': readURL,
        'getParameterByName': getParameterByName,
        'resetState': resetState,
        'detectBrowser': detectBrowser
    }
})();