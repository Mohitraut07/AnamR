# 🎬 Movie App (React Native + Expo)

A cross-platform Movie App built with [Expo](https://expo.dev) and React Native. Search for movies, view details, and save your favorites. Powered by The Movie Database (TMDB) API and Appwrite for authentication and data storage.



## 🚀 Quick Access

- **Live Project:**  
  [Open in Expo](https://expo.dev/accounts/master_03/projects/anamr/builds/f45c80db-39f0-4040-a28a-42b904c1033d)

- **QR Code:**  
  ![QR Code for Project](https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://expo.dev/accounts/master_03/projects/anamr/builds/f45c80db-39f0-4040-a28a-42b904c1033d)



## ✨ Features

- 🔍 Real-time movie search
- 🎬 Trending and popular movies
- 💾 Save favorite movies (per user)
- 👤 User authentication (signup/login)
- 🧑 Profile and saved movies tab
- ⚡ Responsive UI with Tailwind CSS (NativeWind)
- 🌙 Dark theme



## 🛠️ Getting Started

### 1. **Clone the Repository**

```bash
git clone https://github.com/master_03/react-native-app-movie.git
cd react-native-app-movie
```

### 2. **Install Dependencies**

```bash
npm install
```

### 3. **Set Up Environment Variables**

Create a `.env` file in the project root:

```env
EXPO_PUBLIC_MOVIE_API_KEY=your_tmdb_api_key_here
EXPO_PUBLIC_APPWRITE_PROJECT_ID=your_appwrite_project_id
EXPO_PUBLIC_APPWRITE_DATABASE_ID=your_appwrite_database_id
EXPO_PUBLIC_APPWRITE_COLLECTION_ID=your_main_collection_id
EXPO_PUBLIC_APPWRITE_ENDPOINT=https://fra.cloud.appwrite.io/v1
EXPO_PUBLIC_APPWRITE_SAVED_MOVIES_DATABASE_ID=your_appwrite_database_id
EXPO_PUBLIC_APPWRITE_SAVED_MOVIES_COLLECTION_ID=your_saved_movies_collection_id
```

**Descriptions:**
- `EXPO_PUBLIC_MOVIE_API_KEY`: TMDB API key for movie data.
- `EXPO_PUBLIC_APPWRITE_PROJECT_ID`: Appwrite project ID.
- `EXPO_PUBLIC_APPWRITE_DATABASE_ID`: Appwrite database ID.
- `EXPO_PUBLIC_APPWRITE_COLLECTION_ID`: Main collection for movies/searches.
- `EXPO_PUBLIC_APPWRITE_ENDPOINT`: Appwrite API endpoint.
- `EXPO_PUBLIC_APPWRITE_SAVED_MOVIES_DATABASE_ID`: Database ID for saved movies (usually same as main DB).
- `EXPO_PUBLIC_APPWRITE_SAVED_MOVIES_COLLECTION_ID`: Collection ID for saved movies (e.g., `bookmarks`).

### 4. **Start the App**

```bash
npx expo start
```

You can run the app on:
- [Expo Go](https://expo.dev/go)
- Android emulator
<!-- - iOS simulator -->
<!-- - Web browser -->



## 📁 Project Structure

```
app/
  (tabs)/                # Tab screens: Home, Search, Saved, Profile
    _layout.tsx          # Tab navigator layout and logic
    index.tsx            # Home tab
    search.tsx           # Search tab
    saved.tsx            # Saved tab (shows user's saved movies)
    profile.tsx          # Profile tab (user info)
  movies/                # Movie details screens (dynamic route)
    [id].tsx             # Movie details by ID
  signup/                # Signup page and layout
  login/                 # Login page and layout
  globals.css            # Global styles for NativeWind
components/              # Reusable UI components (MovieCard, SearchBar, etc.)
constants/               # Static assets (icons, images)
interfaces/              # TypeScript interfaces for props/data
services/                # API and Appwrite logic (api.ts, appwrite.ts, useFetch.ts)
types/                   # Type definitions (e.g., images.d.ts)
assets/                  # Fonts, images, icons
```



## 📄 Key Files

- **app/(tabs)/_layout.tsx**: Tab navigation and authentication logic.
- **app/(tabs)/saved.tsx**: Displays movies saved by the logged-in user.
- **app/movies/[id].tsx**: Movie details and save/bookmark functionality.
- **services/appwrite.ts**: Appwrite integration for authentication and data.
- **services/api.ts**: TMDB API integration.
- **components/**: UI components for cards, lists, etc.
- **constants/icons.ts & images.ts**: App icons and images.
- **types/images.d.ts**: TypeScript support for image imports.



## 🧑‍💻 Development & Customization

- Edit files in the `app/` directory for screens and routing.
- Use `components/` for reusable UI.
- Update `services/` for API and backend logic.
- Customize styles in `globals.css` and Tailwind config.



## 📝 Contributing

Pull requests are welcome!  
For major changes, please open an issue first to discuss what you would like to change.



## 📚 Resources

- [Expo Documentation](https://docs.expo.dev/)
- [Appwrite Documentation](https://appwrite.io/docs)
- [TMDB API Docs](https://developers.themoviedb.org/3)
- [NativeWind (Tailwind for React Native)](https://www.nativewind.dev/)



## 📝 License

MIT License



Enjoy building and exploring movies!  
For questions or feedback, open an issue or join the [Expo Discord](https://chat.expo.dev)

Copyright © 2025 Mohit Raut