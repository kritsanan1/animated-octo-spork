import { Tabs } from 'expo-router';
import React from 'react';
import { LayoutDashboard, MessageSquare, Upload, Link2, CreditCard } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { useApp } from '@/contexts/AppContext';


export default function TabLayout() {
  const { t } = useApp();
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.card,
          borderTopColor: theme.colors.border,
          borderTopWidth: 1,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600' as const,
          marginTop: 4,
        },
        headerShown: true,
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTintColor: theme.colors.text,
        headerShadowVisible: false,
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: t.tabs.dashboard,
          tabBarIcon: ({ color, size }) => <LayoutDashboard size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: t.tabs.messages,
          tabBarIcon: ({ color, size }) => <MessageSquare size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="upload"
        options={{
          title: t.tabs.upload,
          tabBarIcon: ({ color, size }) => <Upload size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="connect"
        options={{
          title: t.tabs.connect,
          tabBarIcon: ({ color, size }) => <Link2 size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="subscription"
        options={{
          title: t.tabs.subscription,
          tabBarIcon: ({ color, size }) => <CreditCard size={size} color={color} />,