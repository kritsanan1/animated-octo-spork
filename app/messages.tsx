import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Stack } from 'expo-router';
import { MessageSquare, MessageCircle } from 'lucide-react-native';
import { useApp } from '@/contexts/AppContext';
import { Card } from '@/components/Card';
import { PlatformIcon } from '@/components/PlatformIcon';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { theme } from '@/constants/theme';
import { formatDistanceToNow } from 'date-fns';


export default function MessagesScreen() {
  const { messages, markMessageAsRead, isLoading } = useApp();


  if (isLoading) {
    return <LoadingSpinner />;
  }


  const handleMessagePress = async (messageId: string) => {
    await markMessageAsRead(messageId);
  };


  const unreadCount = messages.filter(m => !m.isRead).length;


  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Messages & Comments',
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
          headerShadowVisible: false,
        }}
      />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Inbox</Text>
            <Text style={styles.subtitle}>
              {unreadCount > 0 ? `${unreadCount} unread messages` : 'All caught up!'}
            </Text>
          </View>
          {unreadCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{unreadCount}</Text>
            </View>
          )}
        </View>


        {messages.length > 0 ? (
          <View style={styles.messagesList}>
            {messages.map((message) => (
              <TouchableOpacity
                key={message.id}
                onPress={() => handleMessagePress(message.id)}
                activeOpacity={0.7}
              >
                <Card style={[styles.messageCard, !message.isRead && styles.unreadCard]}>
                  <View style={styles.messageHeader}>
                    <View style={styles.avatarContainer}>
                      {message.fromAvatar ? (
                        <Image
                          source={{ uri: message.fromAvatar }}
                          style={styles.avatar}
                        />