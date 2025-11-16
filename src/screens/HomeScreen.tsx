import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppContext } from '../context/AppContext';
import { checklist } from '../data/checklist';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { profile, checklistProgress, t } = useAppContext();

  const totalTasks = checklist.reduce((acc, section) => acc + section.tasks.length, 0);
  const completedTasks = Object.values(checklistProgress).filter(Boolean).length;
  const progress = totalTasks ? completedTasks / totalTasks : 0;

  const quickActions = [
    { label: t('home.openChecklist'), route: 'Checklist' },
    { label: t('home.openMap'), route: 'Map' },
    { label: t('home.openProfile'), route: 'Profile' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('home.title')}</Text>
      <Text style={styles.greeting}>{t('home.greeting', { name: profile.name.split(' ')[0] || 'Friend' })}</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>{t('home.checklistProgress')}</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressValue, { width: `${progress * 100}%` }]} />
        </View>
        <Text style={styles.progressText}>
          {t('checklist.completed', { done: completedTasks, total: totalTasks })}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>{t('home.quickActions')}</Text>
        <View style={styles.actionsContainer}>
          {quickActions.map((action) => (
            <TouchableOpacity
              key={action.label}
              style={styles.actionButton}
              onPress={() => navigation.navigate(action.route)}
            >
              <Text style={styles.actionText}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f6f7fb',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
    color: '#0f172a',
  },
  greeting: {
    fontSize: 16,
    color: '#475569',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#111827',
  },
  progressBar: {
    height: 12,
    backgroundColor: '#e2e8f0',
    borderRadius: 8,
    overflow: 'hidden',
  },
  progressValue: {
    height: '100%',
    backgroundColor: '#2563eb',
  },
  progressText: {
    marginTop: 12,
    fontSize: 14,
    color: '#475569',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#1d4ed8',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  actionText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default HomeScreen;
