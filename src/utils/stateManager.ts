import { BuilderState, MediaKitElement, ExportOptions } from '../types/index.js';

export class StateManager {
  private state: BuilderState;
  private listeners: Array<(state: BuilderState) => void> = [];
  private storageKey = 'priv-mediakit-state';

  constructor() {
    this.state = this.loadState();
  }

  /**
   * Get current state
   */
  getState(): BuilderState {
    return { ...this.state };
  }

  /**
   * Update state
   */
  updateState(updates: Partial<BuilderState>): void {
    this.state = { ...this.state, ...updates };
    this.saveState();
    this.notifyListeners();
  }

  /**
   * Set selected template
   */
  setSelectedTemplate(templateId: string): void {
    this.updateState({ selectedTemplate: templateId });
  }

  /**
   * Add element to builder
   */
  addElement(element: MediaKitElement): void {
    this.updateState({
      elements: [...this.state.elements, element]
    });
  }

  /**
   * Remove element from builder
   */
  removeElement(elementId: string): void {
    this.updateState({
      elements: this.state.elements.filter(e => e.id !== elementId)
    });
  }

  /**
   * Update element
   */
  updateElement(elementId: string, updates: Partial<MediaKitElement>): void {
    this.updateState({
      elements: this.state.elements.map(e =>
        e.id === elementId ? { ...e, ...updates } : e
      )
    });
  }

  /**
   * Reorder elements
   */
  reorderElements(fromIndex: number, toIndex: number): void {
    const elements = [...this.state.elements];
    const [removed] = elements.splice(fromIndex, 1);
    elements.splice(toIndex, 0, removed);
    this.updateState({ elements });
  }

  /**
   * Update custom styles
   */
  updateCustomStyles(styles: Record<string, any>): void {
    this.updateState({
      customStyles: { ...this.state.customStyles, ...styles }
    });
  }

  /**
   * Toggle preview mode
   */
  togglePreviewMode(): void {
    this.updateState({
      previewMode: !this.state.previewMode
    });
  }

  /**
   * Reset state
   */
  resetState(): void {
    this.state = this.getDefaultState();
    this.saveState();
    this.notifyListeners();
  }

  /**
   * Subscribe to state changes
   */
  subscribe(listener: (state: BuilderState) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  /**
   * Save state to localStorage
   */
  private saveState(): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.state));
    } catch (error) {
      console.error('Error saving state:', error);
    }
  }

  /**
   * Load state from localStorage
   */
  private loadState(): BuilderState {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error('Error loading state:', error);
    }
    return this.getDefaultState();
  }

  /**
   * Get default state
   */
  private getDefaultState(): BuilderState {
    return {
      selectedTemplate: null,
      elements: [],
      customStyles: {},
      previewMode: false
    };
  }

  /**
   * Notify all listeners of state change
   */
  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.getState()));
  }
}