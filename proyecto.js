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
  ambientLight = null;

let mapUrl = "../imagenes/checker_large.gif";

let SHADOW_MAP_WIDTH = 4096,
  SHADOW_MAP_HEIGHT = 4096;

let objTardis = {
  obj: "../3dModels/Tardis.obj",
  mtl: "../3dModels/Tardis.mtl",
};
let objDelorean = {
  obj: "../3dModels/Acura_NSX_1997.obj",
  mtl: "../3dModels/Acura_NSX_1997.mtl",
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

async function loadObj(objModelUrl, objectList) {
  try {
    const object = await new OBJLoader().loadAsync(
      objModelUrl.obj,
      onProgress,
      onError
    );
    let texture = objModelUrl.hasOwnProperty("normalMap")
      ? new THREE.TextureLoader().load(objModelUrl.map)
      : null;
    let normalMap = objModelUrl.hasOwnProperty("normalMap")
      ? new THREE.TextureLoader().load(objModelUrl.normalMap)
      : null;
    let specularMap = objModelUrl.hasOwnProperty("specularMap")
      ? new THREE.TextureLoader().load(objModelUrl.specularMap)
      : null;

    console.log(object);

    object.traverse(function (child) {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.material.map = texture;
        child.material.normalMap = normalMap;
        child.material.specularMap = specularMap;
      }
    });

    object.scale.set(3, 3, 3);
    object.position.z = -3;
    object.position.x = -1.5;
    object.rotation.y = -3;
    object.name = "objObject";
    objectList.push(object);
    scene.add(object);
  } catch (err) {
    onError(err);
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
    root.push(object);
    console.log(root);
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

    objectList.push(object);
    root.push(object);
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
    root.push(object);
    objectList.push(object);
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
}

function animate() {
  let now = Date.now();
  let deltat = now - currentTime;
  currentTime = now;
}

function update() {
  requestAnimationFrame(function () {
    update();
    window.addEventListener("pointerdown", onMouseDown, false);
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
  console.log("Root Children");
  console.log(root);
  console.log("INTERSECTS");
  console.log(intersects.length);

  if (intersects.length > 0) {
    console.log("CONSOLE");
  }
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

  orbitControls = new OrbitControls(camera, renderer.domElement);

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

  ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);

  /////////////////////////////////////////////////////////
  //Mis modelos
  ////////////////////////////////////////////////////////

  loadObjTardis(objTardis, objectList);
  loadObjDelorean(objDelorean, objectList);
  loadObjRing(objRing, objectList);

  loadObjLight(objLightSaber, objectList);
  loadObjHammer(objHammer, objectList);
  loadObjBox(objBox, objectList);

  loadObjBike(objBike, objectList);
  loadObjLightBulb(objLight, objectList);
  loadObjImperial(objImperial, objectList);
  loadRoom(objRoom, objectList);

  // Furniture
  //loadObjDesk(objDesk, objectList);

  // Create a group to hold the objects
  group = new THREE.Object3D();
  scene.add(group);

  // Create a texture map
}

main();
