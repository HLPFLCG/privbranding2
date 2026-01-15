export class TemplateCard {
  constructor(
    private template: any,
    private onSelect: (templateId: string) => void
  ) {}

  render(): HTMLElement {
    const card = document.createElement('div');
    card.className = 'template-card';
    card.innerHTML = `
      <div class="template-preview">
        <img src="${this.template.preview}" alt="${this.template.name}" loading="lazy">
        <div class="template-overlay">
          <button class="preview-btn">Preview</button>
          <button class="select-btn">Use Template</button>
        </div>
      </div>
      <div class="template-info">
        <h3>${this.template.name}</h3>
        <p>${this.template.description}</p>
        <div class="template-tags">
          ${this.template.tags.map((tag: string) => 
            `<span class="tag">${tag}</span>`
          ).join('')}
        </div>
      </div>
    `;

    // Add event listeners
    card.querySelector('.select-btn')?.addEventListener('click', () => {
      this.onSelect(this.template.id);
    });

    card.querySelector('.preview-btn')?.addEventListener('click', () => {
      this.openPreview();
    });

    return card;
  }

  private openPreview(): void {
    const modal = document.createElement('div');
    modal.className = 'preview-modal';
    modal.innerHTML = `
      <div class="modal-content">
        <button class="close-btn">&times;</button>
        <iframe src="${this.template.file}" title="${this.template.name}"></iframe>
      </div>
    `;

    modal.querySelector('.close-btn')?.addEventListener('click', () => {
      modal.remove();
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });

    document.body.appendChild(modal);
  }
}