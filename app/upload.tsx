import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Switch } from 'react-native';
import { Stack } from 'expo-router';
import { Calendar, Image as ImageIcon, Send, Clock } from 'lucide-react-native';
import { useApp } from '@/contexts/AppContext';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { PlatformIcon } from '@/components/PlatformIcon';
import { theme } from '@/constants/theme';
import { Platform, Post } from '@/types';
import { format, addDays, startOfWeek } from 'date-fns';


export default function UploadScreen() {
  const { socialAccounts, posts, addPost } = useApp();
  const [postContent, setPostContent] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([]);
  const [isScheduled, setIsScheduled] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const connectedAccounts = socialAccounts.filter(a => a.isConnected);


  const togglePlatform = (platform: Platform) => {
    setSelectedPlatforms(prev =>
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };


  const handleSubmit = async () => {
    if (!postContent.trim() || selectedPlatforms.length === 0) {
      return;
    }


    setIsSubmitting(true);
    try {
      const newPost: Post = {
        id: Date.now().toString(),
        content: postContent,
        platforms: selectedPlatforms,
        status: isScheduled && selectedDate ? 'scheduled' : 'published',
        scheduledAt: isScheduled && selectedDate ? selectedDate.toISOString() : undefined,
        createdAt: new Date().toISOString(),
      };


      await addPost(newPost);
      
      setPostContent('');
      setSelectedPlatforms([]);
      setIsScheduled(false);
      setSelectedDate(null);
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };


  const upcomingPosts = posts.filter(p => p.status === 'scheduled').slice(0, 5);


  const weekStart = startOfWeek(new Date(), { weekStartsOn: 0 });
  const calendarDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));


  const getPostsForDay = (day: Date) => {