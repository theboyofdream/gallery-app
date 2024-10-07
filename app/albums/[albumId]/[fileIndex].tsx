import { useTokens } from "@/hooks";
import { useAlbums } from "@/hooks/useAlbums";
import { useColumns } from "@/hooks/useColumns";
import { FlashList, MasonryFlashList } from "@shopify/flash-list";
import { ChevronLeft } from "@tamagui/lucide-icons";
import { useGlobalSearchParams, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { FlatList, Image, RefreshControl, TouchableOpacity, useWindowDimensions } from "react-native";
import { Button, Text, XStack, YStack } from "tamagui";
import { useInfiniteQuery, useQuery } from "react-query";
import { useAlbumStore } from "@/zustand/useAlbumStore";

export default function FilePage() {
  const { width, height } = useWindowDimensions()
  const { albumId } = useGlobalSearchParams()
  const { fileIndex } = useLocalSearchParams();

  const { space, radius } = useTokens();

  const { activeAlbum, setActiveFileIndex } = useAlbumStore()

  const ref = useRef<FlatList>(null)

  // useEffect

  return (
    <YStack flex={1}>
      {/* <Text>File Page</Text>
      <Text>{albumId}</Text>
      <Text>{fileIndex}</Text>
      <Text>{file?.filename}</Text> */}
      <FlatList
        getItemLayout={(data, index) => {
          // console.debug({ data, index })
          // setActiveFileIndex(index)

          return {
            length: width,
            offset: width * index,
            index: index
          }
        }}
        onViewableItemsChanged={({ viewableItems }) => {
          if (viewableItems.length > 0) {
            const newIndex = viewableItems[0].index ?? 0;
            setActiveFileIndex(newIndex);
          }
        }}
        ref={ref}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        initialScrollIndex={Number(fileIndex) ?? 0}
        initialNumToRender={3}
        data={activeAlbum?.items}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              activeOpacity={0.9}
              style={{
                width,
                height,
                padding: space.$2.val,
              }}
            >
              <Image
                source={{ uri: item.uri }}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  // borderRadius: radius.$2.val,
                }}
              />
            </TouchableOpacity>
          );
        }}
      />
    </YStack>
  )

  // const fileIndex = params?.fileIndex ?? 0;

  // const { getAlbumById } = useAlbums();

  // const {
  //   data: album,
  //   isLoading,
  //   refetch,
  // } = useQuery({
  //   queryKey: fileId,
  //   enabled: !!fileId,
  //   queryFn: async () => await getAlbumById(fileId as string),
  // });

  // //   const [album, setAlbum] = useState(null);

  // //   const album = await getAlbumById(albumId as string);
  // //   useMemo(() => {}, [albumId]);

  // //   console.debug({ album });

  // const { columns, columnWidth } = useColumns();

  // const { theme, space } = useTokens();
  // const router = useRouter();

  // //   if (album) {
  // return (
  //   <YStack flex={1}>
  //     <MasonryFlashList
  //       refreshing={isLoading}
  //       refreshControl={
  //         <RefreshControl refreshing={isLoading} onRefresh={refetch} />
  //       }
  //       //   data={album.assets}
  //       data={album?.items.assets}
  //       numColumns={columns}
  //       estimatedItemSize={columnWidth}
  //       ListHeaderComponent={
  //         <XStack alignItems="center" gap="$2">
  //           <Button
  //             aspectRatio={1}
  //             icon={ChevronLeft}
  //             onPress={router.back}
  //             // size={"$3"}
  //             // height={"unset"}
  //             padding={0}
  //             scaleIcon={2}
  //             borderRadius={"$12"}
  //           />
  //           <YStack my="$4" pl="$2">
  //             <Text fontSize={"$7"}>{album?.title}</Text>
  //             <Text opacity={0.5} fontSize={"$1"}>
  //               {/* {album.assets.length} items */}
  //               {album?.assetCount} items
  //             </Text>
  //           </YStack>
  //         </XStack>
  //       }
  //       renderItem={({ item }) => {
  //         return (
  //           <TouchableOpacity
  //             activeOpacity={0.9}
  //             style={{
  //               width: "100%",
  //               //   padding: space["$2"].val,
  //               padding: space["$0.5"].val,
  //             }}
  //           // onPress={() => {
  //           //   router.push(`album/${item.id}`);
  //           // }}
  //           >
  //             <Image
  //               //   source={{ uri: item.uri }}
  //               source={{ uri: item.uri }}
  //               style={{
  //                 width: "100%",
  //                 aspectRatio: 1,
  //                 // aspectRatio: item.width / item.height,
  //                 resizeMode: "cover",
  //                 // borderRadius: radius.$6.val,
  //                 overflow: "hidden",
  //               }}
  //             />
  //             {/* <Text fontSize={"$3"} opacity={0.5} paddingLeft="$2">
  //                   {item.filename}
  //                 </Text> */}
  //             {/* <YStack paddingLeft="$1">
  //                   <Text fontSize={"$3"} opacity={0.5} paddingLeft="$1">
  //                     {item.filename}
  //                   </Text>
  //                   <Text fontSize={"$3"} opacity={0.5}>
  //                     {item.filename}
  //                   </Text>
  //                 </YStack> */}
  //           </TouchableOpacity>
  //         );
  //       }}
  //     />
  //   </YStack>
  // );
  //   }
  //   return null;
  //   return <Text>{album?.id}</Text>;
}
