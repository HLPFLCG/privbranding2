import { TemplateLoader } from './utils/templateLoader.js';
import { TemplateCard } from './components/TemplateCard.js';
import { StateManager } from './utils/stateManager.js';

class App {
  private templateLoader: TemplateLoader;
  private stateManager: StateManager;
  private templateGrid: HTMLElement;

  constructor() {
    this.templateLoader = new TemplateLoader();
    this.stateManager = new StateManager();
    this.templateGrid = document.getElementById('template-grid')!;
  }

  async init() {
    try {
      // Load templates
      await this.templateLoader.loadTemplates();
      
      // Render template grid
      this.renderTemplates();
      
      // Load saved state
      this.loadSavedState();
      
    } catch (error) {
      console.error('Error initializing app:', error);
      this.showError('Failed to load templates. Please refresh the page.');
    }
  }

  private renderTemplates() {
    const templates = this.templateLoader.getFeaturedTemplates();
    
    this.templateGrid.innerHTML = '';
    
    templates.forEach(template => {
      const card = new TemplateCard(template, (templateId) => {
        this.handleTemplateSelect(templateId);
      });
      
      this.templateGrid.appendChild(card.render());
    });
  }

  private handleTemplateSelect(templateId: string) {
    // Save selected template to state
    this.stateManager.setSelectedTemplate(templateId);
    
    // Map template ID to actual template file
    const templateFiles: Record<string, string> = {
      'standard': 'templates/PRIV-MediaKit.html',
      'dramatic': 'templates/PRIV-MediaKit-Dramatic.html',
      'v2': 'templates/PRIV-MediaKit-v2.html',
      'brand-board': 'templates/PRIV-BrandBoard.html',
      'mediakit-1': 'templates/priv-mediakit_1.html',
      'mediakit-2': 'templates/priv-mediakit_2.html'
    };

    // Navigate to template viewer to show original HTML
    const templateFile = templateFiles[templateId];
    if (templateFile) {
      window.location.href = `template-viewer.html?template=${encodeURIComponent(templateFile)}`;
    }
  }

  private loadSavedState() {
    const state = this.stateManager.getState();
    if (state.selectedTemplate) {
      console.log('Last selected template:', state.selectedTemplate);
    }
  }

  private showError(message: string) {
    this.templateGrid.innerHTML = `
      <div class="error-message">
        <p>${message}</p>
        <button onclick="location.reload()" class="btn btn-primary">
          Refresh Page
        </button>
      </div>
    `;
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
});