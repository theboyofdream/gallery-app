import { useAlbumStore, useSettings } from "@/zustand";
import { MasonryFlashList } from "@shopify/flash-list";
import { ArrowLeft, ChevronLeft } from "@tamagui/lucide-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { memo, useMemo } from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import { Button, getTokens, Text, XStack, YStack } from "tamagui";
import { Image } from "expo-image";
import { Toolbar } from "@/components/Toolbar";
import { MotiView } from "moti"
import { AnimatedExpoImage } from ".";

export default function AlbumPage() {
  const router = useRouter();

  const { albumId } = useLocalSearchParams();
  const { activeAlbumId, albums } = useAlbumStore();

  const album =
    albumId ?
      albums[albumId as string] :
      albums[activeAlbumId];

  const { albumItemColumns, albumItemLayoutType } = useSettings();

  const estimatedItemSize = useMemo(() => {
    return albumItemLayoutType === "grid" ? Dimensions.get('screen').width / albumItemColumns : undefined;
  }, [albumItemLayoutType]);

  return (
    <YStack flex={1}>
      <XStack alignItems="center" gap="$1" paddingVertical="$0.5" backgroundColor={"$background075"}>
        <Button
          aspectRatio={1}
          icon={ChevronLeft}
          onPress={router.back}
          padding={0}
          scaleIcon={2}
          borderRadius={"$12"}
          backgroundColor={"$colorTransparent"}
        />
        <YStack my="$1">
          <Text fontSize={"$5"}>{album?.title}</Text>
          <Text opacity={0.5} fontSize={"$1"}>
            {album?.assetCount} items
          </Text>
        </YStack>
      </XStack>
      <MasonryFlashList
        // refreshing={isLoading}
        // refreshControl={
        //   <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        // }
        data={album.items}
        numColumns={albumItemColumns}
        estimatedItemSize={estimatedItemSize}
        keyExtractor={(item) => item}
        // ListHeaderComponent={
        //   <XStack alignItems="center" gap="$1" paddingVertical="$0.5" backgroundColor={"$background075"}>
        //     <Button
        //       aspectRatio={1}
        //       icon={ChevronLeft}
        //       onPress={router.back}
        //       padding={0}
        //       scaleIcon={2}
        //       borderRadius={"$12"}
        //       backgroundColor={"$colorTransparent"}
        //     />
        //     <YStack my="$1">
        //       <Text fontSize={"$5"}>{album?.title}</Text>
        //       <Text opacity={0.5} fontSize={"$1"}>
        //         {album?.assetCount} items
        //       </Text>
        //     </YStack>
        //   </XStack>
        // }
        renderItem={({ item: id, index }) => (
          <AlbumItem
            albumId={album.id}
            id={id}
            index={index}
          />
        )}
      />
      <Toolbar
        items={{
          "organise": {},
          "filter": {},
          "layout": {},
          "settings": {},
        }}
        visible
      />
    </YStack>
  );

}

interface AlbumItemProps {
  albumId: string;
  id: string;
  index: number;
}
const AlbumItem = memo(({
  albumId,
  id,
  index,
}: AlbumItemProps) => {
  const { albumItemLayoutType } = useSettings();
  const { items } = useAlbumStore();
  const item = items[id]

  const router = useRouter();
  const space = getTokens().space;

  // console.log(item)

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={{
        width: "100%",
        padding: space["$0.5"].val,
      }}
      onPress={() => {
        router.push({
          pathname: "/albums/[albumId]/[fileIndex]",
          params: {
            albumId: albumId,
            fileIndex: index,
          },
        })
      }}
    >
      <AnimatedExpoImage
        // sharedTransitionTag={`album-${item.id}`}
        source={{ uri: item.uri }}
        style={{
          width: "100%",
          aspectRatio:
            albumItemLayoutType === "grid" ? 1 :
              item.width / item.height,
          overflow: "hidden",
        }}
        contentFit="cover"
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
})
