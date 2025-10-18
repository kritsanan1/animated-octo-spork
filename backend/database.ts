export type Platform = 'facebook' | 'instagram' | 'twitter' | 'linkedin' | 'youtube' | 'tiktok' | 'pinterest';


export interface DatabasePost {
  id: string;
  user_id: string;
  content: string;
  media_urls: string[] | null;
  platforms: Platform[];
  scheduled_at: string | null;
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  ayrshare_id: string | null;
  created_at: string;
  updated_at: string;
  engagement_likes: number;
  engagement_comments: number;
  engagement_shares: number;
  engagement_views: number;
}


export interface DatabaseSocialAccount {
  id: string;
  user_id: string;
  platform: Platform;
  username: string;
  profile_image: string | null;
  is_connected: boolean;
  followers: number | null;
  connected_at: string;
  access_token: string | null;
  refresh_token: string | null;
  expires_at: string | null;
}


export interface DatabaseMessage {
  id: string;
  user_id: string;
  platform: Platform;
  from_username: string;
  from_avatar: string | null;
  content: string;
  timestamp: string;
  is_read: boolean;
  type: 'message' | 'comment';
  post_id: string | null;
  external_id: string | null;
}


export interface DatabaseUser {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  subscription_plan: 'free' | 'pro' | 'enterprise';
  subscription_status: 'active' | 'canceled' | 'past_due';
  subscription_period_end: string | null;
  ayrshare_api_key: string | null;
  created_at: string;
  updated_at: string;
}


export interface DatabaseAnalytics {
  id: string;
  user_id: string;
  date: string;
  platform: Platform;