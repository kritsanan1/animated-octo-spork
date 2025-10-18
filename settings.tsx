import { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Switch, 
  TextInput,
  Animated,
  Modal,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { theme } from '@/constants/theme';
import { useApp } from '@/contexts/AppContext';
import { Language } from '@/constants/i18n';
import { Bell, Lock, Key, Trash2, Moon, Globe, HelpCircle, Check } from 'lucide-react-native';


export default function SettingsScreen() {
  const router = useRouter();
  const { ayrshareApiKey, saveAyrshareApiKey, t, language, changeLanguage } = useApp();
  const [notifications, setNotifications] = useState<boolean>(true);
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [apiKey, setApiKey] = useState<string>(ayrshareApiKey);
  const [isEditingApiKey, setIsEditingApiKey] = useState<boolean>(false);
  const [showLanguageModal, setShowLanguageModal] = useState<boolean>(false);
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;


  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);


  const handleSaveApiKey = async () => {
    try {
      await saveAyrshareApiKey(apiKey);
      setIsEditingApiKey(false);
    } catch (error) {
      console.error('Failed to save API key:', error);
    }
  };


  const handleLanguageChange = async (lang: Language) => {
    try {
      await changeLanguage(lang);
      setShowLanguageModal(false);
    } catch (error) {
      console.error('Failed to change language:', error);
    }
  };


  const animateToggle = (value: boolean, setter: (v: boolean) => void) => {
    const scaleValue = new Animated.Value(1);