import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Modal } from 'react-native';
import { Stack } from 'expo-router';
import { Plus, Check, Key } from 'lucide-react-native';
import { useApp } from '@/contexts/AppContext';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { PlatformIcon } from '@/components/PlatformIcon';
import { theme } from '@/constants/theme';
import { Platform } from '@/types';
import { format } from 'date-fns';


export default function ConnectScreen() {
  const { socialAccounts, updateSocialAccounts, ayrshareApiKey, saveAyrshareApiKey } = useApp();
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState(ayrshareApiKey);
  const [isSavingKey, setIsSavingKey] = useState(false);


  const handleConnectPlatform = async (platform: Platform) => {
    const updatedAccounts = socialAccounts.map(account => {
      if (account.platform === platform) {
        return {
          ...account,
          isConnected: !account.isConnected,
          connectedAt: !account.isConnected ? new Date().toISOString() : undefined,
        };
      }
      return account;
    });
    await updateSocialAccounts(updatedAccounts);
  };


  const handleSaveApiKey = async () => {
    if (!apiKeyInput.trim()) return;
    
    setIsSavingKey(true);
    try {
      await saveAyrshareApiKey(apiKeyInput);
      setShowApiKeyModal(false);
    } catch (error) {
      console.error('Error saving API key:', error);
    } finally {
      setIsSavingKey(false);
    }
  };


  const connectedCount = socialAccounts.filter(a => a.isConnected).length;


  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Connect Platforms',
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
          headerShadowVisible: false,
        }}
      />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Connect Accounts</Text>
            <Text style={styles.subtitle}>
              {connectedCount} of {socialAccounts.length} platforms connected
            </Text>