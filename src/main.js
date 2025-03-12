/**
 * Main entry point for the AI-Evolving RPG
 */

import Engine from './components/engine';
import GameplaySystem from './systems/gameplay';
import config from '../config';

// DOM element to contain the game
let container;

// Core systems
let engine;
let gameplaySystem;

/**
 * Initialize the game
 */
function init() {
  console.log('Initializing AI-Evolving RPG...');
  
  // Create container for the game
  container = document.createElement('div');
  container.id = 'game-container';
  document.body.appendChild(container);
  
  // Initialize game engine
  engine = new Engine(config);
  engine.init(container);
  
  // Initialize gameplay system
  gameplaySystem = new GameplaySystem(engine);
  gameplaySystem.init();
  
  // Set up main game loop
  gameLoop();
  
  console.log('Game initialized');
  
  // Start a new game
  gameplaySystem.startNewGame();
}

/**
 * Main game loop
 */
function gameLoop() {
  // Use the engine's animation loop for rendering
  engine.start();
  
  // Set up gameplay update loop
  let lastTime = performance.now();
  
  function update(currentTime) {
    // Calculate time elapsed since last update
    const deltaTime = (currentTime - lastTime) / 1000; // Convert to seconds
    lastTime = currentTime;
    
    // Update gameplay
    gameplaySystem.update(deltaTime);
    
    // Request next frame
    requestAnimationFrame(update);
  }
  
  // Start the update loop
  requestAnimationFrame(update);
}

// Start the game when the DOM is ready
document.addEventListener('DOMContentLoaded', init);
