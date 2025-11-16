import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { places, Place } from '../data/places';
import { useAppContext } from '../context/AppContext';

const INITIAL_REGION = {
  latitude: 47.999,
  longitude: 7.85,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

const MapScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { t } = useAppContext();
  const [category, setCategory] = useState<'all' | Place['category']>('all');

  const filteredPlaces = useMemo(() => {
    if (category === 'all') return places;
    return places.filter((place) => place.category === category);
  }, [category]);

  const categories: { label: string; value: 'all' | Place['category'] }[] = [
    { label: t('map.filter.all'), value: 'all' },
    { label: t('map.filter.integration'), value: 'integration' },
    { label: t('map.filter.education'), value: 'education' },
    { label: t('map.filter.health'), value: 'health' },
    { label: t('map.filter.community'), value: 'community' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('map.title')}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filters}>
        {categories.map((item) => (
          <TouchableOpacity
            key={item.value}
            style={[styles.filterChip, category === item.value && styles.filterChipActive]}
            onPress={() => setCategory(item.value)}
          >
            <Text style={[styles.filterText, category === item.value && styles.filterTextActive]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <MapView style={styles.map} initialRegion={INITIAL_REGION}>
        {filteredPlaces.map((place) => (
          <Marker
            key={place.id}
            coordinate={{ latitude: place.latitude, longitude: place.longitude }}
            title={place.name}
            description={place.description}
            onCalloutPress={() => navigation.navigate('PlaceDetails', { place })}
          />
        ))}
      </MapView>
      <View style={styles.list}>
        {filteredPlaces.map((place) => (
          <TouchableOpacity
            key={place.id}
            style={styles.listItem}
            onPress={() => navigation.navigate('PlaceDetails', { place })}
          >
            <View>
              <Text style={styles.placeName}>{place.name}</Text>
              <Text style={styles.placeAddress}>{place.address}</Text>
            </View>
            <Text style={styles.detailsLink}>{t('common.seeDetails')}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    paddingHorizontal: 24,
    paddingTop: 16,
    color: '#0f172a',
  },
  filters: {
    paddingHorizontal: 16,
    marginVertical: 12,
  },
  filterChip: {
    borderWidth: 1,
    borderColor: '#cbd5f5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: '#1d4ed8',
    borderColor: '#1d4ed8',
  },
  filterText: {
    color: '#1d4ed8',
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#fff',
  },
  map: {
    flex: 1,
  },
  list: {
    padding: 16,
    backgroundColor: '#f8fafc',
  },
  listItem: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  placeName: {
    fontWeight: '600',
    color: '#0f172a',
  },
  placeAddress: {
    color: '#64748b',
    marginTop: 4,
    maxWidth: '85%',
  },
  detailsLink: {
    color: '#2563eb',
    fontWeight: '600',
  },
});

export default MapScreen;
