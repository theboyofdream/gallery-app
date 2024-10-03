import { View } from "@/components/layout/View";
import { useAlbums } from "@/hooks/useAlbums";
import { MasonryFlashList } from "@shopify/flash-list";
import {
  Asset,
  getAlbumsAsync,
  getAssetsAsync,
  usePermissions,
} from "expo-media-library";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, StatusBar, TouchableOpacity } from "react-native";
import { Button, getTokens, Text, useTheme, XStack, YStack } from "tamagui";
import { ChevronLeft } from "@tamagui/lucide-icons";
import { useColumns } from "@/zustand/useColumns";

export default function AlbumPage() {
  const { id } = useLocalSearchParams();

  const { getAlbumById } = useAlbums();
  const album = getAlbumById(id as string);

  const { columns, columnWidth } = useColumns();

  const { size, space, radius } = getTokens();
  const theme = useTheme();
  const router = useRouter();

  if (album) {
    return (
      <YStack flex={1}>
        <MasonryFlashList
          data={album.assets}
          numColumns={columns}
          estimatedItemSize={columnWidth}
          ListHeaderComponent={
            <XStack>
              <Button icon={ChevronLeft} onPress={router.back} />
              <YStack my="$4" pl="$2">
                <Text fontSize={"$7"}>{album.title}</Text>
                <Text opacity={0.5} fontSize={"$1"}>
                  {album.assets.length} items
                </Text>
              </YStack>
            </XStack>
          }
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                activeOpacity={0.9}
                style={{
                  width: "100%",
                  //   padding: space["$2"].val,
                  padding: space["$0.5"].val,
                }}
                // onPress={() => {
                //   router.push(`album/${item.id}`);
                // }}
              >
                <Image
                  source={{ uri: item.uri }}
                  style={{
                    width: "100%",
                    aspectRatio: 1,
                    // aspectRatio: item.width / item.height,
                    resizeMode: "cover",
                    // borderRadius: radius.$6.val,
                    overflow: "hidden",
                  }}
                />
                {/* <Text fontSize={"$3"} opacity={0.5} paddingLeft="$2">
                  {item.filename}
                </Text> */}
                {/* <YStack paddingLeft="$1">
                  <Text fontSize={"$3"} opacity={0.5} paddingLeft="$1">
                    {item.filename}
                  </Text>
                  <Text fontSize={"$3"} opacity={0.5}>
                    {item.filename}
                  </Text>
                </YStack> */}
              </TouchableOpacity>
            );
          }}
        />
      </YStack>
    );
  }
  return <Text>error</Text>;
}
