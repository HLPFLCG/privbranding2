# Quick Start Guide - PRIV Media Kit Builder

Get started with the PRIV Media Kit Builder in minutes!

## Installation

```bash
# Navigate to project directory
cd priv-mediakit-builder-v2

# Install dependencies
npm install
```

## Running the Application

### Development Mode

```bash
npm run dev
```

Open http://localhost:3000 in your browser

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Basic Usage

### 1. Choose a Template

- Browse the template gallery
- Click "Preview" to see a full preview
- Click "Use Template" to open in the builder

### 2. Customize in Builder

- Add elements from the sidebar
- Drag elements to reorder
- Click the edit icon (✏️) to modify content
- Click the delete icon (🗑️) to remove elements

### 3. Export Your Media Kit

- **HTML** - Full HTML file for websites
- **PNG** - High-quality image
- **PDF** - Printable document

## Keyboard Shortcuts

- `Ctrl/Cmd + S` - Save (automatic with state persistence)
- `Esc` - Close modals

## Common Tasks

### Adding a New Template

1. Create HTML file in `templates/` directory
2. Add configuration in `src/utils/templateLoader.ts`
3. Restart dev server

### Changing Colors

Edit CSS variables in `src/styles/main.css`:
```css
:root {
  --primary: #your-color;
  --secondary: #your-color;
}
```

### Resetting the Builder

Click the "Reset Builder" button in the sidebar to start fresh.

## Troubleshooting

### Templates not loading?

- Check browser console for errors
- Ensure all template files are in `templates/` directory
- Restart dev server

### Export not working?

- Check browser permissions
- Ensure you're using a modern browser
- Try different export format

### Styles not updating?

- Clear browser cache
- Restart dev server
- Check for CSS syntax errors

## Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Explore the source code in `src/`
- Customize templates to match your brand

## Support

Need help? Open an issue on GitHub or check the documentation.