import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { Stack } from 'expo-router';
import { theme } from '@/constants/theme';
import { useApp } from '@/contexts/AppContext';
import { MessageCircle, Send } from 'lucide-react-native';
import { PlatformIcon } from '@/components/PlatformIcon';
import type { Message } from '@/types';


export default function CommentsScreen() {
  const { messages, markMessageAsRead } = useApp();
  const [replyText, setReplyText] = useState<string>('');
  const [selectedComment, setSelectedComment] = useState<string | null>(null);


  const comments = messages.filter(m => m.type === 'comment');


  const handleReply = (commentId: string) => {
    setSelectedComment(commentId);
  };


  const sendReply = () => {
    if (!replyText.trim()) return;
    console.log('Sending reply:', replyText, 'to comment:', selectedComment);
    setReplyText('');
    setSelectedComment(null);
  };


  const renderComment = ({ item }: { item: Message }) => (
    <TouchableOpacity
      style={[styles.commentCard, !item.isRead && styles.unreadCard]}
      onPress={() => {
        markMessageAsRead(item.id);
        handleReply(item.id);
      }}
    >
      <View style={styles.commentHeader}>
        <View style={styles.commentUser}>
          {item.fromAvatar ? (
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{item.from[0].toUpperCase()}</Text>
            </View>
          ) : (
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{item.from[0].toUpperCase()}</Text>
            </View>
          )}
          <View style={styles.commentUserInfo}>
            <Text style={styles.commentUserName}>{item.from}</Text>
            <Text style={styles.commentTimestamp}>
              {new Date(item.timestamp).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </View>
        </View>
        <PlatformIcon platform={item.platform} size={20} />
      </View>


      <Text style={styles.commentContent}>{item.content}</Text>


      {!item.isRead && <View style={styles.unreadBadge} />}

