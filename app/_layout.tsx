import defaultConfig from "@tamagui/config/v3";
import { useFonts } from "expo-font";
import { Slot, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { createTamagui, TamaguiProvider, Theme, useTheme } from "tamagui";

import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar, useColorScheme } from "react-native";
import { QueryClient, QueryClientProvider } from "react-query";
import { useSettings } from "@/zustand";

const tamaguiConfig = createTamagui(defaultConfig);

// TypeScript types across all Tamagui APIs
type Conf = typeof tamaguiConfig;
declare module "@tamagui/core" {
  interface TamaguiCustomConfig extends Conf { }
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Create a client
const queryClient = new QueryClient()

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { theme } = useSettings();
  const themeName = theme === "system" ? colorScheme : theme;

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
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <TamaguiProvider config={tamaguiConfig}>
        <Theme name={themeName}>
          <Routes />
        </Theme>
      </TamaguiProvider>
    </QueryClientProvider>
  );
}

function Routes() {
  const { background } = useTheme();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: background.val }}>
      <StatusBar translucent backgroundColor={background.val} />
      <Slot initialRouteName="/splashscreen" />
      {/* <Stack
        screenOptions={{
          contentStyle: {
            backgroundColor: background.val,
          },
        }}
      /> */}
    </SafeAreaView>
  );
}
