// if you use vscode - install extension live server

// HOW TO LOAD A PLAIN TEXT FILE
// (WITH THREE.JS)
const loader = new THREE.FileLoader();

// path_to_file, success_callback, progress_callback, error_callback 
loader.load(
    'pyramid.obj', 
    function(data){

        var lines = data.split('\n');
        for(let i = 0; i < lines.length; i++){
            console.log(lines[i]);
        }
        console.log(data);
    }, 
    function(progress){
        //
        console.log(progress);
    }, 
    function(e){
        console.error(e);
    }
    );

// we must create a scene in three.js in order to display something
const scene = new THREE.Scene();

// the camera
// perspective - 
// render volume - whatever falls inside will be shown
// frustum
const camera = new THREE.PerspectiveCamera(15, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 10);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();

// setup renderer
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// we are going to load a mesh from vertices
const vertices = new Float32Array([
    -1.0, -1.0, 1.0,
     1.0, -1.0, 1.0,
     1.0,  1.0, 1.0
]); 

const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
const material = new THREE.MeshBasicMaterial({ color: 0xFF00FF });
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);
renderer.render(scene, camera);