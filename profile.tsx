import { useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Animated,
  Image,
  Alert,
  ActionSheetIOS,
  Platform,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { theme } from '@/constants/theme';
import { useApp } from '@/contexts/AppContext';
import { User, Mail, Calendar, Settings, LogOut, TrendingUp, Camera } from 'lucide-react-native';
import { PlatformIcon } from '@/components/PlatformIcon';
import React from "react";


function StatCard({ 
  label, 
  value, 
  icon: Icon, 
  index 
}: { 
  label: string; 
  value: string; 
  icon: React.ComponentType<{ size: number; color: string }>; 
  index: number;
}) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;


  useEffect(() => {
    const delay = index * 100;
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim, index]);


  return (
    <Animated.View 
      style={[
        styles.statCard,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <Icon size={24} color={theme.colors.primary} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>