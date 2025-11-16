import React from 'react';
import { ScrollView, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { checklist } from '../data/checklist';
import { useAppContext } from '../context/AppContext';

const ChecklistScreen: React.FC = () => {
  const { t, checklistProgress, toggleTask } = useAppContext();

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>
      <Text style={styles.title}>{t('checklist.title')}</Text>
      {checklist.map((section) => {
        const completedTasks = section.tasks.filter((task) => checklistProgress[task.id]).length;
        const sectionProgress = section.tasks.length
          ? Math.round((completedTasks / section.tasks.length) * 100)
          : 0;
        return (
          <View key={section.id} style={styles.section}>
            <View style={styles.sectionHeader}>
              <View>
                <Text style={styles.sectionTitle}>{t(section.titleKey)}</Text>
                <Text style={styles.sectionDescription}>{t(section.descriptionKey)}</Text>
              </View>
              <Text style={styles.sectionProgress}>{sectionProgress}%</Text>
            </View>
            {section.tasks.map((task) => (
              <TouchableOpacity
                key={task.id}
                style={[styles.taskItem, checklistProgress[task.id] && styles.taskItemDone]}
                onPress={() => toggleTask(task.id)}
              >
                <View style={[styles.checkbox, checklistProgress[task.id] && styles.checkboxChecked]}>
                  {checklistProgress[task.id] && <Text style={styles.checkboxMark}>✓</Text>}
                </View>
                <Text style={styles.taskText}>{t(task.titleKey)}</Text>
              </TouchableOpacity>
            ))}
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f4f5f9',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
    color: '#0f172a',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  sectionDescription: {
    color: '#64748b',
    marginTop: 4,
  },
  sectionProgress: {
    fontWeight: '600',
    color: '#2563eb',
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  taskItemDone: {
    opacity: 0.7,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#94a3b8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: '#22c55e',
    borderColor: '#22c55e',
  },
  checkboxMark: {
    color: '#fff',
    fontWeight: '700',
  },
  taskText: {
    flex: 1,
    fontSize: 16,
    color: '#0f172a',
  },
});

export default ChecklistScreen;
