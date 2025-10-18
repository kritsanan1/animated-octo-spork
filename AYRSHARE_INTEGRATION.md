# Ayrshare API Integration Guide


## Overview
This app integrates with [Ayrshare](https://www.ayrshare.com/) for social media management functionality.


## Setup


### 1. Get Your API Key
1. Sign up at [Ayrshare](https://www.ayrshare.com/)
2. Navigate to your dashboard
3. Generate an API key


### 2. Add API Key to the App
1. Open the app and navigate to the **Connect** tab
2. Click **Add API Key**
3. Enter your Ayrshare API key
4. Click **Save**


## Features Using Ayrshare


### Post Management
- Create posts across multiple platforms
- Schedule posts for future dates
- View post history and analytics
- Delete scheduled posts


### Social Account Management
- Connect multiple social media accounts
- View account metrics (followers, engagement)
- Manage connected platforms


### Analytics
- Track engagement across platforms
- View platform-specific breakdowns
- Monitor posting performance


## API Service Implementation


The Ayrshare service is implemented in `services/ayrshare.ts` and includes:


- `createPost()` - Create and schedule posts
- `deletePost()` - Remove scheduled posts
- `getPost()` - Retrieve post details
- `getHistory()` - Fetch posting history
- `getAnalytics()` - Get platform analytics
- `getSocialAccounts()` - List connected accounts


## Usage Example


```typescript
import { createAyrshareService } from '@/services/ayrshare';
import { useApp } from '@/contexts/AppContext';


const { ayrshareApiKey } = useApp();
const ayrshare = createAyrshareService(ayrshareApiKey);


// Create a post
await ayrshare.createPost({
  post: 'Hello from Social Manager!',
  platforms: ['instagram', 'twitter'],
  mediaUrls: ['https://example.com/image.jpg'],
  scheduleDate: '2024-12-25T10:00:00Z', // Optional
});
```

