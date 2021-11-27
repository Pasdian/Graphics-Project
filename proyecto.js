import * as THREE from "../libs/three.js/r131/three.module.js";
import { OrbitControls } from "../libs/three.js/r131/controls/OrbitControls.js";
import { OBJLoader } from "../libs/three.js/r131/loaders/OBJLoader.js";
import { MTLLoader } from "../libs/three.js/r131/loaders/MTLLoader.js";

let renderer = null,
  scene = null,
  camera = null,
  group = null,
  objectList = [],
  orbitControls = null;

let duration = 20000; // ms
let currentTime = Date.now();

let directionalLight = null,
  spotLight = null,
  ambientLight = null,
  pointLight = null,
  pointLight2 = null,
  pointLight3 = null;

let mapUrl = "../imagenes/checker_large.gif";

let SHADOW_MAP_WIDTH = 4096,
  SHADOW_MAP_HEIGHT = 4096;

let objTardis = {
  obj: "../3dModels/Tardis.obj",
  mtl: "../3dModels/Tardis.mtl",
};
let objDelorean = {
  obj: "../3dModels/car/Vazz.obj",
  mtl: "../3dModels/car/Vazz.mtl",
};
let objRing = { obj: "../3dModels/ring.obj", mtl: "../3dModels/ring.mtl" };

let objLightSaber = {
  obj: "../3dModels/3d-model.obj",
  mtl: "../3dModels/3d-model.mtl",
};
let objHammer = {
  obj: "../3dModels/mjolnirOBJ.obj",
  mtl: "../3dModels/mjolnirOBJ.mtl",
};
let objBox = { obj: "../3dModels/aqua.obj", mtl: "../3dModels/aqua.obj" };

let objBike = {
  obj: "../3dModels/Tron/bike.obj",
  mtl: "../3dModels/Tron/bike.mtl",
};
let objRoom = {
  obj: "../3dModels/Room/OBJ/Room.obj",
  mtl: "../3dModels/Room/OBJ/Room.mtl",
};
let objLight = {
  obj: "../3dModels/light/Pinch_125_wishnya.obj",
  mtl: "../3dModels/light/Pinch_125_wishnya.mtl",
};

let objImperial = {
  obj: "../3dModels/Imperial/starWars.obj",
  mtl: "../3dModels/Imperial/starWars.mtl",
};

const root = [];
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const listener = new THREE.AudioListener();

function main() {
  const canvas = document.getElementById("webglcanvas");

  createScene(canvas);

  initControls();

  update();
}

function onError(err) {
  console.error(err);
}

function onProgress(xhr) {
  if (xhr.lengthComputable) {
    const percentComplete = (xhr.loaded / xhr.total) * 100;
    console.log(
      xhr.target.responseURL,
      Math.round(percentComplete, 2) + "% downloaded"
    );
  }
}

async function loadObjTardis(objModelUrl, objectList) {
  try {
    const mtlLoader = new MTLLoader();

    const materials = await mtlLoader.loadAsync(
      objModelUrl.mtl,
      onProgress,
      onError
    );

    materials.preload();

    const objLoader = new OBJLoader();

    objLoader.setMaterials(materials);

    const object = await objLoader.loadAsync(
      objModelUrl.obj,
      onProgress,
      onError
    );

    object.traverse(function (child) {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    object.position.y += 1;
    object.position.x += -3;
    object.scale.set(0.15, 0.15, 0.15);

    objectList.push(object);
    object.name = "tardis"
    root.push(object);
    scene.add(object);
  } catch (err) {
    onError(err);
  }
}

async function loadObjDelorean(objModelUrl, objectList) {
  try {
    const mtlLoader = new MTLLoader();

    const materials = await mtlLoader.loadAsync(
      objModelUrl.mtl,
      onProgress,
      onError
    );

    materials.preload();

    const objLoader = new OBJLoader();

    objLoader.setMaterials(materials);

    const object = await objLoader.loadAsync(
      objModelUrl.obj,
      onProgress,
      onError
    );

    object.traverse(function (child) {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    object.position.y += 0;
    object.position.x += -3.3;
    object.position.z += -1.5;
    object.scale.set(0.005, 0.005, 0.005);

    objectList.push(object);
    object.name = "delorean"
    root.push(object);
    scene.add(object);
  } catch (err) {
    onError(err);
  }
}

async function loadObjRing(objModelUrl, objectList) {
  try {
    const mtlLoader = new MTLLoader();

    const materials = await mtlLoader.loadAsync(
      objModelUrl.mtl,
      onProgress,
      onError
    );

    materials.preload();

    const objLoader = new OBJLoader();

    objLoader.setMaterials(materials);

    const object = await objLoader.loadAsync(
      objModelUrl.obj,
      onProgress,
      onError
    );

    object.traverse(function (child) {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    object.position.y += 1.38;
    object.position.x += -1;
    object.position.z += -0.5;
    object.scale.set(0.2, 0.2, 0.2);

    objectList.push(object);
    object.name = "ring"
    root.push(object);
    scene.add(object);
  } catch (err) {
    onError(err);
  }
}

async function loadObjLight(objModelUrl, objectList) {
  try {
    const mtlLoader = new MTLLoader();

    const materials = await mtlLoader.loadAsync(
      objModelUrl.mtl,
      onProgress,
      onError
    );

    materials.preload();

    const objLoader = new OBJLoader();

    objLoader.setMaterials(materials);

    const object = await objLoader.loadAsync(
      objModelUrl.obj,
      onProgress,
      onError
    );

    object.traverse(function (child) {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    object.position.x += -2;
    object.position.y += 1.15;
    object.position.z += -3.5;
    object.scale.set(0.003, 0.003, 0.003);

    objectList.push(object);
    object.name = "lightsaber"
    root.push(object);
    scene.add(object);
  } catch (err) {
    onError(err);
  }
}

async function loadObjHammer(objModelUrl, objectList) {
  try {
    const mtlLoader = new MTLLoader();

    const materials = await mtlLoader.loadAsync(
      objModelUrl.mtl,
      onProgress,
      onError
    );

    materials.preload();

    const objLoader = new OBJLoader();

    objLoader.setMaterials(materials);

    const object = await objLoader.loadAsync(
      objModelUrl.obj,
      onProgress,
      onError
    );

    object.traverse(function (child) {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    object.position.x += 3.6;
    object.position.y += 1.4;
    object.position.z += 3;
    object.rotation.x = -3;
    object.scale.set(3.01, 3.01, 3.01);

    objectList.push(object);
    object.name = "hammer"
    root.push(object);
    scene.add(object);
  } catch (err) {
    onError(err);
  }
}

async function loadObjBox(objModelUrl, objectList) {
  try {
    const mtlLoader = new MTLLoader();

    const materials = await mtlLoader.loadAsync(
      objModelUrl.mtl,
      onProgress,
      onError
    );

    materials.preload();

    const objLoader = new OBJLoader();

    objLoader.setMaterials(materials);

    const object = await objLoader.loadAsync(
      objModelUrl.obj,
      onProgress,
      onError
    );

    object.traverse(function (child) {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    object.position.x += 3.4;
    object.position.z += -3.8;
    object.position.y += 4;
    object.rotation.x = 1.65;
    object.scale.set(0.7, 0.7, 0.7);

    objectList.push(object);
    object.name = "trident"
    root.push(object);
    scene.add(object);
  } catch (err) {
    onError(err);
  }
}

async function loadObjBike(objModelUrl, objectList) {
  try {
    const mtlLoader = new MTLLoader();

    const materials = await mtlLoader.loadAsync(
      objModelUrl.mtl,
      onProgress,
      onError
    );

    materials.preload();

    const objLoader = new OBJLoader();

    objLoader.setMaterials(materials);

    const object = await objLoader.loadAsync(
      objModelUrl.obj,
      onProgress,
      onError
    );

    object.traverse(function (child) {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    object.position.x += 1.8;
    object.position.y += 1.25;
    object.position.z += -3.5;
    object.rotation.y = 1.4;
    object.scale.set(0.1, 0.1, 0.1);

    objectList.push(object);
    object.name = "tron"
    root.push(object);
    scene.add(object);
  } catch (err) {
    onError(err);
  }
}

async function loadRoom(objModelUrl, objectList) {
  try {
    const mtlLoader = new MTLLoader();

    const materials = await mtlLoader.loadAsync(
      objModelUrl.mtl,
      onProgress,
      onError
    );

    materials.preload();

    const objLoader = new OBJLoader();

    objLoader.setMaterials(materials);

    const object = await objLoader.loadAsync(
      objModelUrl.obj,
      onProgress,
      onError
    );

    object.traverse(function (child) {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    object.position.set(0, 0, 0);
    object.scale.set(1.0, 1.0, 1.0);
    object.name = "room"
    objectList.push(object);
    scene.add(object);
  } catch (err) {
    onError(err);
  }
}

async function loadObjLightBulb(objModelUrl, objectList) {
  try {
    const mtlLoader = new MTLLoader();

    const materials = await mtlLoader.loadAsync(
      objModelUrl.mtl,
      onProgress,
      onError
    );

    materials.preload();

    const objLoader = new OBJLoader();

    objLoader.setMaterials(materials);

    const object = await objLoader.loadAsync(
      objModelUrl.obj,
      onProgress,
      onError
    );

    object.traverse(function (child) {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    object.position.set(0, 5, 0);
    object.scale.set(0.001, 0.001, 0.001);

    objectList.push(object);
    object.name = "lightbulb"
    root.push(object);
    scene.add(object);
  } catch (err) {
    onError(err);
  }
}

async function loadObjImperial(objModelUrl, objectList) {
  try {
    const mtlLoader = new MTLLoader();

    const materials = await mtlLoader.loadAsync(
      objModelUrl.mtl,
      onProgress,
      onError
    );

    materials.preload();

    const objLoader = new OBJLoader();

    objLoader.setMaterials(materials);

    const object = await objLoader.loadAsync(
      objModelUrl.obj,
      onProgress,
      onError
    );

    object.traverse(function (child) {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    object.position.set(1, 4, 1);
    object.scale.set(0.1, 0.1, 0.1);

    objectList.push(object);

    scene.add(object);
    object.name = "tieFighter"
    root.push(object);
  } catch (err) {
    onError(err);
  }
}

function initControls() {
  document
    .querySelector("#directionalLight")
    .addEventListener("change", (event) => {
      directionalLight.color.set(event.target.value);
    });
  document
    .querySelector("#directionalLight")
    .addEventListener("input", (event) => {
      directionalLight.color.set(event.target.value);
    });
  document.querySelector("#spotLight").addEventListener("change", (event) => {
    spotLight.color.set(event.target.value);
  });
  document.querySelector("#spotLight").addEventListener("input", (event) => {
    spotLight.color.set(event.target.value);
  });
  document
    .querySelector("#ambientLight")
    .addEventListener("change", (event) => {
      ambientLight.color.set(event.target.value);
    });
  document.querySelector("#ambientLight").addEventListener("input", (event) => {
    ambientLight.color.set(event.target.value);
  });
  window.addEventListener("pointerdown", onMouseDown, false);
}

function animate() {
  let now = Date.now();
  let deltat = now - currentTime;
  currentTime = now;
}

function update() {
  requestAnimationFrame(function () {
    update();
  });

  // Render the scene
  renderer.render(scene, camera);

  // Spin the cube for next frame
  animate();

  // Update the camera controller
  orbitControls.update();
}

function onMouseDown(event) {
  mouse.x = (event.clientX / 1920) * 2 - 1;
  mouse.y = -(event.clientY / 1080) * 2 + 1;
  console.log("Mouse Down");

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(root, true);
  console.log(intersects);
  console.log(root);


/*
    for (let i = 0; i < root.length-1; i++) {
    if (raycaster.intersectObject(root[i]) != null) {
      console.log[root[1]]
      console.log("Specific object pressed")
      console.log(root)
      console.log(i)
      
      
    }
    
    
  }
 /*  var intersects = raycaster.intersectObjects(root, true);
  console.log("Intersects Children");
  console.log(intersects);
  console.log("INTERSECTS");
  console.log(intersects.length);

  if (intersects.length > 0){
    console.log("Console")
  } */
}

function createScene(canvas) {
  // Create the Three.js renderer and attach it to our canvas
  renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });

  // Set the viewport size
  renderer.setSize(canvas.width, canvas.height);

  // Turn on shadows
  renderer.shadowMap.enabled = true;

  // Options are THREE.BasicShadowMap, THREE.PCFShadowMap, PCFSoftShadowMap
  renderer.shadowMap.type = THREE.BasicShadowMap;

  // Create a new Three.js scene
  scene = new THREE.Scene();

  // Add  a camera so we can view the scene
  camera = new THREE.PerspectiveCamera(
    15,
    canvas.width / canvas.height,
    1,
    4000
  );
  camera.position.set(-2, 6, 12);
  camera.add(listener);
  const sound = new THREE.Audio( listener );
  const audioLoader = new THREE.AudioLoader();
  audioLoader.load( "/assets/Sounds/music2.mp3", function( buffer ) {
    sound.setBuffer( buffer );
    sound.setLoop( true );
    sound.setVolume( 0.5 );
    sound.play();
  });


  orbitControls = new OrbitControls(camera, renderer.domElement);

  pointLight = new THREE.PointLight(0xffffff, .6, 100);
  pointLight2 = new THREE.PointLight(0xffffff, .6, 100);
  pointLight3 = new THREE.PointLight(0xffffff, .6, 100);

  pointLight.position.set(0, 4, 3);
  pointLight2.position.set(0, 4, 0);
  pointLight3.position.set(0, 4, -3);

  pointLight.shadow.mapSize.width = SHADOW_MAP_WIDTH;
  pointLight.shadow.mapSize.height = SHADOW_MAP_HEIGHT;

  pointLight2.shadow.mapSize.width = SHADOW_MAP_WIDTH;
  pointLight2.shadow.mapSize.height = SHADOW_MAP_HEIGHT;

  pointLight3.shadow.mapSize.width = SHADOW_MAP_WIDTH;
  pointLight3.shadow.mapSize.height = SHADOW_MAP_HEIGHT;

  scene.add(pointLight);
  scene.add(pointLight2);
  scene.add(pointLight3);
/* 
  // Add a directional light to show off the object
  directionalLight = new THREE.DirectionalLight(0xaaaaaa, 1);

  // Create and add all the lights
  directionalLight.position.set(0.5, 1, -3);
  directionalLight.target.position.set(0, 0, 0);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  spotLight = new THREE.SpotLight(0xaaaaaa);
  spotLight.position.set(2, 8, 15);
  spotLight.target.position.set(-2, 0, -2);
  scene.add(spotLight);

  spotLight.castShadow = true;

  spotLight.shadow.camera.near = 1;
  spotLight.shadow.camera.far = 200;
  spotLight.shadow.camera.fov = 45;

  spotLight.shadow.mapSize.width = SHADOW_MAP_WIDTH;
  spotLight.shadow.mapSize.height = SHADOW_MAP_HEIGHT;
  */

  ambientLight = new THREE.AmbientLight(0xffffff, .1);
  scene.add(ambientLight); 

  /////////////////////////////////////////////////////////
  //Mis modelos
  ////////////////////////////////////////////////////////

  loadObjTardis(objTardis, objectList);
  //loadObjDelorean(objDelorean, objectList);
  //loadObjRing(objRing, objectList);

  //loadObjLight(objLightSaber, objectList);
  //loadObjHammer(objHammer, objectList);
  //loadObjBox(objBox, objectList);

  // loadObjBike(objBike, objectList);
  // loadObjLightBulb(objLight, objectList);
  // loadObjImperial(objImperial, objectList);
  loadRoom(objRoom, objectList);

  // Furniture
  //loadObjDesk(objDesk, objectList);

  // Create a group to hold the objects
  group = new THREE.Object3D();
  scene.add(group);

  // Create a texture map
}

main();
