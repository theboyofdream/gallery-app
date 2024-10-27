import { Stack } from "expo-router";


export default function AlbumIdLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="[fileIndex]" />
    </Stack>
  )
}