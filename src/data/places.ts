export type PlaceCategory = 'integration' | 'education' | 'health' | 'community';

export type Place = {
  id: string;
  name: string;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  category: PlaceCategory;
};

export const places: Place[] = [
  {
    id: 'welcome-center',
    name: 'Welcome Center Freiburg',
    description: 'Городская служба поддержки новых жителей с консультациями на разных языках.',
    address: 'Rathausplatz 2-4, 79098 Freiburg',
    latitude: 47.9959,
    longitude: 7.8522,
    category: 'integration',
  },
  {
    id: 'language-school',
    name: 'Volkshochschule Freiburg',
    description: 'Курсы немецкого языка и программы интеграции.',
    address: 'Rotteckring 12, 79098 Freiburg',
    latitude: 47.9965,
    longitude: 7.8469,
    category: 'education',
  },
  {
    id: 'health-office',
    name: 'Gesundheitsamt Freiburg',
    description: 'Консультации по медицинскому страхованию и вакцинации.',
    address: 'Sautierstraße 28-30, 79104 Freiburg',
    latitude: 48.0025,
    longitude: 7.8571,
    category: 'health',
  },
  {
    id: 'family-center',
    name: 'Familienzentrum Klara',
    description: 'Сообщество семей и детские активности с упором на интеграцию.',
    address: 'Im Grün 6, 79098 Freiburg',
    latitude: 47.999,
    longitude: 7.8471,
    category: 'community',
  },
  {
    id: 'sport-club',
    name: 'Sportclub Vauban',
    description: 'Многоязычные спортивные кружки и встречи.',
    address: 'Merzhauser Str. 170, 79100 Freiburg',
    latitude: 47.9829,
    longitude: 7.8416,
    category: 'community',
  },
];
