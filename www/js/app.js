var onDocumentLoad = function(e) {
    initGraphic();
}

var initGraphic = function() {
    // Create scene and camera, set up basic lighting and positioning
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    setupLights(scene);
    camera.position.z = 50;

    // Add elements to an Object3D
    //var groupObject = createObject3D();
    //scene.add(groupObject);

    var lineObject = addLine();
    scene.add(lineObject);

    // Init renderer and call render animations
    var renderer = initRenderer();
    render();

    function render() {
        requestAnimationFrame(render);
        //groupObject.rotation.x += 0.01;
        //groupObject.rotation.y += 0.01;
        lineObject.rotation.x += 0.005;
        //lineObject.rotation.y += 0.005;
        renderer.render(scene, camera);
    }
};

var initRenderer = function() {
    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    $('body').append(renderer.domElement);

    return renderer;
};

var setupLights = function(scene) {
    var light = new THREE.AmbientLight('#999');
    scene.add(light);

    var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(-2, 3, 10);
    scene.add(directionalLight);
};

var addLine = function() {
    // Create an Object3D for the line to be in
    var lineObject = new THREE.Object3D();

    // Set up spline
    var subdivisions = 20;
    //var points = hilbert3D(
        //new THREE.Vector3(0,0,0),
        //20,
        //recursion,
        //0, 1, 2, 3, 4, 5, 6, 7
    //);

    var points = generateRandomLine(30, 12);
    console.log(points);

    var spline = new THREE.Spline(points);
    var geometrySpline = new THREE.Geometry();

    for (var i=0; i< points.length * subdivisions; i++) {
        var index = i / (points.length * subdivisions);
        var position = spline.getPoint(index);

        geometrySpline.vertices[i] = new THREE.Vector3(position.x, position.y, position.z);
    }

    geometrySpline.computeLineDistances();

    var object = new THREE.Line(geometrySpline, new THREE.LineBasicMaterial({
        color: '#FF6347',
        //dashSize: 0.5,
        //gapSize: 0.25,
        linewidth: 2
    }));

    lineObject.add(object);
    return lineObject;
};

var generateRandomLine = function(size, numPoints) {
    var points = [];
    for (var i=0; i<numPoints; i++) {
        var randomX = Math.random() * size;
        var randomY = Math.random() * size;
        var randomZ = Math.random() * size;
        var pointVector = new THREE.Vector3(randomX, randomY, randomZ);
        points.push(pointVector);
    }

    return points;
};

var createObject3D = function() {
    // Add elements to an Object3D (like a group)
    var groupObject = new THREE.Object3D();

    // Add a cube
    var boxGeo = new THREE.BoxGeometry(10,10,10);
    var boxMaterial = new THREE.MeshPhongMaterial({ color: 0x40E0D0 });
    var cube = new THREE.Mesh(boxGeo, boxMaterial)
        .translateX(-10);
    groupObject.add(cube);

    // Add a plane
    var planeGeo = new THREE.PlaneGeometry(20, 10, 10);
    var planeMaterial = new THREE.MeshPhongMaterial({ color: '#cc00cc' });
    var plane = new THREE.Mesh(planeGeo, planeMaterial)
        .translateX(10);
    groupObject.add(plane);

    return groupObject;
};

$(onDocumentLoad);
