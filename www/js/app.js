var onDocumentLoad = function(e) {
    initGraphic();
}

var initGraphic = function() {
    // Create scene and camera, set up basic lighting and positioning
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    setupLights(scene);
    camera.position.z = 25;

    // Add elements to an Object3D
    var groupObject = createObject3D();
    //scene.add(groupObject);

    var lineObject = addLine()
        .translateY(-4);
    scene.add(lineObject);

    //var shape = addShape();
    //scene.add(shape);

    // Init renderer and call render animations
    var renderer = initRenderer();
    render();

    function render() {
        requestAnimationFrame(render);
        //groupObject.rotation.x += 0.01;
        //groupObject.rotation.y += 0.01;

        //lineObject.rotation.x += 0.005;
        lineObject.rotation.y += 0.005;

        //shape.rotation.x += 0.005;
        //shape.rotation.y += 0.005;

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
    // Create an array of 3D vector coordinates
    var randomPoints = generateRandomLine(10, 12);
    var randomLine = getLineFromPoints(randomPoints, '#FF6347');
    lineObject.add(randomLine);

    var shapeArray = [
        [759.8,439.1],
        [762,446.4],
        [765.8,456.2],
        [771.1,465.5],
        [774.8,471.8],
        [779.7,477.3],
        [783.7,481],
        [785.3,484],
        [784.2,485.3],
        [783.4,486.5],
        [786.3,494],
        [789.2,496.9],
        [791.8,502.2],
        [795.3,508],
        [799.9,516.3],
        [801.2,523.9],
        [801.7,535.9],
        [802.3,537.6],
        [802,541],
        [799.5,542.3],
        [799.9,544.3],
        [799.2,546.2],
        [799.5,548.6],
        [800,550.6],
        [797.3,553.8],
        [794.2,555.3],
        [790.3,555.4],
        [788.9,557],
        [786.5,558],
        [785.2,557.5],
        [784,556.5],
        [783.7,553.6],
        [782.9,550.2],
        [779.5,545.1],
        [775.9,542.8],
        [772.1,542.5],
        [771.3,543.8],
        [768.2,539.4],
        [767.5,535.9],
        [765,531.8],
        [763.2,530.7],
        [761.6,532.8],
        [759.8,532.5],
        [757.7,527.4],
        [754.8,523.6],
        [751.9,518.2],
        [749.3,515.2],
        [745.7,511.4],
        [747.8,509],
        [751.1,503.5],
        [750.9,501.9],
        [746.4,500.9],
        [744.7,501.6],
        [745.1,502.2],
        [747.7,503.2],
        [746.2,507.7],
        [745.4,508.2],
        [743.6,504.2],
        [742.3,499.3],
        [742,496.6],
        [743.5,491.9],
        [743.5,482.3],
        [740.4,478.6],
        [739.1,475.6],
        [733.9,474.3],
        [732,473.6],
        [730.4,471],
        [727,469.4],
        [725.8,466],
        [723.1,465],
        [720.7,461.3],
        [716.5,459.9],
        [713.5,458.4],
        [711,458.4],
        [706.9,459.2],
        [706.8,461.2],
        [707.6,462.1],
        [707.1,463.3],
        [704,463.1],
        [700.3,466.7],
        [696.7,468.6],
        [692.9,468.6],
        [689.6,469.9],
        [689.3,467.1],
        [687.7,465.2],
        [684.8,464.1],
        [683.2,462.6],
        [675.1,458.7],
        [667.5,457],
        [663.1,457.6],
        [657.1,458.1],
        [651.1,460.2],
        [647.7,460.8],
        [647.4,452.8],
        [644.8,450.8],
        [643.1,449],
        [643.4,446],
        [653.6,444.7],
        [679.1,441.8],
        [685.9,441.1],
        [691.3,441.4],
        [693.9,445.3],
        [695.4,446.7],
        [703.5,447.2],
        [714.3,446.6],
        [735.8,445.3],
        [741.3,444.6],
        [746.4,444.8],
        [746.8,447.7],
        [749,448.6],
        [749.3,443.9],
        [747.7,439.8],
        [749,438.3],
        [754.6,438.8],
        [759.8,439.1]
    ];
    var dcPoints = getPointsFrom2DArray(shapeArray, 10);
    var dcLine = getLineFromPoints(dcPoints, '#ffcc66');
    lineObject.add(dcLine);

    return lineObject;
};

var getLineFromPoints = function(points, color) {
    // More subdivisions means a smoother curve
    var subdivisions = 20;

    var spline = new THREE.Spline(points);
    var geometrySpline = new THREE.Geometry();

    for (var i=0; i< points.length * subdivisions; i++) {
        var index = i / (points.length * subdivisions);
        var position = spline.getPoint(index);

        geometrySpline.vertices[i] = new THREE.Vector3(position.x, position.y, position.z);
    }

    geometrySpline.computeLineDistances();

    var object = new THREE.Line(geometrySpline, new THREE.LineDashedMaterial({
        color: color,
        dashSize: 0.3,
        gapSize: 0.15,
        linewidth: 2
    }));

    return object;
};

var getPointsFrom2DArray = function(shapeArray, size) {
    var points = [];

    // Create d3 scales
    var xExtent = d3.extent(shapeArray, function(d) { return d[0]; }),
        yExtent = d3.extent(shapeArray, function(d) { return d[1]; }),
        heightRatio = (yExtent[1]-yExtent[0]) / (xExtent[1]-xExtent[0]);

    var xScale = d3.scale.linear()
        .domain(xExtent)
        .range([-size/2, size/2]);

    var yScale = d3.scale.linear()
        .domain(yExtent)
        .range([heightRatio * size/2, -heightRatio * size/2]);

    for (var i=0; i<shapeArray.length; i++) {
        var point = shapeArray[i];
        var randomZ = Math.random() * 10;
        var pointVector = new THREE.Vector3(xScale(point[0]), yScale(point[1]), 10);
        points.push(pointVector);
    }

    return points;
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
