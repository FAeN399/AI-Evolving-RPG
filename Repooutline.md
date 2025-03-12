# Repository Outline for AI-Evolving-RPG

This repository contains all the source code, assets, documentation, and tools for our evolving indie RPG. The game begins as a pixel-art, traditional RPG and gradually evolves—both in visuals and mechanics—toward a high-fidelity, AI-driven experience. The repository is structured to support modular development and eventual migration from Three.js to a custom WebGL engine.

## Root Directory
- **README.md**  
  Project overview, setup instructions, usage, and roadmap.

- **LICENSE**  
  The open-source license for the project.

- **package.json / yarn.lock**  
  Node.js configuration and dependency management.

- **.gitignore**  
  Files and directories to exclude from version control.

## /docs
Contains all design documents, technical specifications, and project roadmaps.
- **GameDesign.md**  
  Overall gameplay design, narrative structure, and progression philosophy.
- **UI_UX.md**  
  Detailed UI/UX design guidelines, including the evolution strategy (from pixel to high fidelity). _Tool Suggestion: Figma for UI design and prototyping._
- **CharacterCreation.md**  
  In-depth design of character creation, progression, job/class system, and equipment integration. _Tool Suggestion: Aseprite for pixel art character sprites; Blender for 3D models (future evolution)._
- **TechnicalPlan.md**  
  Technology stack, performance strategies, and engine transition plan (Three.js to custom WebGL). _Tool Suggestion: TWGL.js/GLMatrix for custom WebGL math and rendering utilities._
- **Roadmap.md**  
  Milestones and development timeline.
- **API_Documentation/**  
  Documentation for each module (UI components, networking, AI systems, etc.).

## /src
All source code and game assets.

### /src/assets
All art, audio, fonts, and shader files.
- **/sprites**  
  Pixel art assets for UI elements, characters, icons, etc. _Tool Suggestion: Aseprite, Photoshop, or GIMP._
- **/3d_models**  
  3D models and textures (to be used in later stages). _Tool Suggestion: Blender, Substance Painter._
- **/audio**  
  Music, sound effects, and voiceovers. _Tool Suggestion: Audacity for editing; LMMS or FL Studio for composition._
- **/fonts**  
  Bitmap and vector fonts. _Tool Suggestion: FontForge for custom fonts, Adobe Illustrator for vector designs._
- **/shaders**  
  GLSL shader files for Three.js and custom rendering. _Tool Suggestion: ShaderToy (for prototyping shaders) and VSCode with GLSL extensions._

### /src/components
Reusable game components and UI modules.
- **/ui**  
  - UI framework components (buttons, panels, dialogs, HUD, menus). _Tool Suggestion: React.js with libraries like styled-components or Material-UI for scalable, modular design; or PixiJS for in-game 2D UI if preferred._
  - Theme files for evolving from pixelated to high fidelity. _Design prototypes in Figma._
- **/character**  
  - Character creation modules (appearance customization, attribute allocation). _Tool Suggestion: Use React for forms and dynamic previews; integrate Aseprite assets for pixel phase and Blender models for later phases._
  - Job/class selection and skill tree components. _Visualization with interactive skill trees (consider D3.js for dynamic graphs)._
- **/inventory**  
  - Equipment management UI, item comparison, and sorting systems. _Tool Suggestion: React with state management (Redux or Context API) for live updates; TexturePacker for creating sprite atlases._
- **/quest**  
  - Quest generation, dynamic quest templates, and narrative branching components. _Tool Suggestion: Use a combination of templating in JavaScript and integration with OpenAI GPT (or similar LLM API) for narrative generation._
- **/network**  
  - Multiplayer networking code, WebSocket integration, and state synchronization. _Tool Suggestion: Socket.IO for real-time communication; Colyseus as an alternative game server framework for multiplayer._
- **/ai**  
  - AI modules for narrative generation, dynamic world events, and NPC behavior. _Tool Suggestion: OpenAI GPT-3/4 API or similar LLMs for dialogue/narrative; TensorFlow.js for lightweight in-browser ML if needed._
  - Systems for player modeling and adaptive quest generation.
- **/procedural**  
  - Procedural generation routines for terrains, dungeons, and world structures. _Tool Suggestion: noisejs for Perlin noise, rot.js for roguelike procedural generation routines._
- **/engine**  
  - Rendering abstraction layer.  
  - Three.js integration now, with a clear interface for later custom WebGL engine replacement. _Tool Suggestion: Three.js initially; plan migration using TWGL.js and GLMatrix._

### /src/scenes
Defines different game environments and transitions.
- **/sci-fi**  
  - Scenes for the physical, sci-fi world (space stations, planets, battle arenas). _Tool Suggestion: Three.js scenes, loaded via GLTFLoader (with assets created in Blender)._
- **/ai-network**  
  - Scenes for the digital, AI network world (abstract, tactical battle views, digital landscapes). _Tool Suggestion: Custom shaders in Three.js for surreal visuals._
- **/transitions**  
  - Scenes and scripts managing transitions between worlds and art evolution stages.

### /src/systems
Core systems that power game functionality.
- **/gameplay**  
  - Main game loop, state management, and entity/component systems. _Tool Suggestion: An ECS library like BiteCS or a custom ECS implementation in JavaScript._
- **/input**  
  - Handling keyboard, mouse, and gamepad input.
- **/physics**  
  - Collision detection and physics calculations. _Tool Suggestion: Cannon.js or Ammo.js (if needed) for physics integration._
- **/audio**  
  - Audio management and sound effect playback. _Tool Suggestion: Howler.js for robust audio management in web games._
- **/save**  
  - Save/load system for persistent game state and player progress. _Tool Suggestion: LocalForage for local storage; custom JSON serialization for game state._

### Root-level Files
- **main.js / index.js**  
  The game’s entry point, initializing the engine, scenes, and main loop.
- **config.js**  
  Configuration parameters (resolution, world seed, etc.).

## /tests
Automated tests to ensure robust functionality.
- **/unit**  
  - Unit tests for UI, character creation, networking, and AI modules. _Tool Suggestion: Jest for unit testing in JavaScript._
- **/integration**  
  - Integration tests for scene transitions, multiplayer sync, and procedural generation.
- **/performance**  
  - Scripts to test frame rates, load times, and network latency under simulated conditions.

## /scripts
Helper scripts for building, deployment, and asset processing.
- **build.sh / build.js**  
  Build scripts using Webpack, Rollup, or similar bundlers.
- **deploy.sh**  
  Deployment automation for web or desktop platforms.
- **asset_pipeline/**  
  Scripts to process, optimize, and convert art, audio, and shader assets. _Tool Suggestion: TexturePacker, ImageMagick._

## /build
Compiled output and distributable files.
- **/web_build**  
  Finalized web version of the game.
- **/desktop_build**  
  Packaged version for desktop deployment (e.g., Electron).

## /tools
Custom tools to assist development.
- **/level_editor**  
  A tool for designing and previewing levels or world maps. _Tool Suggestion: Tiled for 2D level design; custom integration with Three.js for 3D levels._
- **/ui_editor**  
  An in-game UI editor for testing and refining UI components.
- **/ai_simulation**  
  Tools to simulate AI behavior and test procedural narrative generation. _Tool Suggestion: Custom dashboards built with React and D3.js to visualize AI decision trees and procedural output._

## /workspaces
Contains individual workspaces for different developers or teams.
- **/dev1**  
  Workspace for Developer 1, containing personal branches, experiments, and prototypes.
- **/dev2**  
  Workspace for Developer 2, containing personal branches, experiments, and prototypes.
- **/teamA**  
  Workspace for Team A, containing shared branches, collaborative experiments, and prototypes.
