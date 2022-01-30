import * as THREE from 'three';
import * as dat from 'dat.gui';

export default function (element) {
  // Debug
  //const gui = new dat.GUI();

  // Loaders
  const loader = new THREE.TextureLoader();
  const groundTexture = loader.load('./ground.jpeg');
  const displaycmentTexture = loader.load('./displacment.gif');
  const alphaTexture = loader.load('./alphaMap.jpeg');

  // Scene
  const scene = new THREE.Scene();

  // Objects
  const geometry = new THREE.PlaneBufferGeometry(2, 2, 64, 64);

  // Materials

  const material = new THREE.MeshStandardMaterial({
    map: groundTexture,
    displacementMap: displaycmentTexture,
    displacementScale: 0.4,
    alphaMap: alphaTexture,
    transparent: true,
  });

  //gui.add(material, 'displacementScale', 0.0, 1.0);

  // Mesh
  const sphere = new THREE.Mesh(geometry, material);
  sphere.rotation.x = 5.1;
  //gui.add(sphere.rotation, 'x', 0, 10);
  scene.add(sphere);

  // Lights

  const pointLight = new THREE.PointLight(0x328cbe, 1);
  pointLight.position.x = 2;
  pointLight.position.y = 3;
  pointLight.position.z = 4;

  // const light = gui.addFolder('light');
  // light.add(pointLight.position, 'x', 0, 5);
  // light.add(pointLight.position, 'y', 0, 5);
  // light.add(pointLight.position, 'z', 0, 5);

  // const color = {
  //   value: 0xffffff,
  // };

  // light
  //   .addColor(color, 'value')
  //   .onChange(() => pointLight.color.set(color.value));

  scene.add(pointLight);

  /**
   * Sizes
   */
  const sizes = {
    width: window.innerWidth * 0.7,
    height: window.innerHeight,
  };

  window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth * 0.7;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  /**
   * Camera
   */
  // Base camera
  const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100
  );
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 2;
  scene.add(camera);

  /**
   * Renderer
   */
  const renderer = new THREE.WebGLRenderer({
    canvas: element,
    alpha: true,
  });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  /**
   * Animate
   */

  const clock = new THREE.Clock();

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // Update objects
    sphere.rotation.z = 0.3 * elapsedTime;

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
  };

  tick();

  return {
    material,
    geometry
  }
}
