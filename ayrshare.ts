import { Platform, AyrsharePostResponse, AyrshareProfile } from '@/types';


const AYRSHARE_API_URL = 'https://app.ayrshare.com/api';


export class AyrshareService {
  private apiKey: string;


  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }


  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${AYRSHARE_API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
        ...options?.headers,
      },
    });


    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Unknown error' }));
      throw new Error(error.message || `API request failed: ${response.statusText}`);
    }


    return response.json();
  }


  async createPost(params: {
    post: string;
    platforms: Platform[];
    mediaUrls?: string[];
    scheduleDate?: string;
  }): Promise<AyrsharePostResponse> {
    return this.request<AyrsharePostResponse>('/post', {
      method: 'POST',
      body: JSON.stringify({
        post: params.post,
        platforms: params.platforms,
        mediaUrls: params.mediaUrls,
        scheduleDate: params.scheduleDate,
      }),
    });
  }


  async deletePost(id: string): Promise<{ status: string }> {
    return this.request<{ status: string }>('/delete', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    });
  }


  async getPost(id: string): Promise<AyrsharePostResponse> {
    return this.request<AyrsharePostResponse>(`/post/${id}`, {
      method: 'GET',
    });
  }


  async getHistory(params?: {
    lastRecords?: number;
    lastDays?: number;
  }): Promise<{ posts: AyrsharePostResponse[] }> {
    const queryParams = new URLSearchParams();
    if (params?.lastRecords) queryParams.append('lastRecords', params.lastRecords.toString());