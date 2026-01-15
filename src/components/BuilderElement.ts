export class BuilderElement {
  constructor(
    private element: any,
    private onUpdate: (id: string, updates: any) => void,
    private onRemove: (id: string) => void
  ) {}

  render(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'builder-element';
    container.setAttribute('data-id', this.element.id);

    container.innerHTML = `
      <div class="element-header">
        <span class="element-type">${this.formatElementType(this.element.type)}</span>
        <div class="element-actions">
          <button class="edit-btn" title="Edit">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </button>
          <button class="remove-btn" title="Remove">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      </div>
      <div class="element-content">
        ${this.renderElementContent()}
      </div>
      <div class="element-placeholder">
        ${this.element.type} content placeholder
      </div>
    `;

    // Add drag handles
    this.addDragFunctionality(container);

    // Add event listeners
    container.querySelector('.edit-btn')?.addEventListener('click', () => {
      this.openEditModal();
    });

    container.querySelector('.remove-btn')?.addEventListener('click', () => {
      this.onRemove(this.element.id);
    });

    return container;
  }

  private renderElementContent(): string {
    switch (this.element.type) {
      case 'hero':
        return `
          <div class="hero-preview">
            <img src="${this.element.content?.image || ''}" alt="Hero">
            <h2>${this.element.content?.name || 'Artist Name'}</h2>
          </div>
        `;
      case 'bio':
        return `
          <div class="bio-preview">
            <p>${this.element.content?.text || 'Artist bio...'}</p>
          </div>
        `;
      default:
        return `<div class="placeholder">${this.element.type}</div>`;
    }
  }

  private formatElementType(type: string): string {
    return type
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  private openEditModal(): void {
    const modal = document.createElement('div');
    modal.className = 'edit-modal';
    modal.innerHTML = `
      <div class="modal-content">
        <h2>Edit ${this.formatElementType(this.element.type)}</h2>
        <form id="edit-form">
          ${this.renderEditForm()}
          <div class="form-actions">
            <button type="button" class="cancel-btn">Cancel</button>
            <button type="submit" class="save-btn">Save</button>
          </div>
        </form>
      </div>
    `;

    modal.querySelector('.cancel-btn')?.addEventListener('click', () => {
      modal.remove();
    });

    modal.querySelector('#edit-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.saveChanges(modal);
    });

    document.body.appendChild(modal);
  }

  private renderEditForm(): string {
    switch (this.element.type) {
      case 'hero':
        return `
          <div class="form-group">
            <label>Name</label>
            <input type="text" name="name" value="${this.element.content?.name || ''}">
          </div>
          <div class="form-group">
            <label>Image URL</label>
            <input type="url" name="image" value="${this.element.content?.image || ''}">
          </div>
        `;
      case 'bio':
        return `
          <div class="form-group">
            <label>Bio</label>
            <textarea name="bio" rows="5">${this.element.content?.text || ''}</textarea>
          </div>
        `;
      default:
        return '<p>Editing not available for this element type</p>';
    }
  }

  private saveChanges(modal: HTMLElement): void {
    const form = modal.querySelector('#edit-form') as HTMLFormElement;
    const formData = new FormData(form);

    const updates: any = {
      content: {}
    };

    formData.forEach((value, key) => {
      updates.content[key] = value;
    });

    this.onUpdate(this.element.id, updates);
    modal.remove();
  }

  private addDragFunctionality(container: HTMLElement): void {
    container.setAttribute('draggable', 'true');

    container.addEventListener('dragstart', (e) => {
      container.classList.add('dragging');
      e.dataTransfer?.setData('text/plain', this.element.id);
    });

    container.addEventListener('dragend', () => {
      container.classList.remove('dragging');
    });
  }
}