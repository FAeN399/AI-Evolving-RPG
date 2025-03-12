# Sprite Assets Directory

This directory contains all pixel art sprite assets for the game.

## Directory Structure

- `/player/` - Player character sprites
  - `base.png` - Base player character
  - `equipment/` - Equipment overlays
  - `animations/` - Animation frames

- `/npcs/` - NPC character sprites
  - `villagers/` - Town NPCs
  - `merchants/` - Shop owners
  - `enemies/` - Hostile characters

- `/environment/` - World environment sprites
  - `tiles/` - Terrain tiles
  - `objects/` - Interactive objects
  - `decorations/` - Background elements

- `/ui/` - User interface elements
  - `buttons.png` - Button sprites
  - `panels.png` - Panel backgrounds
  - `icons.png` - Various icons

- `/effects/` - Visual effects
  - `combat/` - Combat animations
  - `magic/` - Spell effects
  - `weather/` - Weather effects

## Sprite Guidelines

- Base resolution: 16×16 pixels per tile
- Character sprites: 16×24 pixels (or 16×32 for larger characters)
- Color palette: 32 colors maximum per evolution stage
- Animation frames: 4-8 frames per animation

## Naming Conventions

- All filenames should be lowercase with underscores
- Use descriptive names (e.g., `villager_blacksmith.png`, not just `npc1.png`)
- Animation frames should be numbered (e.g., `walk_right_01.png`, `walk_right_02.png`)

## Tools

Sprite assets can be created/edited with:
- Aseprite (recommended)
- Photoshop with the "Pixel Perfect" option
- GIMP with the Pixel Art plugin

## Evolution Stages

As the game evolves, sprites will be replaced or enhanced. Each evolution stage should have its own subfolder:

- `/stage1/` - Pixel art (16×16 base)
- `/stage2/` - Enhanced pixel art (32×32 base)
- `/stage3/` - HD-2D style sprites
- `/stage4/` - High-fidelity sprites with effects
