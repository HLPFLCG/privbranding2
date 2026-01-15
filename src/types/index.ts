// Core types for the Media Kit Builder

export interface Artist {
  name: string;
  genre: string;
  location: string;
  bio: string;
  image: string;
  socialLinks: SocialLinks;
  streamingLinks: StreamingLinks;
}

export interface SocialLinks {
  instagram?: string;
  twitter?: string;
  facebook?: string;
  tiktok?: string;
  youtube?: string;
  spotify?: string;
  soundcloud?: string;
}

export interface StreamingLinks {
  spotify?: string;
  appleMusic?: string;
  youtubeMusic?: string;
  soundcloud?: string;
  bandcamp?: string;
}

export interface Release {
  title: string;
  type: 'single' | 'ep' | 'album';
  releaseDate: string;
  coverArt: string;
  streams: number;
  description?: string;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  management?: string;
  booking?: string;
  press?: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  category: TemplateCategory;
  preview: string;
  file: string;
  tags: string[];
  featured: boolean;
}

export type TemplateCategory = 
  | 'standard' 
  | 'dramatic' 
  | 'modern' 
  | 'brand-board' 
  | 'electronic' 
  | 'indie'
  | 'dark-minimal'
  | 'vibrant'
  | 'professional';

export interface MediaKitElement {
  id: string;
  type: ElementType;
  content: any;
  styles?: Record<string, any>;
  position?: 'top' | 'middle' | 'bottom';
}

export type ElementType =
  | 'hero'
  | 'bio'
  | 'discography'
  | 'contact'
  | 'social-links'
  | 'stats'
  | 'testimonials'
  | 'press-quotes'
  | 'images'
  | 'video';

export interface BuilderState {
  selectedTemplate: string | null;
  elements: MediaKitElement[];
  customStyles: Record<string, any>;
  previewMode: boolean;
}

export interface ExportOptions {
  format: 'html' | 'pdf' | 'png';
  quality?: 'low' | 'medium' | 'high';
  filename?: string;
}