import { usePermissions } from "@/hooks";
import { useAlbumStore } from "@/zustand";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "tamagui";

export default function SplashScreen() {
  const router = useRouter();

  const { permissionStatus } = usePermissions()
  const findAlbums = useAlbumStore(state => state.findAlbums)

  useEffect(() => {
    switch (permissionStatus) {
      case 'undetermined':
        return
      case 'denied':
        router.push('/permissions')
        break;
      case 'granted':
        findAlbums()
        setTimeout(() => router.push('/albums'), 1000);
        break;
    }
  }, [permissionStatus])

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Splash</Text>
    </View>
  )
}