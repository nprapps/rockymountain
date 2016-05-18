var onDocumentLoad = function(e) {
    initGraphic();
}

var initGraphic = function() {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    $('body').append(renderer.domElement);

    var groupObject = createObject3D();
    scene.add(groupObject);

    var light = new THREE.AmbientLight('#999');
    scene.add(light);

    var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(-2, 3, 10);
    scene.add(directionalLight);

    camera.position.z = 5;

    function render() {
        requestAnimationFrame(render);

        groupObject.rotation.x += 0.01;
        groupObject.rotation.y += 0.01;

        renderer.render(scene, camera);
    }

    render();
};

var createObject3D = function() {
    // Add elements to an Object3D (like a group)
    var groupObject = new THREE.Object3D();

    // Add a cube
    var boxGeo = new THREE.BoxGeometry(1,1,1);
    var boxMaterial = new THREE.MeshPhongMaterial({ color: 0x40E0D0 });
    var cube = new THREE.Mesh(boxGeo, boxMaterial)
        .translateX(-1);
    groupObject.add(cube);

    // Add a plane
    var planeGeo = new THREE.PlaneGeometry(2, 1, 1);
    var planeMaterial = new THREE.MeshPhongMaterial({ color: '#cc00cc' });
    var plane = new THREE.Mesh(planeGeo, planeMaterial)
        .translateX(1);
    groupObject.add(plane);

    return groupObject;
};

$(onDocumentLoad);
