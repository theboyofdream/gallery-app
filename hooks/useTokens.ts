import { getTokens, useTheme } from "tamagui";

export function useTokens() {
  const tokens = getTokens();
  const theme = useTheme();

  return {
    ...tokens,
    theme,
  };
}
