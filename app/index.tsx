import { View } from "@/components/layout/View";
import { useAlbums } from "@/hooks/useAlbums";
import { useColumns } from "@/zustand/useColumns";
import { MasonryFlashList } from "@shopify/flash-list";
import {
  Asset,
  getAlbumsAsync,
  getAssetsAsync,
  usePermissions,
} from "expo-media-library";
import { Link, Redirect, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, StatusBar, TouchableOpacity } from "react-native";
import { Button, getTokens, Text, useTheme, YStack } from "tamagui";

export default function AlbumsPage() {
  const router = useRouter();

  const { albums, hasPermission, getAlbums, requestPermission } = useAlbums();
  const { columns, columnWidth } = useColumns();

  const { size, space, radius } = getTokens();
  const theme = useTheme();

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
                  router.push(`album/${item.id}`);
                }}
              >
                <Image
                  source={{ uri: item.assets[0].uri }}
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
