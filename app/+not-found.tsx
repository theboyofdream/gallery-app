import { Link } from "expo-router";
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
      <Link href={"/splashscreen"}>
        <Text color={"$blue10"}> Go to home</Text>
      </Link>
    </YStack>
  );
}