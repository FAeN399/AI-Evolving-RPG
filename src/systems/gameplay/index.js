/**
 * Gameplay System
 * 
 * Manages core gameplay elements including:
 * - Game loop and state management
 * - Entity and component registration
 * - Game state transitions
 */

import config from '../../config';

class GameplaySystem {
  constructor(engine) {
    this.engine = engine;
    this.entities = new Map();
    this.systems = new Map();
    this.gameState = {
      player: null,
      currentScene: null,
      evolutionStage: 0,
      gameTime: 0,
      isPaused: false
    };
  }
  
  /**
   * Initialize the gameplay system
   */
  init() {
    console.log('Gameplay system initializing...');
    
    // Register core systems
    this.registerCoreEntities();
    this.registerCoreSystems();
    
    console.log('Gameplay system initialized');
  }
  
  /**
   * Register core entities (player, camera, etc)
   */
  registerCoreEntities() {
    // In a full implementation, we would create actual entity objects
    console.log('Registering core entities...');
    
    // Example player entity (placeholder)
    const player = {
      id: 'player',
      components: {
        position: { x: 0, y: 0, z: 0 },
        velocity: { x: 0, y: 0, z: 0 },
        input: { moveForward: false, moveBackward: false, moveLeft: false, moveRight: false },
        stats: { health: 100, maxHealth: 100, level: 1, experience: 0 }
      },
      update(deltaTime) {
        // Update player logic would go here
      }
    };
    
    this.addEntity(player);
    this.gameState.player = player;
  }
  
  /**
   * Register core systems like physics, input, etc
   */
  registerCoreSystems() {
    console.log('Registering core systems...');
    
    // Input system (placeholder)
    const inputSystem = {
      id: 'input',
      entities: new Set(),
      update: (deltaTime) => {
        // Process input for registered entities
      },
      registerEntity: (entity) => {
        if (entity.components && entity.components.input) {
          this.systems.get('input').entities.add(entity.id);
        }
      },
      unregisterEntity: (entityId) => {
        this.systems.get('input').entities.delete(entityId);
      }
    };
    
    // Movement system (placeholder)
    const movementSystem = {
      id: 'movement',
      entities: new Set(),
      update: (deltaTime) => {
        // Update positions based on velocities
        for (const entityId of this.systems.get('movement').entities) {
          const entity = this.entities.get(entityId);
          if (entity && entity.components.position && entity.components.velocity) {
            entity.components.position.x += entity.components.velocity.x * deltaTime;
            entity.components.position.y += entity.components.velocity.y * deltaTime;
            entity.components.position.z += entity.components.velocity.z * deltaTime;
            
            // If entity has a model, update its position
            if (entity.model) {
              entity.model.position.set(
                entity.components.position.x,
                entity.components.position.y,
                entity.components.position.z
              );
            }
          }
        }
      },
      registerEntity: (entity) => {
        if (entity.components && entity.components.position && entity.components.velocity) {
          this.systems.get('movement').entities.add(entity.id);
        }
      },
      unregisterEntity: (entityId) => {
        this.systems.get('movement').entities.delete(entityId);
      }
    };
    
    // Register the systems
    this.addSystem(inputSystem);
    this.addSystem(movementSystem);
  }
  
  /**
   * Add a new entity to the gameplay system
   * @param {Object} entity - The entity to add
   */
  addEntity(entity) {
    if (!entity || !entity.id) {
      console.error('Cannot add entity: Invalid entity or missing ID');
      return;
    }
    
    this.entities.set(entity.id, entity);
    
    // Register entity with relevant systems
    for (const system of this.systems.values()) {
      if (system.registerEntity) {
        system.registerEntity(entity);
      }
    }
    
    // If the entity has a model, add it to the engine
    if (entity.model) {
      this.engine.addEntity(entity.id, entity);
    }
    
    console.log(`Entity added: ${entity.id}`);
  }
  
  /**
   * Remove an entity from the gameplay system
   * @param {String} entityId - ID of the entity to remove
   */
  removeEntity(entityId) {
    // Unregister entity from all systems
    for (const system of this.systems.values()) {
      if (system.unregisterEntity) {
        system.unregisterEntity(entityId);
      }
    }
    
    // Remove from engine if it has a model
    this.engine.removeEntity(entityId);
    
    // Remove from entities collection
    this.entities.delete(entityId);
    
    console.log(`Entity removed: ${entityId}`);
  }
  
  /**
   * Add a new system to the gameplay system
   * @param {Object} system - The system to add
   */
  addSystem(system) {
    if (!system || !system.id || !system.update) {
      console.error('Cannot add system: Invalid system, missing ID, or missing update method');
      return;
    }
    
    this.systems.set(system.id, system);
    console.log(`System added: ${system.id}`);
    
    // Register existing entities with the new system
    if (system.registerEntity) {
      for (const entity of this.entities.values()) {
        system.registerEntity(entity);
      }
    }
  }
  
  /**
   * Remove a system from the gameplay system
   * @param {String} systemId - ID of the system to remove
   */
  removeSystem(systemId) {
    this.systems.delete(systemId);
    console.log(`System removed: ${systemId}`);
  }
  
  /**
   * Update all systems and entities
   * @param {Number} deltaTime - Time elapsed since last update
   */
  update(deltaTime) {
    if (this.gameState.isPaused) return;
    
    // Update game time
    this.gameState.gameTime += deltaTime;
    
    // Update all systems
    for (const system of this.systems.values()) {
      if (system.update) {
        system.update(deltaTime);
      }
    }
    
    // Update all entities
    for (const entity of this.entities.values()) {
      if (entity.update) {
        entity.update(deltaTime);
      }
    }
  }
  
  /**
   * Pause the game
   */
  pause() {
    this.gameState.isPaused = true;
    console.log('Game paused');
  }
  
  /**
   * Resume the game
   */
  resume() {
    this.gameState.isPaused = false;
    console.log('Game resumed');
  }
  
  /**
   * Start a new game
   */
  startNewGame() {
    console.log('Starting new game...');
    this.gameState.evolutionStage = 0;
    this.gameState.gameTime = 0;
    this.gameState.isPaused = false;
    
    // Additional initialization would go here
    
    // Trigger initial scene load
    this.loadScene(config.initialScene);
  }
  
  /**
   * Load a scene
   * @param {String} sceneId - ID of the scene to load
   */
  loadScene(sceneId) {
    console.log(`Loading scene: ${sceneId}`);
    // Scene loading would go here
    this.gameState.currentScene = sceneId;
  }
  
  /**
   * Advance to the next evolution stage
   */
  evolve() {
    const nextStage = this.gameState.evolutionStage + 1;
    console.log(`Evolving to stage ${nextStage}`);
    
    if (nextStage >= config.maxEvolutionStage) {
      console.log('Maximum evolution stage reached');
      return;
    }
    
    this.gameState.evolutionStage = nextStage;
    
    // Additional evolution logic would go here
    // This might include:
    // - Updating visual styles
    // - Changing game mechanics
    // - Unlocking new abilities
    // - Transitioning to new areas
  }
}

export default GameplaySystem;
