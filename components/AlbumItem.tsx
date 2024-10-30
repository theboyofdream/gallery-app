import { TouchableOpacity } from "react-native";
import { PressableBox } from "./PressableBox";
import { Image, ImageSource } from "expo-image";
import { Text, YStack } from "tamagui";
import { useAlbumStore } from "@/zustand";
import { useMemo } from "react";
import Animated from "react-native-reanimated";

const BLUR_HASH =
  // '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
  // 'UCKWFb4f~5K5HR~60kD:snE6%H?Bx[9ywLxE';
  'UAO;MUogfQog~qj[fQj[j[fQfQfQxufQfQfQ';

export type AlbumItemProps = {
  id: string

  onPress?: (id: string) => void
  onLongPress?: (id: string) => void

  width: number
  // height?: number
  imgBorderRadius?: number

  padding?: number

  type?: 'folder' | 'item'
  layout?: LayoutType
}


export function AlbumItem({
  id,
  onPress = () => { },
  onLongPress = () => { },
  width,
  // height,
  imgBorderRadius,
  padding,
  type = 'folder',
  layout = 'grid'
}: AlbumItemProps) {

  const {
    thumbnailUri,
    // thumbnailId,
    title,
    aspectRatio,
    itemsCount
  } = useMemo(() => {
    if (type === 'folder') {
      let album = useAlbumStore.getState().albums[id]
      return {
        thumbnailUri: album?.thumbnail?.uri,
        // thumbnailId: album?.thumbnail.id,
        title: album.title,
        itemsCount: album.assetCount,
        // height: layout === 'grid' ? width : album.thumbnail.height
        aspectRatio: layout === 'grid' ? 1 : album.thumbnail.width / album.thumbnail.height,
      }
    }

    let item = useAlbumStore.getState().items[id]
    return {
      thumbnailUri: item.uri,
      // height: layout === 'grid' ? width : item.height,
      aspectRatio: layout === 'grid' ? 1 : item.width / item.height,
    }
  }, [id])

  return (
    // <Animated.View
    //   sharedTransitionTag={`album-thumbnail-${thumbnailId}`}
    // >
    <PressableBox
      style={{ padding }}
      onPress={() => onPress(id)}
      onLongPress={() => onLongPress(id)}
    >

      <Image
        source={{ uri: thumbnailUri }}
        placeholder={{ blurhash: BLUR_HASH }}
        style={{
          width,
          aspectRatio,
          borderRadius: imgBorderRadius,
          overflow: 'hidden'
        }}
        contentFit="cover"
      />

      <YStack paddingLeft="$2">
        {title && <Text fontSize={'$5'}>{title}</Text>}
        {itemsCount && <Text fontSize={'$3'} opacity={0.5}>{itemsCount}</Text>}
      </YStack>

    </PressableBox>
    // </Animated.View>
  )
}