import { AlbumItem } from "@/components";
import { Toolbar } from "@/components/Toolbar";
import { useFilters, useSettings } from "@/zustand";
import { useAlbumStore } from "@/zustand/useAlbumStore";
import { FlashList } from "@shopify/flash-list";
import { Image } from 'expo-image';
import { useRouter } from "expo-router";
import { memo, useMemo } from "react";
import { FlatList, RefreshControl, useWindowDimensions } from "react-native";
import Animated from "react-native-reanimated";
import { useQuery } from "react-query";
import { getTokens, Text, YStack } from "tamagui";

export const AnimatedExpoImage = Animated.createAnimatedComponent(Image);

export default function AlbumList() {
  const router = useRouter()

  const { albumIds, findAlbums } = useAlbumStore()
  const { sortingOrder } = useFilters()
  const sortedAlbumIds = useMemo(() => {
    return albumIds
  }, [albumIds])


  const { albumColumns } = useSettings()


  const { isLoading, refetch } = useQuery({
    queryKey: ["albums"],
    enabled: false,
    queryFn: findAlbums
  })

  const window = useWindowDimensions()
  const tokens = getTokens()
  const computedAlbumItemProps = useMemo(() => {
    let padding = tokens.space['$1.5'].val
    let borderRadius = tokens.radius.$6.val
    return {
      width: (window.width / albumColumns) - (padding * 2),
      // height: (window.width / albumColumns) - (padding * 2),
      padding,
      imgBorderRadius: borderRadius
    }
  }, [window, tokens, albumColumns])

  const ListHeaderComponent = memo(() => (
    <YStack my="$4" pl="$2">
      <Text fontSize={"$10"}>Albums</Text>
      <Text opacity={0.5}>Total {sortedAlbumIds.length}</Text>
    </YStack>
  ))

  return (
    <YStack gap="$2" flex={1}>
      <FlashList
        refreshing={isLoading}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refetch}
          />}
        data={sortedAlbumIds}
        numColumns={albumColumns}
        extraData={[
          computedAlbumItemProps
        ]}
        estimatedItemSize={computedAlbumItemProps.width}
        ListHeaderComponent={ListHeaderComponent}
        renderItem={({ item, index }) => (
          <AlbumItem
            {...computedAlbumItemProps}
            id={item}
            onPress={(id) => {
              router.navigate({
                pathname: "/[albumId]",
                params: { albumId: id },
              });
            }}
          />
        )}
        ListFooterComponent={<YStack m="$10" />}
      />
      <Toolbar
        items={{
          "filter": {},
          "settings": {},
        }}
        visible
      />
    </YStack>
  );
}
