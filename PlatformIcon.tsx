import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from 'lucide-react-native';
import { Platform } from '@/types';
import { platformColors } from '@/constants/theme';


interface PlatformIconProps {
  platform: Platform;
  size?: number;
}


export const PlatformIcon: React.FC<PlatformIconProps> = ({ platform, size = 20 }) => {
  const color = platformColors[platform] || '#FFFFFF';


  const iconMap = {
    facebook: Facebook,
    instagram: Instagram,
    twitter: Twitter,
    linkedin: Linkedin,
    youtube: Youtube,
    tiktok: null,
    pinterest: null,
  };


  const Icon = iconMap[platform];


  if (!Icon) {
    return (
      <View style={[styles.iconPlaceholder, { width: size, height: size, backgroundColor: color }]} />
    );
  }


  return <Icon size={size} color={color} />;
};


const styles = StyleSheet.create({
  iconPlaceholder: {
    borderRadius: 4,
  },
});

