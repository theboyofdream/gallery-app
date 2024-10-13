import { useAlbumStore, useSettings } from "@/zustand";
import { FlashList } from "@shopify/flash-list";
import { ChevronLeft, LayoutGrid } from "@tamagui/lucide-icons";
import { Image, ImageContentFit } from "expo-image";
import { useGlobalSearchParams, useLocalSearchParams, useRouter } from "expo-router";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import { FlatList, TouchableOpacity, useWindowDimensions } from "react-native";
import { Button, getTokens, Text, useTheme, View, XStack, YStack, ZStack } from "tamagui";
import { format } from "date-fns/format"
import { BlurView } from "expo-blur"
import { LinearGradient } from "expo-linear-gradient";
import { AppHeader } from "@/components/AppHeader";

export default function FilePage() {
  const [] = useState(0)

  const router = useRouter()
  const { width, height } = useWindowDimensions()

  const { albumId } = useGlobalSearchParams()
  const { fileIndex } = useLocalSearchParams();

  const { albumItemColumns } = useSettings()
  const footerImageEstimatedSize = Math.max(width / (albumItemColumns * 2), 60)
  const { activeAlbumId, albums, items } = useAlbumStore()
  const album =
    albumId ?
      albums[albumId as string] :
      albums[activeAlbumId];

  const [activeIndex, setActiveIndex] = useState(Number(fileIndex) ?? 0)
  const activeFile = useMemo(() => {
    return items[album.items[activeIndex]]
  }, [activeIndex, album, items])

  const ref = useRef<FlashList<string>>(null)
  const footerListref = useRef<FlashList<string>>(null)

  const theme = useTheme()
  const { size } = getTokens();

  return (
    <View style={{
      flex: 1,
      // height: "100%",
      // flexDirection: "column"
    }}>

      {/* <XStack
        alignItems="center"
        gap="$1"
        backgroundColor={"$background075"}
        padding="$0.5"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 99,
          width: "100%",
        }}
      >
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
          <Text fontSize={"$5"}>{activeFile.filename}</Text>
          <Text opacity={0.5} fontSize={"$1"}>
            {
              activeFile.modificationTime &&
              format(new Date(activeFile.modificationTime), "dd MMM y hh:mm a")
            }
          </Text>
        </YStack>
      </XStack> */}

      <AppHeader
        title={activeFile.filename}
        subTitle={
          activeFile.modificationTime ?
            format(new Date(activeFile.modificationTime), "dd MMM y hh:mm a") ?? "" :
            ""
        }
      />

      <View style={{ flex: 1 }}>
        <FlashList
          ref={ref}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          // getItemLayout={(_, index) => ({
          //   length: width,
          //   offset: width * index,
          //   index,
          // })}
          // extraData={[activeIndex, album, items]}
          initialScrollIndex={Number(fileIndex) ?? 0}
          // maxToRenderPerBatch={1}
          estimatedItemSize={width}
          onMomentumScrollEnd={(event) => {
            const index = Math.round(event.nativeEvent.contentOffset.x / width)
            setActiveIndex(index)
            footerListref.current?.scrollToIndex({
              index,
              animated: true,
              viewOffset: (width / 2) - (footerImageEstimatedSize / 2),
            })
          }}
          data={album.items}
          renderItem={({ item: id }) => (
            <File
              id={id}
              width={width}
              height={height}
              onPress={() => {
                console.log("pressed")
              }}
            />
          )}
        />
      </View>

      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width,
          // backgroundColor: theme.background025.val,
          // paddingVertical: size["$0.5"].val,
          zIndex: 99,
          flexDirection: "row",
          alignItems: "center"
        }}
        paddingVertical={"$0.5"}
        marginBottom={"$2"}
      >

        <LinearGradient
          colors={[theme.background.val, "#ffffff00"]}
          locations={[0, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            position: "absolute",
            left: 0,
            zIndex: 109,
            height: footerImageEstimatedSize,
            width: size["$1.5"].val,
          }}
        />
        <View style={{ flex: 1 }}>
          <FlashList
            ref={footerListref}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={album.items}
            estimatedItemSize={footerImageEstimatedSize}
            renderItem={({ item: id, index }) => (
              <View
                borderRadius="$6"
                overflow={"hidden"}
                marginHorizontal={"$2"}
              >
                <File
                  id={id}
                  width={footerImageEstimatedSize}
                  height={footerImageEstimatedSize}
                  contentFit="cover"
                  onPress={() => {
                    setActiveIndex(index)
                    ref.current?.scrollToIndex({
                      index,
                      animated: true,
                    })
                  }}
                />
              </View>
            )}
            ListHeaderComponent={<View style={{ width: size["$1.5"].val }} />}
            ListFooterComponent={<View style={{ width: footerImageEstimatedSize }} />}
          />
        </View>

        <LinearGradient
          colors={["#ffffff00", theme.background075.val, theme.background.val]}
          locations={[0, 0.2, 0.3]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            position: "absolute",
            right: 0,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              height: footerImageEstimatedSize,
              paddingHorizontal: size['$0.75'].val,
              paddingLeft: size['$1'].val,
              // aspectRatio: 1,
              justifyContent: "center",
            }}
          >
            <YStack
              alignItems="center"
            >
              <LayoutGrid size={size["$2"].val} />
              <Text fontSize={"$1"}>Menu</Text>
            </YStack>
          </TouchableOpacity>
        </LinearGradient>

      </View>
    </View>
  )
}

interface FileProps {
  id: string;
  width: number;
  height: number;
  contentFit?: ImageContentFit;
  onPress?: () => void;
}
const File = memo(({
  id,
  width,
  height,
  contentFit = "contain",
  onPress
}: FileProps) => {
  const space = getTokens().space;
  const { items } = useAlbumStore()
  const item = items[id]

  // console.log(item.uri);


  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={{
        width,
        height,
        // padding: space.$2.val,
      }}
      onPress={onPress}
    >
      <Image
        source={{ uri: item.uri }}
        style={{
          width: "100%",
          height: "100%",
        }}
        contentFit={contentFit}
      />
    </TouchableOpacity>
  );
})