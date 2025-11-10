// User Types
export interface User {
  id: string;
  email: string;
  role: 'creator' | 'brand' | 'admin';
  status: 'active' | 'suspended' | 'deleted';
  email_verified: boolean;
  phone?: string;
  phone_verified: boolean;
  created_at: Date;
  updated_at: Date;
  last_login?: Date;
}

// Creator Types
export interface Creator {
  id: string;
  user_id: string;
  display_name: string;
  bio?: string;
  avatar_url?: string;
  banner_url?: string;
  country?: string;
  city?: string;
  timezone?: string;
  primary_niche: string;
  secondary_niches?: string[];
  languages?: string[];
  experience_years?: number;
  verified: boolean;
  verification_badge?: 'verified' | 'pro' | 'elite';
  total_followers: number;
  avg_engagement_rate: number;
  total_projects: number;
  completed_projects: number;
  avg_rating: number;
  total_earnings: number;
  subscription_tier: 'free' | 'pro' | 'elite';
  available_for_work: boolean;
  created_at: Date;
  updated_at: Date;
}

// Brand Types
export interface Brand {
  id: string;
  user_id: string;
  company_name: string;
  website?: string;
  logo_url?: string;
  industry: string;
  company_size?: 'startup' | 'small' | 'medium' | 'enterprise';
  country?: string;
  city?: string;
  contact_name?: string;
  contact_phone?: string;
  verified: boolean;
  total_projects: number;
  total_spent: number;
  avg_rating: number;
  subscription_tier: 'free' | 'business' | 'enterprise';
  created_at: Date;
  updated_at: Date;
}

// Project Types
export interface Project {
  id: string;
  brand_id: string;
  creator_id: string;
  gig_id?: string;
  title: string;
  description: string;
  category: string;
  budget: number;
  currency: string;
  deadline?: Date;
  delivery_date?: Date;
  status: 'pending' | 'accepted' | 'in_progress' | 'submitted' | 'revision' | 'completed' | 'cancelled' | 'disputed';
  deliverable_urls?: string[];
  revision_count: number;
  max_revisions: number;
  created_at: Date;
  updated_at: Date;
}

// Transaction Types
export interface Transaction {
  id: string;
  project_id: string;
  amount: number;
  currency: string;
  platform_fee: number;
  creator_earnings: number;
  payment_gateway: 'flutterwave' | 'paystack' | 'stripe';
  gateway_transaction_id?: string;
  gateway_reference?: string;
  status: 'pending' | 'authorized' | 'captured' | 'released' | 'refunded' | 'failed' | 'disputed';
  in_escrow: boolean;
  escrow_released_at?: Date;
  payout_status: 'pending' | 'processing' | 'completed' | 'failed';
  created_at: Date;
  updated_at: Date;
}

// Social Media Types
export interface SocialMediaAccount {
  id: string;
  creator_id: string;
  platform: 'facebook' | 'instagram' | 'twitter' | 'youtube' | 'tiktok';
  username: string;
  profile_url: string;
  followers_count: number;
  following_count: number;
  posts_count: number;
  avg_likes: number;
  avg_comments: number;
  avg_shares: number;
  engagement_rate: number;
  verified: boolean;
  verified_by_us: boolean;
  last_synced_at?: Date;
  sync_status: 'active' | 'failed' | 'disconnected';
  created_at: Date;
  updated_at: Date;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T = any> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Search & Filter Types
export interface CreatorFilters {
  niche?: string;
  country?: string;
  min_followers?: number;
  max_followers?: number;
  min_engagement?: number;
  verified?: boolean;
  available?: boolean;
  min_rating?: number;
}

export interface ProjectFilters {
  status?: string;
  min_budget?: number;
  max_budget?: number;
  category?: string;
}
