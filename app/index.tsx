import { useAlbum, useTokens } from "@/hooks";
import { useAlbums } from "@/hooks/useAlbums";
import { useColumns } from "@/hooks/useColumns";
import { MasonryFlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Image, TouchableOpacity } from "react-native";
import { Button, getTokens, Text, useTheme, View, YStack } from "tamagui";

export default function AlbumsPage() {
  const router = useRouter();

  const { albums, hasPermission, requestPermission } = useAlbums();
  const { columns, columnWidth } = useColumns();

  const { space, radius } = useTokens();

  if (hasPermission) {
    return (
      <YStack gap="$2" flex={1}>
        <MasonryFlashList
          data={albums}
          numColumns={columns}
          estimatedItemSize={columnWidth}
          ListHeaderComponent={
            <YStack my="$4" pl="$2">
              <Text fontSize={"$10"}>Albums</Text>
              <Text opacity={0.5}>Total {albums.length}</Text>
            </YStack>
          }
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                activeOpacity={0.9}
                style={{
                  width: "100%",
                  padding: space.$2.val,
                }}
                onPress={() => {
                  router.navigate({
                    pathname: "/album/[albumId]",
                    params: { albumId: item.id },
                  });
                }}
              >
                <Image
                  //   source={{ uri: item.assets[0].uri }}
                  source={{ uri: item.thumbnail.uri }}
                  style={{
                    width: "100%",
                    aspectRatio: 1,
                    // aspectRatio: item.assets[0].width / item.assets[0].height,
                    resizeMode: "cover",
                    borderRadius: radius.$7.val,
                    overflow: "hidden",
                  }}
                />
                <YStack paddingLeft="$2">
                  <Text fontSize={"$5"}>{item.title}</Text>
                  <Text fontSize={"$3"} opacity={0.5}>
                    {item.assetCount}
                  </Text>
                </YStack>
              </TouchableOpacity>
            );
          }}
        />
      </YStack>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Please grant permission</Text>
      <Button onPress={requestPermission}>Grant permission</Button>
    </View>
  );
}
