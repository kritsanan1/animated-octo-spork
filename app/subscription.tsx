import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { Check, CreditCard, Calendar, AlertCircle } from 'lucide-react-native';
import { useApp } from '@/contexts/AppContext';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { theme } from '@/constants/theme';
import { pricingPlans } from '@/constants/mockData';
import { format, addMonths } from 'date-fns';


export default function SubscriptionScreen() {
  const { subscription } = useApp();
  const [selectedPlan, setSelectedPlan] = useState(subscription.plan);
  const [isProcessing, setIsProcessing] = useState(false);


  const handleUpgrade = async (planId: string) => {
    setIsProcessing(true);
    try {
      console.log('Upgrading to plan:', planId);
      await new Promise(resolve => setTimeout(resolve, 1500));
    } catch (error) {
      console.error('Error upgrading plan:', error);
    } finally {
      setIsProcessing(false);
    }
  };


  const currentPlan = pricingPlans.find(p => p.id === subscription.plan);


  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Subscription',
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
          headerShadowVisible: false,
        }}
      />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Subscription & Billing</Text>
          <Text style={styles.subtitle}>Manage your plan and payments</Text>
        </View>


        <Card style={styles.currentPlanCard}>
          <View style={styles.currentPlanHeader}>
            <View>
              <Text style={styles.currentPlanLabel}>Current Plan</Text>
              <Text style={styles.currentPlanName}>{currentPlan?.name}</Text>
            </View>
            <View style={[
              styles.statusBadge,
              subscription.status === 'active' && styles.statusBadgeActive,
              subscription.status === 'canceled' && styles.statusBadgeCanceled,
            ]}>
              <Text style={[
                styles.statusText,
                subscription.status === 'active' && styles.statusTextActive,
                subscription.status === 'canceled' && styles.statusTextCanceled,
              ]}>
                {subscription.status}
              </Text>
            </View>