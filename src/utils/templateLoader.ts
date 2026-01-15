import { Template } from '../types/index.js';

export class TemplateLoader {
  private templates: Map<string, Template> = new Map();
  private loaded = false;

  /**
   * Load all available templates
   */
  async loadTemplates(): Promise<void> {
    if (this.loaded) return;

    const templateConfigs: Template[] = [
      {
        id: 'standard',
        name: 'Standard',
        description: 'Clean, professional design suitable for all genres',
        category: 'standard',
        preview: 'templates/previews/standard.png',
        file: 'templates/PRIV-MediaKit.html',
        tags: ['professional', 'clean', 'versatile'],
        featured: true
      },
      {
        id: 'dramatic',
        name: 'Dramatic',
        description: 'Bold, high-contrast design with strong visual impact',
        category: 'dramatic',
        preview: 'templates/previews/dramatic.png',
        file: 'templates/PRIV-MediaKit-Dramatic.html',
        tags: ['bold', 'high-contrast', 'impactful'],
        featured: true
      },
      {
        id: 'v2',
        name: 'Modern V2',
        description: 'Contemporary design with modern aesthetics',
        category: 'modern',
        preview: 'templates/previews/v2.png',
        file: 'templates/PRIV-MediaKit-v2.html',
        tags: ['modern', 'contemporary', 'sleek'],
        featured: true
      },
      {
        id: 'brand-board',
        name: 'Brand Board',
        description: 'Brand-focused layout with cohesive visual identity',
        category: 'brand-board',
        preview: 'templates/previews/brand-board.png',
        file: 'templates/PRIV-BrandBoard.html',
        tags: ['branding', 'cohesive', 'identity'],
        featured: true
      },
      {
        id: 'mediakit-1',
        name: 'Media Kit 1',
        description: 'Alternative variation with unique layout',
        category: 'standard',
        preview: 'templates/previews/mediakit-1.png',
        file: 'templates/priv-mediakit_1.html',
        tags: ['alternative', 'unique', 'layout'],
        featured: false
      },
      {
        id: 'mediakit-2',
        name: 'Media Kit 2',
        description: 'Another alternative variation',
        category: 'standard',
        preview: 'templates/previews/mediakit-2.png',
        file: 'templates/priv-mediakit_2.html',
        tags: ['alternative', 'unique', 'layout'],
        featured: false
      }
    ];

    templateConfigs.forEach(config => {
      this.templates.set(config.id, config);
    });

    this.loaded = true;
  }

  /**
   * Get all templates
   */
  getAllTemplates(): Template[] {
    if (!this.loaded) {
      throw new Error('Templates not loaded. Call loadTemplates() first.');
    }
    return Array.from(this.templates.values());
  }

  /**
   * Get featured templates
   */
  getFeaturedTemplates(): Template[] {
    return this.getAllTemplates().filter(t => t.featured);
  }

  /**
   * Get template by ID
   */
  getTemplateById(id: string): Template | undefined {
    return this.templates.get(id);
  }

  /**
   * Get templates by category
   */
  getTemplatesByCategory(category: Template['category']): Template[] {
    return this.getAllTemplates().filter(t => t.category === category);
  }

  /**
   * Search templates by tags
   */
  searchTemplates(query: string): Template[] {
    const lowerQuery = query.toLowerCase();
    return this.getAllTemplates().filter(t =>
      t.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
      t.name.toLowerCase().includes(lowerQuery) ||
      t.description.toLowerCase().includes(lowerQuery)
    );
  }

  /**
   * Load template HTML content
   */
  async loadTemplateContent(templateId: string): Promise<string> {
    const template = this.getTemplateById(templateId);
    if (!template) {
      throw new Error(`Template with ID ${templateId} not found`);
    }

    try {
      const response = await fetch(template.file);
      if (!response.ok) {
        throw new Error(`Failed to load template: ${response.statusText}`);
      }
      return await response.text();
    } catch (error) {
      console.error('Error loading template content:', error);
      throw error;
    }
  }
}