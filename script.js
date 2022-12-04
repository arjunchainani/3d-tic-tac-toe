// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xff33ff);

// Canvas
const canvas = document.querySelector('canvas.webgl');

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

// Texture
const loadingManager = new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader(loadingManager);

const colorTexture = textureLoader.load('/images/minecraft.png');
colorTexture.generateMinmaps = false;
colorTexture.minFilter = THREE.NearestFilter;
colorTexture.magFilter = THREE.NearestFilter;

// Cube
const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array([
    -10.0, -10.0, 0.0, 
    10.0, -10.0, 0.0,
    10.0, 10.0, 0.0,
])

const material = new THREE.MeshLambertMaterial( { color: 0xF78F13 } );
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 3;
scene.add(camera);

// Lighting
const spotlight = new THREE.SpotLight(0xfcff33);
spotlight.position.set(0, 130, 0);
spotlight.target.position.set(400, -130, 0);
scene.add(spotlight.target);
scene.add(spotlight);

// const ambient = new THREE.AmbientLight(0xffffff, 0.5);
// ambient.add(ambient);

// const light = new THREE.PointLight(0x03d3fc, 2.0, 0.5);
// scene.add(light);


// Render
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
});
renderer.setSize(sizes.width, sizes.height);

// Responsive
window.addEventListener('resize', function() {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
})

// Animation
function animate() {
    requestAnimationFrame(animate);

    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;
    sphere.rotation.z += 0.01;

    renderer.render(scene, camera);
}

animate();