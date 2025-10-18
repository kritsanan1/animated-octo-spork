import { useState, useEffect, useCallback, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createContextHook from '@nkzw/create-context-hook';
import { SocialAccount, Post, Message, AnalyticsData, Subscription } from '@/types';
import { Language, getTranslation } from '@/constants/i18n';
import { 
  mockSocialAccounts, 
  mockMessages, 
  mockPosts, 
  mockAnalytics,
  mockSubscription 
} from '@/constants/mockData';


const STORAGE_KEYS = {
  AYRSHARE_API_KEY: 'ayrshare_api_key',
  SOCIAL_ACCOUNTS: 'social_accounts',
  POSTS: 'posts',
  MESSAGES: 'messages',
  LANGUAGE: 'language',
  USER_NAME: 'user_name',
  USER_EMAIL: 'user_email',
  USER_AVATAR: 'user_avatar',
};


export const [AppProvider, useApp] = createContextHook(() => {
  const [ayrshareApiKey, setAyrshareApiKey] = useState<string>('');
  const [socialAccounts, setSocialAccounts] = useState<SocialAccount[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [analytics] = useState<AnalyticsData>(mockAnalytics);
  const [subscription] = useState<Subscription>(mockSubscription);
  const [isLoading, setIsLoading] = useState(true);
  const [language, setLanguage] = useState<Language>('en');
  const [userName, setUserName] = useState<string>('Social Hub User');
  const [userEmail, setUserEmail] = useState<string>('user@example.com');
  const [userAvatar, setUserAvatar] = useState<string | null>(null);


  useEffect(() => {
    loadStoredData();
  }, []);


  const loadStoredData = async () => {
    try {
      setIsLoading(true);
      const [
        storedApiKey, 
        storedAccounts, 
        storedPosts, 
        storedMessages,
        storedLanguage,
        storedUserName,
        storedUserEmail,
        storedUserAvatar,
      ] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.AYRSHARE_API_KEY),
        AsyncStorage.getItem(STORAGE_KEYS.SOCIAL_ACCOUNTS),
        AsyncStorage.getItem(STORAGE_KEYS.POSTS),
        AsyncStorage.getItem(STORAGE_KEYS.MESSAGES),
        AsyncStorage.getItem(STORAGE_KEYS.LANGUAGE),
        AsyncStorage.getItem(STORAGE_KEYS.USER_NAME),
        AsyncStorage.getItem(STORAGE_KEYS.USER_EMAIL),
        AsyncStorage.getItem(STORAGE_KEYS.USER_AVATAR),
      ]);


      if (storedApiKey) setAyrshareApiKey(storedApiKey);