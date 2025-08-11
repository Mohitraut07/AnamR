
# 🎬 Movie App (React Native + Expo)

This is a cross-platform Movie App built with [Expo](https://expo.dev) and React Native. Search for movies, view details, and save your favorites. Powered by The Movie Database (TMDB) API.

## ✨ Features

- 🔍 Search for movies in real-time
- 🎬 View trending and popular movies
- 💾 Save your favorite movies
- 🧑 User profile and saved movies tab
- ⚡ Fast, responsive UI with Tailwind CSS (NativeWind)

---


## 🚀 Getting Started


1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Set up environment variables**

   - Copy your TMDB API key to a `.env` file or set it in your environment as `EXPO_PUBLIC_MOVIE_API_KEY`.
   - Example `.env`:
     ```env
     EXPO_PUBLIC_MOVIE_API_KEY=your_tmdb_api_key_here
     ```

3. **Start the app**

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo


You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

---

## 📁 Folder Structure

```
app/
   (tabs)/         # Tab screens (Home, Search, Saved, Profile)
   movies/         # Movie details screens
   globals.css     # Global styles
components/       # Reusable UI components
constants/        # Static assets (icons, images)
interfaces/       # TypeScript interfaces
services/         # API and data fetching logic
types/            # Type definitions
assets/           # Fonts, images, icons
```

---

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.


## 📚 Learn More

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.


## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## 📝 License

This project is licensed under the MIT License.

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
