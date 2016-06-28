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
            $introModal.css('visibility', 'visible')
            VR.enterMomentOfZen();
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

    return {
        'requestFullscreen': requestFullscreen,
        'exitFullscreen': exitFullscreen,
        'readURL': readURL,
        'getParameterByName': getParameterByName
    }
})();