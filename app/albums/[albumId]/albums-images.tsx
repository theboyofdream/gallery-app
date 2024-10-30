import { useAlbumStore, useSelectStore, useSettings } from "@/zustand";
import { FlashList, MasonryFlashList } from "@shopify/flash-list";
import { ArrowLeft, Check, ChevronLeft } from "@tamagui/lucide-icons";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { memo, useEffect, useMemo } from "react";
import { Dimensions, FlatList, Pressable, TouchableOpacity, useWindowDimensions } from "react-native";
import { Button, getTokens, Text, XStack, YStack, ZStack } from "tamagui";
import { Image } from "expo-image";
import { Toolbar } from "@/components/Toolbar";
import { MotiView } from "moti"
import { AnimatedExpoImage } from "..";
import { AppHeader } from "@/components/AppHeader";
import { Checkbox } from "@/components/Checkbox";
import { AlbumItem } from "@/components";
import { useBackHandler } from "@/hooks";


export default function AlbumImageSplitList() {
  const router = useRouter();

  const { albumId } = useLocalSearchParams();
  const { activeAlbumId, albums } = useAlbumStore();

  const album =
    albumId ?
      albums[albumId as string] :
      albums[activeAlbumId];

  const { albumItemColumns, albumItemLayoutType } = useSettings();

  const { selectedAlbumItems, addOrRemoveSelectedAlbumItem, emptySelectedAlbumItems } = useSelectStore()
  const selectionOn = selectedAlbumItems[album.id]?.length > 0
  const selectedItems = selectedAlbumItems[album.id] ?? []

  const window = useWindowDimensions()
  const tokens = getTokens()
  const computedAlbumItemProps = useMemo(() => {
    let padding = tokens.space['$0.25'].val
    return {
      width: (window.width / albumItemColumns) - (padding * 2),
      padding,
      layout: albumItemLayoutType
    }
  }, [window, tokens, albumItemColumns, albumItemLayoutType])

  return (
    <YStack flex={1}>
      <AppHeader
        title={
          selectionOn ?
            `${selectedItems.length.toString().padStart(2, '0')} item${selectedItems.length === 1 ? "" : "s"} selected` :
            album?.title
        }
        subTitle={selectionOn ? undefined : album?.assetCount.toString()}
        type={selectionOn ? 'cancel' : 'back'}
        onCancel={() => {
          if (selectionOn) {
            emptySelectedAlbumItems(album.id)
          }
        }}
      />

      <MasonryFlashList
        data={album.items}
        numColumns={albumItemColumns}
        keyExtractor={item => item}
        estimatedItemSize={computedAlbumItemProps.width}
        extraData={[
          albumItemLayoutType
        ]}
        renderItem={({ item, index }) => (
          <AlbumItem
            {...computedAlbumItemProps}
            id={item}
            type='item'
            onPress={(id) => {
              router.push({
                pathname: "/albums/[albumId]/[imageIndex]",
                params: {
                  albumId: album.id,
                  imageIndex: index,
                },
              })
            }}
          />
        )}
      />

      <Toolbar
        items={
          selectionOn ? {
            'close': {
              onPress: () => {
                emptySelectedAlbumItems(album.id)
              },
            },
            'copy': {},
            'move': {},
            'selectAll': {},
            'delete': {},
            'share': {},
          } : {
            // "organise": {
            //   onPress(){

            //   }
            // },
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
  onPress?: () => void;
  onLongPress?: () => void;
}
const AlbumItem1 = memo(({
  albumId,
  id,
  index,
  onPress,
  onLongPress,
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
      onPress={onPress}
      onLongPress={onLongPress}
    // onPress={() => {
    //   router.push({
    //     pathname: "/albums/[albumId]/[fileIndex]",
    //     params: {
    //       albumId: albumId,
    //       fileIndex: index,
    //     },
    //   })
    // }}
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

    </TouchableOpacity>
  );
})
