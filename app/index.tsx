import { useAlbums } from "@/hooks/useAlbums";
import { useAlbumStore } from "@/zustand/useAlbumStore";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Button, Text, View } from "tamagui";

let albumsFetched = false

export default function AlbumsPage() {
  const router = useRouter();

  const { hasPermission, requestPermission } = useAlbums();
  const { findAlbums } = useAlbumStore()

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    } else {
      if (!albumsFetched) {
        findAlbums()
        albumsFetched = true
      }
      setTimeout(() => {
        router.replace("/albums");
      }, 1000);
    }
  }, [hasPermission]);

  return (
    <>
      {hasPermission ?
        <></> :
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>Please grant permission</Text>
          <Button onPress={requestPermission}>Grant permission</Button>
        </View>
      }
    </>
  );
}
