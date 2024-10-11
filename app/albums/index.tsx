import { Toolbar } from "@/components/Toolbar";
import { useColumns } from "@/hooks/useColumns";
import { useSettings } from "@/zustand";
import { useAlbumStore } from "@/zustand/useAlbumStore";
import { MasonryFlashList } from "@shopify/flash-list";
import { Image } from 'expo-image';
import { useRouter } from "expo-router";
import { memo, useMemo } from "react";
import { RefreshControl, TouchableOpacity, useWindowDimensions } from "react-native";
import Animated from "react-native-reanimated";
import { useQuery } from "react-query";
import { getTokens, ScrollView, Text, View, YStack } from "tamagui";


const blurhash =
  // '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
  // 'UCKWFb4f~5K5HR~60kD:snE6%H?Bx[9ywLxE';
  'UAO;MUogfQog~qj[fQj[j[fQfQfQxufQfQfQ';

export const AnimatedExpoImage = Animated.createAnimatedComponent(Image);

export default function AlbumsPage() {
  const { albumIds, findAlbums } = useAlbumStore()
  const sortedAlbumIds = useMemo(() => {
    // pending implementation
    return albumIds
  }, [albumIds])

  const { albumColumns } = useSettings()
  const { width } = useWindowDimensions()
  const estimatedItemSize = width / albumColumns

  const { isLoading, refetch } = useQuery({
    queryKey: ["albums"],
    enabled: false,
    queryFn: findAlbums
  })

  return (
    <View gap="$2" flex={1}>
      <MasonryFlashList
        refreshing={isLoading}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refetch}
          />}
        data={sortedAlbumIds}
        numColumns={albumColumns}
        estimatedItemSize={estimatedItemSize}
        ListHeaderComponent={
          <YStack my="$4" pl="$2">
            <Text fontSize={"$10"}>Albums</Text>
            <Text opacity={0.5}>Total {sortedAlbumIds.length}</Text>
          </YStack>
        }
        renderItem={({ item, index }) => (
          <Album id={item} index={index} />
        )}
        ListFooterComponent={
          <YStack m="$10">
          </YStack>
        }
      />
      <Toolbar
        items={{
          "filter": {},
          "settings": {},
        }}
        visible
      />
    </View>
  );
}

interface AlbumProps {
  id: string;
  index: number;
}
const Album = memo(({
  id,
  index,
}: AlbumProps) => {
  const router = useRouter();
  const { albums, setActiveAlbum } = useAlbumStore()
  const { space, radius } = getTokens();
  const album = albums[id]

  // console.log(album.thumbnail)
  if (album?.items?.length < 1) {
    return null
  }

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={{
        width: "100%",
        padding: space.$2.val,
      }}
      onPress={() => {
        setActiveAlbum(id, index);
        router.navigate({
          pathname: "/albums/[albumId]",
          params: { albumId: album.id },
        });
      }}
    >
      <AnimatedExpoImage
        // sharedTransitionTag={`album-${album.thumbnail.id}`}
        source={{ uri: album?.thumbnail?.uri }}
        placeholder={{ blurhash }}
        style={{
          width: "100%",
          aspectRatio: 1,
          // aspectRatio: item.assets[0].width / item.assets[0].height,
          borderRadius: radius.$7.val,
          overflow: "hidden",
        }}
        contentFit="cover"
      />
      <YStack paddingLeft="$2">
        <Text fontSize={"$5"}>{album?.title}</Text>
        <Text fontSize={"$3"} opacity={0.5}>
          {album?.assetCount}
        </Text>
      </YStack>
    </TouchableOpacity>
  )
})