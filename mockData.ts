import { SocialAccount, Message, Post, AnalyticsData, Subscription } from '@/types';


export const mockSocialAccounts: SocialAccount[] = [
  {
    id: '1',
    platform: 'instagram',
    username: '@yourhandle',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/png?seed=instagram',
    isConnected: true,
    followers: 12543,
    connectedAt: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    platform: 'twitter',
    username: '@yourhandle',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/png?seed=twitter',
    isConnected: true,
    followers: 8234,
    connectedAt: '2024-01-20T14:20:00Z',
  },
  {
    id: '3',
    platform: 'facebook',
    username: 'Your Page',
    isConnected: false,
  },
  {
    id: '4',
    platform: 'linkedin',
    username: 'Your Company',
    isConnected: false,
  },
];


export const mockMessages: Message[] = [
  {
    id: '1',
    platform: 'instagram',
    from: 'sarah_designs',
    fromAvatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=sarah',
    content: 'Love your recent post! Can you share more about your process?',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    isRead: false,
    type: 'message',
  },
  {
    id: '2',
    platform: 'twitter',
    from: 'tech_enthusiast',
    fromAvatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=tech',
    content: 'This is exactly what I needed! Thanks for sharing.',
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    isRead: false,
    type: 'comment',
    postId: 'post123',
  },
  {
    id: '3',
    platform: 'instagram',
    from: 'creative_minds',
    fromAvatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=creative',
    content: 'Would love to collaborate with you!',
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    isRead: true,