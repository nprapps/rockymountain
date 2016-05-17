var onDocumentLoad = function(e) {
    initGraphic();
}

var initGraphic = function() {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    $('body').append(renderer.domElement);

    var geometry = new THREE.BoxGeometry(1,1,1);
    var material = new THREE.MeshPhongMaterial({ color: 0x40E0D0 });
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    var light = new THREE.AmbientLight('#999');
    scene.add(light);

    var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(-2, 3, 10);
    scene.add(directionalLight);

    camera.position.z = 5;

    function render() {
        requestAnimationFrame(render);

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        renderer.render(scene, camera);
    }

    render();
};

$(onDocumentLoad);
