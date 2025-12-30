---
paths: src/main/**/*.ts
---

# Electron Main Process Rules

## Security
- NEVER enable nodeIntegration
- ALWAYS validate IPC arguments before use
- SANITIZE all file paths: path.normalize() and check against project root
- NEVER execute shell commands with unsanitized user input

## Patterns
- Use app.getPath() for system paths
- Use async/await, never callbacks
- Always handle promise rejections
- Use proper logging (not console.log in production)

## Performance
- Never block the event loop
- Use worker threads for CPU-intensive tasks
- Stream large files, don't load into memory

## IPC Handlers
- One handler per logical operation
- Validate types at runtime (zod recommended)
- Return consistent response shapes
- Include error codes for client handling
