import defaultConfig from "@tamagui/config/v3";
import { PropsWithChildren } from "react";
import { StatusBar, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createTamagui, TamaguiProvider, Theme, useTheme } from "tamagui";

const config = createTamagui(defaultConfig);

export function ThemeProvider({ children }: PropsWithChildren) {
  const colorScheme = useColorScheme();
  return (
    <TamaguiProvider config={config}>
      <Theme name={colorScheme}>{children}</Theme>
    </TamaguiProvider>
  );
}
