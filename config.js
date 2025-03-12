/**
 * Game Configuration
 * 
 * Central configuration parameters for the game.
 * This file will be extended as new features are added.
 */

const config = {
  // Game title
  title: "AI-Evolving RPG",
  
  // Initial scene to load
  initialScene: "pixel_village",
  
  // Evolution stages
  maxEvolutionStage: 4,
  evolutionThresholds: [
    null, // Stage 0 (not used)
    null, // Stage 1 (default starting stage)
    100,  // Stage 2 threshold
    300,  // Stage 3 threshold
    600   // Stage 4 threshold
  ],
  
  // Graphics settings
  graphics: {
    antialias: true,
    shadows: true,
    pixelRatio: window.devicePixelRatio,
    maxFPS: 60,
    postProcessing: false // Enable in later evolution stages
  },
  
  // Controls
  controls: {
    orbitControls: true, // For development
    keyboardControls: true,
    gamepadControls: false,
    touchControls: false
  },
  
  // Audio settings
  audio: {
    music: {
      enabled: true,
      volume: 0.7
    },
    sfx: {
      enabled: true,
      volume: 1.0
    }
  },
  
  // Debug options
  debug: {
    showFPS: true,
    logLevel: 'info', // 'debug', 'info', 'warn', 'error'
    showColliders: false
  },
  
  // Save/Load settings
  saveSystem: {
    autosaveInterval: 300, // In seconds
    maxSaveSlots: 10
  }
};

export default config;
