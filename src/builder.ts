import { StateManager } from './utils/stateManager.js';
import { BuilderElement } from './components/BuilderElement.js';
import { MediaKitExporter } from './utils/exporter.js';
import { MediaKitElement } from './types/index.js';

class BuilderApp {
  private stateManager: StateManager;
  private exporter: MediaKitExporter;
  private elementsContainer: HTMLElement;

  constructor() {
    this.stateManager = new StateManager();
    this.exporter = new MediaKitExporter();
    this.elementsContainer = document.getElementById('elements-container')!;
  }

  init() {
    this.setupEventListeners();
    this.loadBuilderState();
    this.setupDragAndDrop();
  }

  private setupEventListeners() {
    // Add element buttons
    document.querySelectorAll('.element-button').forEach(button => {
      button.addEventListener('click', () => {
        const type = button.getAttribute('data-type');
        if (type) {
          this.addElement(type);
        }
      });
    });

    // Export buttons
    document.getElementById('export-html')?.addEventListener('click', () => {
      this.exportMediaKit('html');
    });

    document.getElementById('export-png')?.addEventListener('click', () => {
      this.exportMediaKit('png');
    });

    document.getElementById('export-pdf')?.addEventListener('click', () => {
      this.exportMediaKit('pdf');
    });

    // Reset button
    document.getElementById('reset-builder')?.addEventListener('click', () => {
      if (confirm('Are you sure you want to reset the builder? This will remove all elements.')) {
        this.stateManager.resetState();
        this.renderElements();
      }
    });

    // Preview toggle
    document.getElementById('preview-toggle')?.addEventListener('click', () => {
      this.stateManager.togglePreviewMode();
      this.togglePreviewMode();
    });

    // Load template from URL if provided
    const urlParams = new URLSearchParams(window.location.search);
    const templateId = urlParams.get('template');
    if (templateId) {
      this.loadTemplate(templateId);
    }
  }

  private loadBuilderState() {
    this.renderElements();
  }

  private async loadTemplate(templateId: string) {
    try {
      const response = await fetch(`templates/${templateId}.html`);
      if (response.ok) {
        const html = await response.text();
        this.parseTemplateElements(html);
      }
    } catch (error) {
      console.error('Error loading template:', error);
    }
  }

  private parseTemplateElements(html: string) {
    // Parse HTML and extract predefined elements
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // This is a simplified example - in a real app, you'd parse the actual template structure
    // For now, we'll add a default hero element
    this.addElement('hero', {
      content: {
        name: 'Artist Name',
        image: '/assets/default-avatar.png'
      }
    });
  }

  private addElement(type: string, content?: any) {
    const element: MediaKitElement = {
      id: this.generateId(),
      type: type as any,
      content: content || {},
      position: 'middle'
    };

    this.stateManager.addElement(element);
    this.renderElements();
  }

  private removeElement(elementId: string) {
    this.stateManager.removeElement(elementId);
    this.renderElements();
  }

  private updateElement(elementId: string, updates: Partial<MediaKitElement>) {
    this.stateManager.updateElement(elementId, updates);
    this.renderElements();
  }

  private renderElements() {
    const state = this.stateManager.getState();
    const elements = state.elements;

    if (elements.length === 0) {
      this.elementsContainer.innerHTML = `
        <div class="empty-state">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="12" y1="8" x2="12" y2="16"></line>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
          <h3>No elements yet</h3>
          <p>Add elements from the sidebar to get started</p>
        </div>
      `;
      return;
    }

    this.elementsContainer.innerHTML = '';
    
    elements.forEach(element => {
      const builderElement = new BuilderElement(
        element,
        (id, updates) => this.updateElement(id, updates),
        (id) => this.removeElement(id)
      );
      
      this.elementsContainer.appendChild(builderElement.render());
    });
  }

  private setupDragAndDrop() {
    this.elementsContainer.addEventListener('dragover', (e) => {
      e.preventDefault();
      const draggingElement = document.querySelector('.dragging');
      if (draggingElement) {
        const afterElement = this.getDragAfterElement(
          this.elementsContainer,
          e.clientY
        );
        if (afterElement == null) {
          this.elementsContainer.appendChild(draggingElement);
        } else {
          this.elementsContainer.insertBefore(draggingElement, afterElement);
        }
      }
    });

    this.elementsContainer.addEventListener('drop', (e) => {
      e.preventDefault();
      this.updateElementOrder();
    });
  }

  private getDragAfterElement(container: HTMLElement, y: number) {
    const draggableElements = [
      ...container.querySelectorAll('.builder-element:not(.dragging)')
    ];

    const result = draggableElements.reduce(
      (closest: { offset: number; element?: Element }, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    );
    return result.element;
  }

  private updateElementOrder() {
    const elements = [
      ...this.elementsContainer.querySelectorAll('.builder-element')
    ];
    const newOrder = elements.map(el => el.getAttribute('data-id'));
    
    const state = this.stateManager.getState();
    const reorderedElements = newOrder
      .map(id => state.elements.find(e => e.id === id))
      .filter(Boolean) as MediaKitElement[];
    
    this.stateManager.updateState({ elements: reorderedElements });
  }

  private togglePreviewMode() {
    const state = this.stateManager.getState();
    const sidebar = document.querySelector('.builder-sidebar');
    const preview = document.querySelector('.builder-preview');
    
    if (state.previewMode) {
      sidebar?.classList.add('hidden');
      preview?.classList.remove('col-span-2');
    } else {
      sidebar?.classList.remove('hidden');
    }
  }

  private async exportMediaKit(format: 'html' | 'png' | 'pdf') {
    try {
      // Create a preview container
      const previewContainer = document.createElement('div');
      previewContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        background: white;
        padding: 40px;
      `;
      previewContainer.innerHTML = this.elementsContainer.innerHTML;
      document.body.appendChild(previewContainer);

      await this.exporter.export(previewContainer, { format });

      // Clean up
      setTimeout(() => {
        previewContainer.remove();
      }, 1000);
    } catch (error) {
      console.error('Export error:', error);
      alert('Export failed. Please try again.');
    }
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}

// Initialize builder app
document.addEventListener('DOMContentLoaded', () => {
  const app = new BuilderApp();
  app.init();
});