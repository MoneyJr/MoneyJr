import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Place } from '../data/places';
import { useAppContext } from '../context/AppContext';

interface RouteParams {
  place: Place;
}

const PlaceDetailsScreen: React.FC = () => {
  const route = useRoute<RouteProp<Record<string, RouteParams>, string>>();
  const { t } = useAppContext();
  const place = route.params?.place;

  if (!place) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{t('places.detailsTitle')}</Text>
        <Text>No place data</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{place.name}</Text>
      <Text style={styles.description}>{place.description}</Text>
      <Text style={styles.sectionTitle}>{t('places.address')}</Text>
      <Text style={styles.address}>{place.address}</Text>
      <Text style={styles.sectionTitle}>{t('common.filters')}</Text>
      <Text style={styles.address}>{t(`map.filter.${place.category}`)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
    color: '#0f172a',
  },
  description: {
    fontSize: 16,
    color: '#475569',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    textTransform: 'uppercase',
    marginBottom: 4,
    marginTop: 16,
  },
  address: {
    fontSize: 16,
    color: '#0f172a',
  },
});

export default PlaceDetailsScreen;
