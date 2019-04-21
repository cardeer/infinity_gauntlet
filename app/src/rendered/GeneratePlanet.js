import * as THREE from "three";

export default (scene, number) => {
  const mapOverlay = THREE.ImageUtils.loadTexture(`/texture/${number}.jpg`);

  let x, y, z;
  x = THREE.Math.randFloatSpread(1200);
  y = THREE.Math.randFloatSpread(1200);
  z = -100;
  //   const Dlight = new THREE.DirectionalLight(0xfdfcf0, 1);
  //   Dlight.position.set(x, y, z);
  //   scene.add(Dlight);

  const planetGeometry = new THREE.SphereGeometry(
    10 + Math.random() * 5,
    200,
    200
  );
  const planetMaterial = new THREE.MeshPhongMaterial({
    // color: 0xaaaaaa,
    // specular: 0x333333,
    // shininess: 25,
    map: mapOverlay
  });

  const planet = new THREE.Mesh(planetGeometry, planetMaterial);
  planet.position.set(x, y, z);
  scene.add(planet);
  return planet;
};
