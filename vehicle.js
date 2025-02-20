import * as CANNON from 'cannon-es';

import * as THREE from 'three'

import CannonDebugger from 'cannon-es-debugger';

import {
    GLTFLoader
} from 'three/examples/jsm/loaders/GLTFLoader.js';

import {
    OrbitControls
} from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(75, aspect, 1, 1000);
const sceneCamera = new THREE.PerspectiveCamera(100, aspect, 1, 1000);
sceneCamera.position.set(0, 30, 0);




const light = new THREE.AmbientLight(0xffffff, 1.0);
scene.add(light);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);


const clock = new THREE.Clock();
window.addEventListener('resize', () => onWindowResize(), false);

function animatescene() {
    renderer.setAnimationLoop(animatescene);
    render();
    controls.update();

}

function render() {
    renderer.render(scene, camera);

}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

animatescene();


const world = new CANNON.World({
    gravity: new CANNON.Vec3(0, -200, 0),
});

const groundBody = new CANNON.Body({
    type: CANNON.Body.STATIC,
    shape: new CANNON.Plane(),
});

const cannonDebugger = new CannonDebugger(scene, world);


groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
world.addBody(groundBody);

const carBody = new CANNON.Body({
    mass: 5,
    position: new CANNON.Vec3(0, 6, 0),
    shape: new CANNON.Box(new CANNON.Vec3(4, 0.5, 2)),
});

const vehicle = new CANNON.RigidVehicle({
    chassisBody: carBody,
});

const mass = 1;
const axisWidth = 5;
const wheelShape = new CANNON.Sphere(1);
const wheelMaterial = new CANNON.Material('wheel');
const down = new CANNON.Vec3(0, -1, 0);

const wheelBody1 = new CANNON.Body({ mass, material: wheelMaterial });
wheelBody1.addShape(wheelShape);
wheelBody1.angularDamping = 0.4;
vehicle.addWheel({
    body: wheelBody1,
    position: new CANNON.Vec3(-2, 0, axisWidth / 2),
    axis: new CANNON.Vec3(0, 0, 1),
    direction: down,
});

const wheelBody2 = new CANNON.Body({ mass, material: wheelMaterial });
wheelBody2.addShape(wheelShape);
wheelBody2.angularDamping = 0.4;
vehicle.addWheel({
    body: wheelBody2,
    position: new CANNON.Vec3(-2, 0, -axisWidth / 2),
    axis: new CANNON.Vec3(0, 0, 1),
    direction: down,
});

const wheelBody3 = new CANNON.Body({ mass, material: wheelMaterial });
wheelBody3.addShape(wheelShape);
wheelBody3.angularDamping = 0.4;
vehicle.addWheel({
    body: wheelBody3,
    position: new CANNON.Vec3(2, 0, axisWidth / 2),
    axis: new CANNON.Vec3(0, 0, 1),
    direction: down,
});

const wheelBody4 = new CANNON.Body({ mass, material: wheelMaterial });
wheelBody4.addShape(wheelShape);
wheelBody4.angularDamping = 0.4;
vehicle.addWheel({
    body: wheelBody4,
    position: new CANNON.Vec3(2, 0, -axisWidth / 2),
    axis: new CANNON.Vec3(0, 0, 1),
    direction: down,
});




document.addEventListener('keydown', (event) => {
    const maxSteerVal = Math.PI / 4;
    const maxForce = 10;

    switch (event.key) {
        case 'z':
        case 'ArrowUp':
            vehicle.setWheelForce(maxForce * 15, 0);
            vehicle.setWheelForce(maxForce * 15, 1);
            break;

        case 's':
        case 'ArrowDown':
            vehicle.setWheelForce(-maxForce * 10, 0);
            vehicle.setWheelForce(-maxForce * 10, 1);
            break;

        case 'q':
        case 'ArrowLeft':
            vehicle.setSteeringValue(maxSteerVal, 0);
            vehicle.setSteeringValue(maxSteerVal, 1);
            break;

        case 'd':
        case 'ArrowRight':
            vehicle.setSteeringValue(-maxSteerVal, 0);
            vehicle.setSteeringValue(-maxSteerVal, 1);
            break;
    }
});

document.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'z':
        case 'ArrowUp':
            vehicle.setWheelForce(0, 0);
            vehicle.setWheelForce(0, 1);
            break;

        case 's':
        case 'ArrowDown':
            vehicle.setWheelForce(0, 0);
            vehicle.setWheelForce(0, 1);
            break;

        case 'q':
        case 'ArrowLeft':
            vehicle.setSteeringValue(0, 0);
            vehicle.setSteeringValue(0, 1);
            break;

        case 'd':
        case 'ArrowRight':
            vehicle.setSteeringValue(0, 0);
            vehicle.setSteeringValue(0, 1);
            break;
    }
});


const boxGeometry = new THREE.BoxGeometry(8, 1, 4);
const boxMaterial = new THREE.MeshNormalMaterial();
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(boxMesh);

const sphereGeometry1 = new THREE.SphereGeometry(1);
const sphereMaterial1 = new THREE.MeshNormalMaterial();
const sphereMesh1 = new THREE.Mesh(sphereGeometry1, sphereMaterial1);
scene.add(sphereMesh1);

const sphereGeometry2 = new THREE.SphereGeometry(1);
const sphereMaterial2 = new THREE.MeshNormalMaterial();
const sphereMesh2 = new THREE.Mesh(sphereGeometry2, sphereMaterial2);
scene.add(sphereMesh2);

const sphereGeometry3 = new THREE.SphereGeometry(1);
const sphereMaterial3 = new THREE.MeshNormalMaterial();
const sphereMesh3 = new THREE.Mesh(sphereGeometry3, sphereMaterial3);
scene.add(sphereMesh3);

const sphereGeometry4 = new THREE.SphereGeometry(1);
const sphereMaterial4 = new THREE.MeshNormalMaterial();
const sphereMesh4 = new THREE.Mesh(sphereGeometry4, sphereMaterial4);
scene.add(sphereMesh4);


const loader = new GLTFLoader();
const loader2 = new GLTFLoader();


let car;
let map;



loader.load(
    'assets/models/mario_kart.glb',
    function (gltf) {
        car = gltf.scene;

        scene.add(car);

        car.children[0].rotateY(-Math.PI / 2);
        console.log(car.children[0])

        gltf.animations;
        gltf.scene;
        gltf.scenes;
        gltf.asset;

    },
    function (xhr) {

        console.log((xhr.loaded / xhr.total * 100) + '% loaded');

    },
    function (error) {

        console.log('An error happened');

    }
);



loader2.load(
    'assets/models/mario_kart_circuit.glb',
    function (gltf) {
        map = gltf.scene;
        scene.add(map);

        const array = gltf.scene.children[0].children[0].children;

        array.forEach(element => {
            // console.log("je suis dans la boucleeeeeeeeeeeeeeeeeee");
            const geometry = element.geometry;
            const vertices = geometry.attributes.position.array;
            const indices = geometry.index.array;
            const scale = 15;
            for (let i = 0; i < vertices.length; i++) {
                vertices[i] *= scale;
            }

            const shape = new CANNON.Trimesh(vertices, indices);

            const groundBody = new CANNON.Body({
                type: CANNON.Body.AWAKE,
                mass: 0, // Static body
                shape: shape,
            });



            groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);

            world.addBody(groundBody);
        });

        map.visible = true;

    },
    function (xhr) {

        console.log((xhr.loaded / xhr.total * 100) + '% loaded');

    },
    function (error) {

        console.log('An error happened oui');

    }
);

vehicle.addToWorld(world);



boxMesh.visible = false;
sphereMesh1.visible = false;
sphereMesh2.visible = false;
sphereMesh3.visible = false;
sphereMesh4.visible = false;


const offset = new CANNON.Vec3(10, 0, 0);

boxMesh.add(camera);
boxMesh.add(sceneCamera);
sceneCamera.lookAt(boxMesh.position);
sceneCamera.position.copy(carBody.position.vadd(new CANNON.Vec3(-10, 0, 0)));
camera.lookAt(boxMesh.position);
camera.position.copy(carBody.position.vadd(offset));



// son 

const listener = new THREE.AudioListener();
camera.add(listener);

const sound = new THREE.Audio(listener);


function initAudio() {
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load('sounds/circuit.mp3', function (buffer) {
        sound.setBuffer(buffer);
        sound.setLoop(true);
        sound.setVolume(0.5);
        sound.play();
    });
}


window.addEventListener('click', initAudio, { once: true });
window.addEventListener('keydown', initAudio, { once: true });


const animate = () => {
    world.fixedStep();
    cannonDebugger.update();


    if (map) {
        map.visible = true;
    } else {
        console.log("Map is not defined");
    }


    if (car) {
        car.position.copy(carBody.position).add(new CANNON.Vec3(0, -1, 0));
        car.quaternion.copy(carBody.quaternion);
    }



    boxMesh.position.copy(carBody.position);
    boxMesh.quaternion.copy(carBody.quaternion);
    sphereMesh1.position.copy(wheelBody1.position);
    sphereMesh1.quaternion.copy(wheelBody1.quaternion);
    sphereMesh2.position.copy(wheelBody2.position);
    sphereMesh2.quaternion.copy(wheelBody2.quaternion);
    sphereMesh3.position.copy(wheelBody3.position);
    sphereMesh3.quaternion.copy(wheelBody3.quaternion);
    sphereMesh4.position.copy(wheelBody4.position);
    sphereMesh4.quaternion.copy(wheelBody4.quaternion);



    camera.lookAt(boxMesh.position);

    renderer.render(scene, camera);

    window.requestAnimationFrame(animate);

};
animate();


