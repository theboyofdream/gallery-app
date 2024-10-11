import { useAlbums } from "@/hooks";
import { useAlbumStore } from "@/zustand";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Button, Text, View, XStack } from "tamagui";

let albumsFetched = false

export default function PermissionsPage() {
  const router = useRouter();

  const { hasPermission, requestPermission } = useAlbums();
  const { findAlbums } = useAlbumStore()

  useEffect(() => {
    if (hasPermission) {
      if (!albumsFetched) {
        findAlbums()
        albumsFetched = true
      }
      setTimeout(() => {
        router.push("/albums");
      }, 1000);
    }
  }, [hasPermission]);

  return (
    <View
      style={{ flex: 1 }}
      mb={"$6"}
      mx={"$3"}
      gap="$2"
      justifyContent="flex-end"
    >
      <Text
        fontSize={"$9"}
        style={{
          fontWeight: "bold"
        }}>
        {"Welcome to\nThe Gallery App"}
      </Text>

      <Text
        fontSize={"$6"}
      >
        {"We need "}
        <Text
          color={"$blue10"}
          style={{
            fontWeight: "bold"
          }}
        >
          Storage Permission
        </Text>
        {" so we can display you photos, gifs and videos."}
      </Text>

      <XStack mt="$4">
        <Button
          backgroundColor="$blue10"
          color="white"
          px="$5"
          onPress={requestPermission}
        >Grant permission</Button>
      </XStack>
    </View>
  );

}
