/**
 * Engine Abstraction Layer
 * 
 * This module serves as an abstraction over the rendering engine.
 * Initially implemented with Three.js, but designed for future
 * migration to a custom WebGL engine.
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

class Engine {
  constructor(config) {
    this.config = config;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.animationLoop = this.animationLoop.bind(this);
    this.entities = new Map();
    this.lastTime = 0;
  }

  /**
   * Initialize the rendering engine
   * @param {HTMLElement} container - DOM element to contain the canvas
   */
  init(container) {
    // Create scene
    this.scene = new THREE.Scene();
    
    // Create camera
    this.camera = new THREE.PerspectiveCamera(
      75, // Field of view
      window.innerWidth / window.innerHeight, // Aspect ratio
      0.1, // Near clipping plane
      1000 // Far clipping plane
    );
    this.camera.position.z = 5;
    
    // Create renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: this.config.graphics.antialias,
      alpha: true
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(this.renderer.domElement);
    
    // Add controls
    if (this.config.controls.orbitControls) {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
    }
    
    // Set up resize handler
    window.addEventListener('resize', this.onWindowResize.bind(this));
    
    // Set up basic lighting
    this.setupLighting();

    console.log('Engine initialized');
  }
  
  /**
   * Set up default lighting
   */
  setupLighting() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    this.scene.add(directionalLight);
  }
  
  /**
   * Handle window resize
   */
  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
  
  /**
   * Add an entity to the scene
   * @param {String} id - Unique identifier for the entity
   * @param {Object} entity - The entity to add (must have a .model property)
   */
  addEntity(id, entity) {
    if (entity.model) {
      this.scene.add(entity.model);
      this.entities.set(id, entity);
    }
  }
  
  /**
   * Remove an entity from the scene
   * @param {String} id - Unique identifier for the entity
   */
  removeEntity(id) {
    const entity = this.entities.get(id);
    if (entity && entity.model) {
      this.scene.remove(entity.model);
      this.entities.delete(id);
    }
  }
  
  /**
   * Load a GLTF model from a file
   * @param {String} path - Path to the GLTF file
   * @returns {Promise} - Promise that resolves with the loaded model
   */
  loadModel(path) {
    const loader = new GLTFLoader();
    return new Promise((resolve, reject) => {
      loader.load(
        path,
        (gltf) => resolve(gltf),
        undefined,
        (error) => reject(error)
      );
    });
  }
  
  /**
   * Main animation loop
   * @param {Number} time - Current timestamp
   */
  animationLoop(time) {
    requestAnimationFrame(this.animationLoop);
    
    // Calculate delta time in seconds
    const deltaTime = (time - this.lastTime) / 1000;
    this.lastTime = time;
    
    // Update controls
    if (this.controls && this.controls.update) {
      this.controls.update();
    }
    
    // Update entities
    this.entities.forEach(entity => {
      if (entity.update) {
        entity.update(deltaTime);
      }
    });
    
    // Render scene
    this.renderer.render(this.scene, this.camera);
  }
  
  /**
   * Start the render loop
   */
  start() {
    this.lastTime = performance.now();
    this.animationLoop(this.lastTime);
  }
}

export default Engine;
