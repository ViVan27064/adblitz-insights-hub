
export interface User {
  email: string;
  name: string;
  initials: string;
}

export interface TrendData {
  keyword: string;
  count: number;
  platform: 'Instagram' | 'Twitter' | 'LinkedIn' | 'Facebook';
}

export interface TrackingData {
  roi: { label: string; value: number }[];
  clicks: { date: string; value: number }[];
  suggestions: { text: string; type: 'positive' | 'negative' }[];
}

export interface TargetingData {
  id: number;
  demographic: string;
  location: string;
  interest: string;
  potential: number;
}

export interface CompetitorData {
  keyword: string;
  ourClicks: number;
  competitorName: string;
  competitorClicks: number;
}

export interface SWOTData {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface BudgetData {
  allocation: { category: string; value: number }[];
  suggestions: string[];
}

export interface CampaignFormData {
  platform: string;
  adType: string;
  budget: number;
  audience: {
    age: string[];
    location: string[];
    interest: string[];
  };
}
