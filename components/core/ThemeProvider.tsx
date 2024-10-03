import defaultConfig from "@tamagui/config/v3";
import { PropsWithChildren } from "react";
import { StatusBar, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createTamagui, TamaguiProvider, Theme } from "tamagui";

const config = createTamagui(defaultConfig);

export function ThemeProvider({ children }: PropsWithChildren) {
  const colorScheme = useColorScheme();
  return (
    <TamaguiProvider config={config}>
      <Theme name={colorScheme}>
        <TStatusBar />
        <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
      </Theme>
    </TamaguiProvider>
  );
}

function TStatusBar() {
  const colorScheme = useColorScheme();

  return (
    <StatusBar
      translucent
      barStyle={colorScheme === "light" ? "dark-content" : "light-content"}
      backgroundColor={colorScheme === "light" ? "white" : "black"}
    />
  );
}
