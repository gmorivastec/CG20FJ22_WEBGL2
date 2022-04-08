// we must create a scene in three.js in order to display something
const scene = new THREE.Scene();

// the camera
// perspective - 
// render volume - whatever falls inside will be shown
// frustum
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();

// setup renderer
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const cube = new THREE.BoxGeometry();
// hex - 0xRRGGBB
const material = new THREE.MeshBasicMaterial({ color: 0xff00ff });
const cubeObj = new THREE.Mesh(cube, material);

scene.add(cubeObj);

camera.position.z = 5;

function display() {

    requestAnimationFrame(display);

    cubeObj.rotation.x += 0.05;
    renderer.render(scene, camera);
}

display();