import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { useColorScheme } from "nativewind";
import "../global.css";

import { AnimatedSplashOverlay } from "@/components/animated-icon";

export default function RootLayout() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
      {/* Retains the cool animated splash screen from the template */}
      <AnimatedSplashOverlay />

      {/* Our new Stack Navigation container */}
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: isDark ? "#0f172a" : "#f8fafc", // slate-900 or slate-50
          },
          headerShadowVisible: false, // Hides the ugly gray line under the header
          headerTintColor: "#4f46e5", // Changes the back button to Indigo
          headerTitleStyle: {
            fontWeight: "900", // Ultra-bold modern font for titles
            color: isDark ? "#f8fafc" : "#0f172a", // slate-50 or slate-900
          },
        }}
      >
        <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen name="PostDetails" options={{ title: "Post" }} />
      </Stack>
    </ThemeProvider>
  );
}
