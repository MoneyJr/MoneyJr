import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import ChecklistScreen from '../screens/ChecklistScreen';
import MapScreen from '../screens/MapScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PlaceDetailsScreen from '../screens/PlaceDetailsScreen';
import { useAppContext } from '../context/AppContext';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => {
  const { t } = useAppContext();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: '#94a3b8',
        tabBarIcon: ({ color, size }) => {
          const icons: Record<string, keyof typeof Ionicons.glyphMap> = {
            Home: 'home-outline',
            Checklist: 'checkbox-outline',
            Map: 'map-outline',
            Profile: 'person-circle-outline',
          };
          const iconName = icons[route.name] || 'ellipse-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: t('home.title') }} />
      <Tab.Screen name="Checklist" component={ChecklistScreen} options={{ title: t('home.openChecklist') }} />
      <Tab.Screen name="Map" component={MapScreen} options={{ title: t('home.openMap') }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: t('home.openProfile') }} />
    </Tab.Navigator>
  );
};

const RootNavigator = () => {
  const { t } = useAppContext();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen
        name="PlaceDetails"
        component={PlaceDetailsScreen}
        options={{ title: t('places.detailsTitle') }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
