import * as THREE from "three";

export default color => {
  const starsGeometry = new THREE.Geometry();

  for (let i = 0; i < 3000; i++) {
    const star = new THREE.Vector3();
    star.x = THREE.Math.randFloatSpread(1200);
    star.y = THREE.Math.randFloatSpread(1200);
    star.z = Math.random() * 1600 - 800;
    starsGeometry.vertices.push(star);
  }

  for (let i = 0; i < 10000; i++) {
    const star = new THREE.Vector3();
    star.x = THREE.Math.randFloatSpread(4500);
    star.y = THREE.Math.randFloatSpread(4500);
    star.z = THREE.Math.randFloatSpread(4500);
    starsGeometry.vertices.push(star);
  }

  const starsMaterial = new THREE.PointsMaterial({ color });
  const starField = new THREE.Points(starsGeometry, starsMaterial);
  starField.position.x = Math.random() * 150 - 80;
  starField.position.y = Math.random() * 180 - 100;
  starField.position.z = Math.random() * 1000;

  return starField;
};
