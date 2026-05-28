/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ServiceId = 
  | 'general-english'
  | 'exam-prep'
  | 'business-english'
  | 'conversational'
  | 'university'
  | 'immigration';

export interface PriceTier {
  id: string;
  name: string;
  price: string;
  period: string;
  outcome: string;
  isPopular?: boolean;
  tag?: string;
  hasInstallments?: boolean; // Рассрочка
  features: string[];
}

export interface ServiceData {
  id: ServiceId;
  title: string;
  slogan: string;
  description: string;
  iconState: 'learning' | 'graduating' | 'business' | 'chatting' | 'university' | 'passport';
  themeColor: string; // Tailwind accent base
  gradientFrom: string;
  gradientTo: string;
  pricingTiers: PriceTier[];
}

export interface LeadData {
  name: string;
  whatsapp: string;
  goal: string;
  score?: number;
  discount?: number;
  promoCode?: string;
  timestamp: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  avatar: string;
  rating: number;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
  suffix?: string;
}
