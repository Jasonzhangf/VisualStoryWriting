# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Visual Story-Writing application that automatically visualizes stories (chronological events, characters and their actions/movements) and allows users to edit stories by manipulating these visual representations. The system uses GPT-4 to extract information from text and suggest edits.

Key features:
- Visual timeline of events
- Entity (character) visualization with actions/movements
- Location-based story elements
- Bidirectional editing (text → visual and visual → text)
- Study interfaces for user research

## High-Level Architecture

The application follows a React/TypeScript architecture with Zustand for state management:

```
src/
├── model/              # Core data models and business logic
│   ├── HistoryModel.tsx     # Undo/redo functionality
│   ├── LayoutUtils.tsx      # Graph layout algorithms
│   ├── Model.tsx           # Main state management (entities, actions, locations)
│   ├── SlateUtils.tsx      # Text editor utilities
│   ├── TextUtils.tsx       # Text processing and matching
│   └── prompts/            # AI prompt templates and execution
├── view/                   # UI components
│   ├── TextEditor.tsx           # Main text editing interface
│   ├── VisualWritingInterface.tsx # Main application UI
│   ├── entityActionView/        # Entity and action visualization
│   ├── locationView/            # Location visualization
│   ├── actionTimeline/          # Timeline view
│   └── utils/                   # UI utilities
├── study/                  # Research study interfaces
└── App.tsx, main.tsx       # Application entry points
```

### Core Concepts

1. **Model State**: Centralized state management using Zustand in `Model.tsx`
   - Entities (characters): `EntityNode[]`
   - Locations: `LocationNode[]` 
   - Actions: `ActionEdge[]` (connections between entities showing interactions)
   - Text: Slate.js editor state

2. **Bidirectional Sync**: Text ↔ Visual representations
   - VisualRefresher: Extracts visual elements from text
   - RewriteFromVisual: Generates text from visual elements

3. **AI Integration**: OpenAI GPT-4 integration through prompt system
   - BasePrompt classes for different AI operations
   - Text extraction prompts (entities, locations, actions)
   - Text editing prompts (rewrite, modify, etc.)

## Common Development Commands

### Development Setup
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Linting
```bash
npm run lint
```

### Run Tests
```bash
# No specific test command found in package.json
```

## API Configuration

The application supports both OpenAI and LMStudio APIs through environment variables:

### Environment Variables
Create a `.env` file in the project root with the following variables:
```bash
VITE_API_BASE_URL=http://localhost:1234/v1  # LMStudio API endpoint
VITE_OPENAI_API_KEY=lm-studio               # API key (can be anything for LMStudio)
VITE_DEFAULT_MODEL=qwen3-coder-480b-a35b-instruct-mlx  # Default model to use
```

For OpenAI, use:
```bash
VITE_API_BASE_URL=https://api.openai.com/v1  # OpenAI API endpoint
VITE_OPENAI_API_KEY=your-openai-api-key      # Your OpenAI API key
VITE_DEFAULT_MODEL=gpt-4o-2024-08-06         # Default model to use
```

## Key Files and Components

### State Management
- `src/model/Model.tsx` - Main application state (entities, actions, locations, text)
- `src/model/HistoryModel.tsx` - Undo/redo functionality
- `src/model/ViewModel.tsx` - UI-specific state

### Core UI Components
- `src/view/VisualWritingInterface.tsx` - Main application interface
- `src/view/TextEditor.tsx` - Slate.js based text editor
- `src/view/entityActionView/EntitiesEditor.tsx` - Entity and action visualization
- `src/view/locationView/LocationsEditor.tsx` - Location visualization
- `src/view/actionTimeline/ActionTimeline.tsx` - Timeline view

### AI Integration
- `src/model/prompts/utils/BasePrompt.tsx` - Base prompt class
- `src/model/prompts/textExtractors/` - Text analysis prompts
- `src/model/prompts/textEditors/` - Text modification prompts

### Study Features
- `src/study/` - Research study interfaces and data

## Architecture Patterns

1. **Zustand State Management**: All application state is managed through Zustand stores
2. **React Context & Hooks**: Used for component communication
3. **XYFlow**: Used for graph visualization of entities, actions, and timeline
4. **Slate.js**: Rich text editor for story content
5. **Prompt-based AI**: Modular prompt system for different AI operations

## Development Notes

- Application uses React Router with hash-based routing
- OpenAI API key can be passed via URL parameter `k` (base64 encoded)
- Visual layout is optimized using D3 force simulation
- Text diffing is handled with the `diff` library for suggestions
- The application supports keyboard shortcuts (Ctrl/Cmd+Z for undo/redo)