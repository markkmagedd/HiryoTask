# Hyrio React Native Interview Task - Social Feed App

A high-performance, modern React Native social feed application built using **Expo Go**, **TypeScript**, and **NativeWind (Tailwind CSS)**. It showcases premium mobile UI/UX design trends, strict separation of concerns, and optimized rendering behaviors.

---

## 📱 Features

- **Dynamic Feed Listing**: Renders posts fetched from the GoRest API with pull-to-refresh and infinite scrolling.
- **Lazy-Loaded User Details**: Extracted post author details asynchronously to ensure instant initial load speeds.
- **In-Memory Caching**: Implemented a caching mechanism for user profiles using an $O(1)$ lookup Map to prevent the N+1 network request problem.
- **Discussion Screen**: Displays post details at the top with a dedicated comments section below.
- **Skeleton Loaders**: Custom loading skeletons built for user profiles and comment cards to ensure smooth visual transitions.
- **Interactive Dark Mode Toggle**: A header toggle button that instantly switches the entire app between light and dark themes.

---

## 🎨 UI/UX & Design Screenshots

| ☀️ Light Mode Feed | 🌙 Dark Mode Feed | 💬 Discussion & Skeletons |
| :---: | :---: | :---: |
| *[Add Light Feed Screenshot]* | *[Add Dark Feed Screenshot]* | *[Add Details/Skeleton Screenshot]* |

*(Note: Please replace the placeholders above with your simulator or physical device screenshots before submitting!)*

---

## 🛠️ Architecture & Core Decisions

### 1. Separation of Concerns (Service-Hook-View Pattern)
Instead of cluttering screen files with networking and state logic, the app is divided into distinct layers:
* **Service Layer (`src/services/api.ts`)**: Pure async-await functions that handle HTTP requests to GoRest.
* **Controller Layer (`src/hooks/`)**: Custom React Hooks (`usePosts` and `useUser`) that manage variables like pagination, loading states, error states, and caches.
* **View Layer (`src/app/` & `src/components/`)**: Clean components that receive variables from hooks and render layout structures.

### 2. Preventing the N+1 API Bottleneck
The GoRest `/posts` endpoint returns `user_id` but *not* the author's name. Fetching user profiles for 10 posts would generate 10 additional network requests.
* **Solution**: Implemented an in-memory `userCache = new Map<number, User>()`. If a user's details have already been fetched, the app pulls them from memory instantly rather than querying the network again.

### 3. Optimized Rendering: FlatList vs. ScrollView
* Stacking a scrollable list (like comments) inside a standard `ScrollView` degrades mobile performance because it forces React Native to compile all off-screen items at once.
* **Solution**: The `PostDetails` screen uses a single `FlatList` to render comments, with the main post card set as the `ListHeaderComponent`. Off-screen comment cards are recycled, maintaining a small memory footprint.

---

## 🚀 Setup & Installation

### Prerequisite: Environment Variables
Create a `.env` file in the root of the project:
```env
EXPO_PUBLIC_API_URL=https://gorest.co.in/public/v2
```

### Installation Steps

1. **Install Dependencies**:
   ```bash
   npm install --legacy-peer-deps
   ```
   *(We use `--legacy-peer-deps` to resolve strict version configurations across downgraded React Native peer packages).*

2. **Start the Development Server**:
   ```bash
   EXPO_OFFLINE=1 npx expo start -c
   ```
   *(Running with `EXPO_OFFLINE=1` bypasses Expo's auth servers and prevents network connection crashes. The `-c` clears Metro's cache to read your new Babel configuration).*

3. **Run the App**:
   - **On Simulator**: Press `i` for iOS or `a` for Android.
   - **On Phone**: Scan the terminal QR code using the **Expo Go** app.

---

## ⏱️ Time Taken
- **Total Development Time**: ~4.5 hours. (Focused on setting up TypeScript interfaces, infinite scroll hooks, NativeWind styling, and custom theme switches).

