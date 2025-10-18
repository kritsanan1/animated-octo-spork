import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { theme } from '@/constants/theme';


interface LoadingSpinnerProps {
  size?: 'small' | 'large';
}


export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'large' }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={theme.colors.primary} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    backgroundColor: theme.colors.background,
  },
});

