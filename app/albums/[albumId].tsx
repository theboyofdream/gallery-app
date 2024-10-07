import { useTokens } from "@/hooks";
import { useAlbums } from "@/hooks/useAlbums";
import { useColumns } from "@/hooks/useColumns";
import { MasonryFlashList, MasonryFlashListRef } from "@shopify/flash-list";
import { ChevronLeft } from "@tamagui/lucide-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Image, RefreshControl, TouchableOpacity } from "react-native";
import { Button, Text, XStack, YStack } from "tamagui";
import { useInfiniteQuery, useQuery } from "react-query";
import { useAlbumStore } from "@/zustand/useAlbumStore";
import { Asset } from "expo-media-library";

export default function AlbumPage() {
  const { albumId } = useLocalSearchParams();

  // const { getAlbumById } = useAlbums();
  const { activeAlbum, findAlbumById, activeFileIndex } = useAlbumStore();
  const album = activeAlbum;


  // const {
  //   data: album,
  //   isLoading,
  //   refetch,
  // } = useQuery({
  //   queryKey: albumId,
  //   // enabled: albumId!=null,
  //   queryFn: async () => await findAlbumById(albumId as string),
  // });

  //   const [album, setAlbum] = useState(null);

  //   const album = await getAlbumById(albumId as string);
  //   useMemo(() => {}, [albumId]);

  //   console.debug({ album });

  const { columns, columnWidth } = useColumns();

  const { theme, space } = useTokens();
  const router = useRouter();

  const ref = useRef<MasonryFlashListRef<Asset[]>>(null);

  // useEffect(() => {
  //   ref.current?.scrollToOffset({
  //     index: activeFileIndex,
  //     animated: false,
  //   });
  //   // if (album) {
  //   //   ref.current?.scrollToIndex({
  //   //     index: 0,
  //   //     animated: false,
  //   //   });
  //   // }
  // }, [activeFileIndex]);

  //   if (album) {
  return (
    <YStack flex={1}>
      <MasonryFlashList
        ref={ref}
        // refreshing={isLoading}
        // refreshControl={
        //   <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        // }
        // data={album?}
        // data={album?.items}
        data={activeAlbum?.items}
        numColumns={columns}
        estimatedItemSize={columnWidth}
        ListHeaderComponent={
          <XStack alignItems="center" gap="$2">
            <Button
              aspectRatio={1}
              icon={ChevronLeft}
              onPress={router.back}
              // size={"$3"}
              // height={"unset"}
              padding={0}
              scaleIcon={2}
              borderRadius={"$12"}
              backgroundColor={"$colorTransparent"}
            />
            <YStack my="$4" pl="$2">
              <Text fontSize={"$7"}>{album?.title}</Text>
              <Text opacity={0.5} fontSize={"$1"}>
                {/* {album.assets.length} items */}
                {album?.assetCount} items
              </Text>
            </YStack>
          </XStack>
        }
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              activeOpacity={0.9}
              style={{
                width: "100%",
                //   padding: space["$2"].val,
                padding: space["$0.5"].val,
              }}
              onPress={() => {
                router.push({
                  pathname: "/album/[albumId]/[fileIndex]",
                  params: {
                    albumId: albumId,
                    fileIndex: index,
                  },
                })
                // router.push(`album/${item.id}`);
              }}
            >
              <Image
                //   source={{ uri: item.uri }}
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
  //   }
  //   return null;
  //   return <Text>{album?.id}</Text>;
}
