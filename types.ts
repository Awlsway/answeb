
export type LanguageCode = 'en' | 'my';

export interface Product {
  id: string;
  slug: string;
  language_code: LanguageCode;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  status: string;
  demo_url?: string;
  image_url: string;
  video_url?: string;
  created_at?: string;
}

export interface Testimonial {
  id: string;
  language_code: LanguageCode;
  client_name: string;
  business_name: string;
  quote: string;
  rating: number;
  logo_url: string;
}

export interface ContentSection {
  id: string;
  section_key: string;
  language_code: LanguageCode;
  headline: string;
  subtext: string;
  cta_label?: string;
}

export interface Lead {
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
  language_code: LanguageCode;
}

export interface AppState {
  language: LanguageCode;
  products: Product[];
  testimonials: Testimonial[];
  sections: Record<string, ContentSection>;
  isLoading: boolean;
  error: string | null;
}
