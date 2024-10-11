import { Link, Stack } from "expo-router";
import { StyleSheet } from "react-native";

import { Text, YStack } from "tamagui";

export default function NotFoundScreen() {
  return (
    <YStack
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Error</Text>
      <Link href={"/splashscreen"}>Go to home</Link>
    </YStack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
