import * as html2canvas from 'html-to-image';
import { jsPDF } from 'jspdf';
import { ExportOptions } from '../types/index.js';

export class MediaKitExporter {
  /**
   * Export media kit as HTML file
   */
  async exportAsHTML(
    element: HTMLElement,
    options: ExportOptions = { format: 'html' }
  ): Promise<void> {
    const filename = options.filename || 'media-kit.html';
    const htmlContent = element.outerHTML;

    // Create a download link
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  /**
   * Export media kit as PNG image
   */
  async exportAsPNG(
    element: HTMLElement,
    options: ExportOptions = { format: 'png' }
  ): Promise<void> {
    const filename = options.filename || 'media-kit.png';
    const quality = options.quality || 'high';

    const qualityMap = {
      low: 1,
      medium: 2,
      high: 4
    };

    try {
      const dataUrl = await html2canvas.toPng(element);

      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error exporting as PNG:', error);
      throw error;
    }
  }

  /**
   * Export media kit as PDF
   */
  async exportAsPDF(
    element: HTMLElement,
    options: ExportOptions = { format: 'pdf' }
  ): Promise<void> {
    const filename = options.filename || 'media-kit.pdf';

    try {
      // First convert to PNG
      const dataUrl = await html2canvas.toPng(element);

      // Get dimensions
      const img = new Image();
      img.src = dataUrl;
      
      await new Promise((resolve) => {
        img.onload = resolve;
      });

      // Create PDF
      const pdf = new jsPDF({
        orientation: img.width > img.height ? 'l' : 'p',
        unit: 'px',
        format: [img.width, img.height]
      });

      pdf.addImage(dataUrl, 'PNG', 0, 0, img.width, img.height);
      pdf.save(filename);
    } catch (error) {
      console.error('Error exporting as PDF:', error);
      throw error;
    }
  }

  /**
   * Main export method
   */
  async export(
    element: HTMLElement,
    options: ExportOptions = { format: 'html' }
  ): Promise<void> {
    switch (options.format) {
      case 'html':
        return this.exportAsHTML(element, options);
      case 'png':
        return this.exportAsPNG(element, options);
      case 'pdf':
        return this.exportAsPDF(element, options);
      default:
        throw new Error(`Unsupported export format: ${options.format}`);
    }
  }
}