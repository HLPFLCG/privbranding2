# PRIV Media Kit Builder - Enhanced TypeScript Version

A modern, TypeScript-powered media kit builder for artists. Create professional media kits with a drag-and-drop interface, multiple templates, and export to HTML, PNG, or PDF.

## Features

- 🎨 **Multiple Professional Templates** - Choose from 6+ professionally designed templates
- 🛠️ **Custom Builder** - Create custom media kits with drag-and-drop elements
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- 💾 **State Persistence** - Your work is saved automatically to local storage
- 📤 **Multiple Export Formats** - Export to HTML, PNG, or PDF
- 🎯 **TypeScript** - Fully typed for better developer experience
- ⚡ **Modern Build System** - Built with Vite for fast development and optimized production builds

## Tech Stack

- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Vanilla JavaScript** - No frameworks, just pure performance
- **HTML5/CSS3** - Modern web standards
- **html-to-image** - Image export functionality
- **jsPDF** - PDF generation

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev

# The app will be available at http://localhost:3000
```

### Building for Production

```bash
# Build the project
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
priv-mediakit-builder-v2/
├── src/
│   ├── components/       # UI components
│   │   ├── TemplateCard.ts
│   │   └── BuilderElement.ts
│   ├── types/           # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/           # Utility functions
│   │   ├── templateLoader.ts
│   │   ├── stateManager.ts
│   │   └── exporter.ts
│   ├── styles/          # CSS stylesheets
│   │   ├── main.css
│   │   └── builder.css
│   ├── main.ts          # Main application entry point
│   └── builder.ts       # Builder page logic
├── templates/           # HTML template files
│   ├── PRIV-MediaKit.html
│   ├── PRIV-MediaKit-Dramatic.html
│   ├── PRIV-MediaKit-v2.html
│   ├── PRIV-BrandBoard.html
│   ├── priv-mediakit_1.html
│   └── priv-mediakit_2.html
├── index.html           # Main page
├── builder.html         # Builder page
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Usage

### Selecting a Template

1. Open the app in your browser
2. Browse through available templates
3. Click "Use Template" to select one
4. The template will open in the builder

### Using the Custom Builder

1. Click "Builder" in the navigation
2. Add elements from the sidebar (Hero, Bio, Discography, etc.)
3. Drag elements to reorder them
4. Click edit buttons to customize element content
5. Preview your media kit in real-time
6. Export to HTML, PNG, or PDF

### Available Elements

- **Hero** - Main artist image and name
- **Bio** - Artist biography
- **Discography** - List of releases
- **Social Links** - Social media links
- **Contact** - Contact information
- **Stats** - Streaming statistics
- **Images** - Image gallery
- **Video** - Video embeds

## Templates

### Standard Template
Clean, professional design suitable for all genres.

### Dramatic Template
Bold, high-contrast design with strong visual impact.

### Modern V2
Contemporary design with modern aesthetics.

### Brand Board
Brand-focused layout with cohesive visual identity.

### Media Kit 1 & 2
Alternative variations with unique layouts.

## Customization

### Adding New Templates

1. Create a new HTML file in the `templates/` directory
2. Add template metadata to `src/utils/templateLoader.ts`
3. Add preview image to `templates/previews/`

### Styling

All styles are in the `src/styles/` directory:
- `main.css` - Global styles and template page
- `builder.css` - Builder page specific styles

### Colors & Theme

Edit CSS variables in `src/styles/main.css`:
```css
:root {
  --primary: #6366f1;
  --secondary: #8b5cf6;
  --background: #0f0f23;
  /* ... more variables */
}
```

## Deployment

### Cloudflare Pages

1. Connect your GitHub repository
2. Configure build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
3. Deploy

### Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For questions or issues, please open an issue on GitHub.

---

Built with ❤️ for PRIV