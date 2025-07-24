# Claude Code Configuration for Synapse UI

## MCP Servers Configuration

The following MCP servers are configured for this project:

### filesystem
- **Purpose**: File system operations and navigation
- **Command**: `npx -y @modelcontextprotocol/server-filesystem /Users/rohanjasani`
- **Usage**: Read, write, and navigate project files

### context7-mcp
- **Purpose**: Context management and memory
- **Command**: `npx -y @smithery/cli@latest run @upstash/context7-mcp --key 4135ce6e-e5a5-45f1-a6bb-8023fd91210e --profile financial-reptile-WGz0ut`
- **Usage**: Maintain context across sessions

### github
- **Purpose**: GitHub integration and repository management
- **Command**: `npx -y @smithery/cli@latest run @smithery-ai/github --key 4135ce6e-e5a5-45f1-a6bb-8023fd91210e --profile financial-reptile-WGz0ut`
- **Usage**: GitHub operations, PR management, issue tracking

### playwright
- **Purpose**: Browser automation and testing
- **Command**: `npx @playwright/mcp@latest`
- **Usage**: End-to-end testing, browser interactions

### browsermcp
- **Purpose**: Browser control and web interactions
- **Command**: `npx @browsermcp/mcp@latest`
- **Usage**: Web browsing, content extraction

## Development Commands

### Package Management
```bash
pnpm install          # Install dependencies
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm test             # Run tests
```

### Testing
```bash
pnpm test:unit        # Run unit tests
pnpm test:e2e         # Run e2e tests
pnpm test:playwright  # Run Playwright tests
```

### Development Tools
```bash
pnpm histoire:dev     # Start Histoire storybook
pnpm histoire:build   # Build Histoire
```

## Project Structure

This is a Vue 3 component library using:
- **Vue 3** with Composition API
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Histoire** for component documentation
- **Vitest** for unit testing
- **Playwright** for e2e testing
- **Pinia** for state management

## Key Directories

- `src/components/` - Reusable UI components
- `src/patterns/` - Complex component patterns
- `src/composables/` - Vue composables
- `src/stories/` - Histoire stories
- `tests/` - Test files
- `Idea/` - Project vision and guidelines
- `Planner/` - Development phases and planning