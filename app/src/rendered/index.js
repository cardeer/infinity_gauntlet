import React, { Component } from "react";
import * as THREE from "three";
import createStars from "./GenerateStar";
import createPlanet from "./GeneratePlanet";
const OrbitControls = require("three-orbit-controls")(THREE);
class Shape extends Component {
  constructor(props) {
    super(props);
    this.animate = this.animate.bind(this);
  }

  sigmoid = t => 1 / (1 + Math.pow(Math.E, -t));

  componentDidMount() {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, width / height, 1, 5000);
    this.camera.position.set(0, 0, 5);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(width, height);
    this.mount.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    this.controls.dampingFactor = 0.25;
    this.controls.maxPolarAngle = Math.PI / 2;

    this.scene.fog = new THREE.Fog(0x000000, 1, 5000);
    this.scene.background = new THREE.Color(0x000000);

    const stars = new THREE.Group();
    stars.add(createStars(0xffffff));
    stars.add(createStars(0xffc107));
    stars.add(createStars(0x18ffff));

    this.scene.add(stars);

    const light = new THREE.AmbientLight(0x888888);
    this.scene.add(light);

    this.planets = [];

    for (let i = 1; i < 12; i++) {
      this.planets.push(createPlanet(this.scene, i));
    }
    console.log(this.planets);

    this.animate();
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.frameId);
    this.mount.removeChild(this.renderer.domElement);
  }

  animate() {
    this.frameId = window.requestAnimationFrame(this.animate);

    this.controls.update();
    let MAX = 0;
    this.planets.map(planet => {
      planet.rotation.y -= 0.005;
      return;
    });

    this.renderer.render(this.scene, this.camera);
  }

  render() {
    return (
      <div>
        <div
          id="boardCanvas"
          style={{ width: "100vw", height: "100vh" }}
          ref={mount => {
            this.mount = mount;
          }}
        />
      </div>
    );
  }
}
export default Shape;
