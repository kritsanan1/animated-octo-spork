import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Animated } from 'react-native';
import { Stack } from 'expo-router';
import { TrendingUp, Users, MessageSquare, BarChart3 } from 'lucide-react-native';
import { useApp } from '@/contexts/AppContext';
import { Card } from '@/components/Card';
import { PlatformIcon } from '@/components/PlatformIcon';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { theme } from '@/constants/theme';
import { format } from 'date-fns';


const { width } = Dimensions.get('window');


function StatCard({ 
  icon: Icon, 
  value, 
  label, 
  change, 
  index,
  color 
}: { 
  icon: React.ComponentType<{ size: number; color: string }>; 
  value: string; 
  label: string; 
  change: string;
  index: number;
  color: string;
}) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;


  useEffect(() => {
    const delay = index * 100;
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        delay,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        delay,
        useNativeDriver: true,
        tension: 50,
        friction: 7,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        delay,
        useNativeDriver: true,
        tension: 50,
        friction: 7,
      }),
    ]).start();
  }, [fadeAnim, slideAnim, scaleAnim, index]);


  return (
    <Animated.View
      style={[
        styles.statCard,
        {
          opacity: fadeAnim,
          transform: [