export type LandingNavHref =
  | '#features'
  | '#solutions'
  | '#pricing'
  | '#faq'
  | '#contact'
  | '/signin'
  | '/register';

export interface LandingNavItem {
  id: string;
  label: string;
  href: LandingNavHref;
}

export interface LandingFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface LandingStep {
  id: string;
  step: number;
  title: string;
  description: string;
}

export interface LandingCapability {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface LandingComparisonRow {
  id: string;
  feature: string;
  traditional: string;
  nexgen: string;
}

export interface LandingPlan {
  id: string;
  name: string;
  description: string;
  features: string[];
  recommended: boolean;
  ctaLabel: string;
}

export interface LandingTestimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  initials: string;
}

export interface LandingFaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface LandingIntegration {
  id: string;
  name: string;
  description: string;
}

export interface LandingLogoItem {
  id: string;
  name: string;
}

export interface ContactRequest {
  name: string;
  email: string;
  company: string;
  phone_number?: string;
  subject: string;
  message: string;
  website?: string;
}

export interface ContactSuccessResponse {
  success: true;
  message: string;
}

export interface ContactState {
  submitting: boolean;
  error: string | null;
  successMessage: string | null;
}
