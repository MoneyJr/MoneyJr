import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useAppContext } from '../context/AppContext';

const ProfileScreen: React.FC = () => {
  const { profile, updateProfile, t, language, setLanguage, languages } = useAppContext();
  const statusOptions: Array<'newcomer' | 'student' | 'resident'> = ['newcomer', 'student', 'resident'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('profile.title')}</Text>

      <View style={styles.card}>
        <Text style={styles.label}>{t('profile.name')}</Text>
        <TextInput
          style={styles.input}
          value={profile.name}
          onChangeText={(text) => updateProfile({ name: text })}
          placeholder={t('profile.name')}
        />

        <Text style={styles.label}>{t('profile.email')}</Text>
        <TextInput
          style={styles.input}
          value={profile.email}
          onChangeText={(text) => updateProfile({ email: text })}
          placeholder={t('profile.email')}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>{t('profile.city')}</Text>
        <TextInput
          style={styles.input}
          value={profile.city}
          onChangeText={(text) => updateProfile({ city: text })}
          placeholder="Freiburg im Breisgau"
        />

        <Text style={styles.label}>{t('profile.status')}</Text>
        <View style={styles.optionGroup}>
          {statusOptions.map((option) => (
            <TouchableOpacity
              key={option}
              style={[styles.optionChip, profile.status === option && styles.optionChipActive]}
              onPress={() => updateProfile({ status: option })}
            >
              <Text style={[styles.optionText, profile.status === option && styles.optionTextActive]}>
                {t(`profile.statusOptions.${option}`)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>{t('profile.language')}</Text>
        <View style={styles.optionGroup}>
          {languages.map((lng) => (
            <TouchableOpacity
              key={lng.code}
              style={[styles.optionChip, language === lng.code && styles.optionChipActive]}
              onPress={() => setLanguage(lng.code)}
            >
              <Text style={[styles.optionText, language === lng.code && styles.optionTextActive]}>
                {lng.label}
              </Text>
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
    marginBottom: 16,
    color: '#0f172a',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  label: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5f5',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: '#0f172a',
  },
  optionGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  optionChip: {
    borderWidth: 1,
    borderColor: '#cbd5f5',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  optionChipActive: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  optionText: {
    color: '#2563eb',
    fontWeight: '500',
  },
  optionTextActive: {
    color: '#fff',
  },
});

export default ProfileScreen;
