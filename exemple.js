
import * as THREE from 'three';
import * as CANNON from 'cannon-es';

let scene, camera, renderer, world;

function init() {
    // Scene setup
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Physics world setup
    world = new CANNON.World();
    world.gravity.set(0, -10, 0);

    // Create a car chassis
    const chassisShape = new CANNON.Box(new CANNON.Vec3(2, 0.5, 1));
    const chassisBody = new CANNON.Body({ mass: 150 });
    chassisBody.addShape(chassisShape);
    chassisBody.position.set(0, 4, 0);
    world.addBody(chassisBody);

    // Three.js visual representation of the chassis
    const geometry = new THREE.BoxGeometry(4, 1, 2);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Ground
    const groundBody = new CANNON.Body({ mass: 0 });
    const groundShape = new CANNON.Plane();
    groundBody.addShape(groundShape);
    groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
    world.addBody(groundBody);

    const groundMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(100, 100),
        new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
    );
    groundMesh.rotation.x = -Math.PI / 2;
    scene.add(groundMesh);

    camera.position.z = 10;
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    world.step(1 / 60);
    renderer.render(scene, camera);
}

window.onload = init;

