// if you use vscode - install extension live server

// HOW TO LOAD A PLAIN TEXT FILE
// (WITH THREE.JS)
const loader = new THREE.FileLoader();

// path_to_file, success_callback, progress_callback, error_callback 
loader.load(
    'pyramid.obj', 
    function(data){

        // I need a place to store my vertices 
        // we are going to fill this up with the 'v's
        var verticesSource = [];

        // We are going to need the actual vertices to be processed
        // We are going to fill this up with the 'f's
        var processedVertices = [];

        var lines = data.split('\n');

        // looping through the lines 
        for(let i = 0; i < lines.length; i++){
            
            var currentLine = lines[i].split(' ');
            
            if(currentLine[0] == "v"){
                
                verticesSource.push(new Array(currentLine[2], currentLine[4], currentLine[6]));
            }

            if(currentLine[0] == "f"){
                console.log(currentLine);

                for(let j = 2; j <= 6; j += 2){

                    // retrieve the current vertex in the current face
                    var currentVertex = verticesSource[currentLine[j] - 1];
                    
                    currentVertex.forEach(element => {
                        processedVertices.push(element);
                    });
                }
            }
        }

        console.log(verticesSource);
        console.log(processedVertices);

        // we must create a scene in three.js in order to display something
        const scene = new THREE.Scene();

        // the camera
        // perspective - 
        // render volume - whatever falls inside will be shown
        // frustum
        const camera = new THREE.PerspectiveCamera(15, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(10, -10, 10);
        camera.lookAt(0, 0, 0);

        const renderer = new THREE.WebGLRenderer();

        // setup renderer
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        // we are going to load a mesh from vertices
        const vertices = new Float32Array(processedVertices); 

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        const material = new THREE.MeshBasicMaterial({ color: 0xFF00FF });
        const mesh = new THREE.Mesh(geometry, material);

        scene.add(mesh);
        renderer.render(scene, camera);
    }, 
    function(progress){
        //
        // console.log(progress);
    }, 
    function(e){
        console.error(e);
    }
    );

