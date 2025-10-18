import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '@/constants/theme';
import { Mail, Lock, User, Zap } from 'lucide-react-native';


export default function SignupScreen() {
  const router = useRouter();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      return;
    }


    if (password !== confirmPassword) {
      return;
    }


    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.replace('/dashboard');
    }, 1000);
  };


  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <Zap size={48} color={theme.colors.primary} fill={theme.colors.primary} />
            </View>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join Social Hub today</Text>
          </View>


          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <User size={20} color={theme.colors.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor={theme.colors.textSecondary}
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                autoComplete="name"
              />
            </View>


            <View style={styles.inputContainer}>
              <Mail size={20} color={theme.colors.textSecondary} style={styles.inputIcon} />