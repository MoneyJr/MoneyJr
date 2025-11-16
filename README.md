# Smart Integration Hub

Smart Integration Hub — это Expo/React Native приложение, которое помогает новым жителям Фрайбурга (Freiburg im Breisgau) получать доступ к важной инфраструктуре города, отслеживать прогресс по бытовым задачам и находить актуальные учреждения на карте.

## Технологический стек
- [Expo](https://expo.dev/)
- React Native
- React Navigation
- AsyncStorage для сохранения состояния чеклиста
- react-native-maps для карты города

## Структура проекта
```
.
├── .gitignore
├── README.md
├── package.json
├── app.json
├── App.tsx
├── android/.gitkeep
├── ios/.gitkeep
├── assets/.gitkeep
└── src
    ├── components
    │   └── common
    ├── screens
    │   ├── HomeScreen.tsx
    │   ├── ChecklistScreen.tsx
    │   ├── MapScreen.tsx
    │   ├── ProfileScreen.tsx
    │   └── PlaceDetailsScreen.tsx
    ├── navigation
    │   └── RootNavigator.tsx
    ├── context
    │   └── AppContext.tsx
    ├── data
    │   ├── checklist.ts
    │   └── places.ts
    ├── locales
    │   ├── en.json
    │   ├── de.json
    │   ├── ru.json
    │   └── uk.json
    └── utils
        ├── i18n.ts
        └── storage.ts
```

## Подготовка и запуск
1. Установите зависимости:
   ```bash
   npm install
   ```
2. Запустите Expo dev server:
   ```bash
   npm start
   ```
3. Откройте приложение в Expo Go или в эмуляторе по инструкции в терминале.

## Добавление нового языка
1. Создайте JSON-файл в каталоге `src/locales` и добавьте переводы по существующим ключам.
2. Импортируйте файл в `src/utils/i18n.ts` и добавьте его в объект `translations`.
3. Укажите код языка в `availableLanguages` в `src/context/AppContext.tsx`, чтобы он появился в переключателе на экране профиля.
4. Перезапустите приложение — новый язык станет доступен пользователям.

## Git
Инициализация репозитория (не выполнено автоматически):
```bash
git init
```
