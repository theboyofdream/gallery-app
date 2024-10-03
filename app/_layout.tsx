import defaultConfig from "@tamagui/config/v3";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { createTamagui } from "tamagui";

import { ThemeProvider } from "@/components/core/ThemeProvider";

const config = createTamagui(defaultConfig);

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    Inter: require("../assets/fonts/Inter.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <Stack initialRouteName="gallery">
        <Stack.Screen name="gallery" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
