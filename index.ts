export type Platform = 'facebook' | 'instagram' | 'twitter' | 'linkedin' | 'youtube' | 'tiktok' | 'pinterest';


export interface SocialAccount {
  id: string;
  platform: Platform;
  username: string;
  profileImage?: string;
  isConnected: boolean;
  followers?: number;
  connectedAt?: string;
}


export interface Post {
  id: string;
  content: string;
  mediaUrls?: string[];
  platforms: Platform[];
  scheduledAt?: string;
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  createdAt: string;
  engagement?: {
    likes: number;
    comments: number;
    shares: number;
    views: number;
  };
}


export interface Message {
  id: string;
  platform: Platform;
  from: string;
  fromAvatar?: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  type: 'message' | 'comment';
  postId?: string;
}


export interface AnalyticsData {
  totalEngagement: number;
  totalReach: number;
  totalPosts: number;
  engagementRate: number;
  platformBreakdown: {
    platform: Platform;
    engagement: number;
    followers: number;
  }[];
  recentActivity: {
    date: string;
    engagement: number;
  }[];
}


export interface Subscription {
  id: string;
  plan: 'free' | 'pro' | 'enterprise';
  status: 'active' | 'canceled' | 'past_due';
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
}


export interface AyrshareProfile {