import { useAlbum, useTokens } from "@/hooks";
import { useAlbums } from "@/hooks/useAlbums";
import { useColumns } from "@/hooks/useColumns";
import { useAlbumStore } from "@/zustand/useAlbumStore";
import { MasonryFlashList } from "@shopify/flash-list";
import { router, useRouter } from "expo-router";
import { memo, useEffect, useMemo } from "react";
import { Image, TouchableOpacity } from "react-native";
import { Button, getTokens, Text, useTheme, View, YStack } from "tamagui";

export default function AlbumsPage() {
  const albumIds = useAlbumStore(state => state.albumIds)
  const sortedAlbumIds = useMemo(() => {
    // pending implementation
    return albumIds
  }, [albumIds]
  )

  const { columns, columnWidth } = useColumns();

  return (
    <YStack gap="$2" flex={1}>
      <MasonryFlashList
        data={sortedAlbumIds}
        numColumns={columns}
        estimatedItemSize={columnWidth}
        ListHeaderComponent={
          <YStack my="$4" pl="$2">
            <Text fontSize={"$10"}>Albums</Text>
            <Text opacity={0.5}>Total {sortedAlbumIds.length}</Text>
          </YStack>
        }
        renderItem={({ item, index }) => (
          <Album id={item} index={index} />
        )}
      />
    </YStack>
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
          pathname: "/album/[albumId]",
          params: { albumId: album.id },
        });
      }}
    >
      <Image
        source={{ uri: album.thumbnail.uri }}
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
        <Text fontSize={"$5"}>{album.title}</Text>
        <Text fontSize={"$3"} opacity={0.5}>
          {album.assetCount}
        </Text>
      </YStack>
    </TouchableOpacity>
  )
})