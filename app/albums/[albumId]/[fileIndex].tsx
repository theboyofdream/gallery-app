import { AppHeader } from "@/components/AppHeader";
import { Checkbox } from "@/components/Checkbox";
import AwesomeGallery, { GalleryRef } from "@/components/react-native-awesome-gallery";
import { ToolBarButton } from "@/components/Toolbar";
import { useAlbumStore, useSelectStore, useSettings } from "@/zustand";
import { FlashList } from "@shopify/flash-list";
import { format } from "date-fns/format";
import { Image, ImageContentFit } from "expo-image";
import { useGlobalSearchParams, useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import { FlatList, Linking, TouchableOpacity, useWindowDimensions } from "react-native";
import { getTokens, useTheme, View, XStack, ZStack } from "tamagui";
import { create } from "zustand";
import { combine } from "zustand/middleware";
import * as ExpoIntentLauncher from 'expo-intent-launcher';
// import RNShare from "react-native-share";


let overlayTimer: NodeJS.Timeout | null = null;

const useFilePageState = create(
  combine(
    {
      overlayVisible: true
    },
    (set, get) => ({
      toggleOverlayVisibility() {
        const overlayVisible = get().overlayVisible

        set({ overlayVisible: !overlayVisible })

        // overlayTimer && clearTimeout(overlayTimer)
        // if (!overlayVisible) {
        //   overlayTimer = setTimeout(() => {
        //     set({ overlayVisible: false })
        //   }, 3000);
        // }
      }
    })
  )
)

export default function FilePage() {
  const [] = useState(2)

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
  // const footerListref = useRef<FlatList<string>>(null)

  const theme = useTheme()
  const { size } = getTokens();

  const { overlayVisible, toggleOverlayVisibility } = useFilePageState()

  const mainImageListRef = useRef<GalleryRef>(null)

  const { selectedAlbumItems, addOrRemoveSelectedAlbumItem, emptySelectedAlbumItems } = useSelectStore()
  const selectionOn = selectedAlbumItems[album.id]?.length > 0
  const selectedItems = selectedAlbumItems[album.id] ?? []
  console.log(selectedAlbumItems)

  // Navigation
  const navigation = useNavigation();

  // Effect
  useEffect(() => {
    // setTimeout(() => {
    //   footerListref.current?.scrollToIndex({
    //     index: activeIndex,
    //     animated: true,
    //     viewOffset: (width / 2) - (footerImageEstimatedSize / 2),
    //   })
    // }, 1000);

    const backListener = (e) => {
      e.preventDefault();
      console.log('onback');
      // if (selectionOn) {
      // }
      emptySelectedAlbumItems(album.id)
      // Do your stuff here
      navigation.dispatch(e.data.action);
    }

    navigation.addListener('beforeRemove', backListener);

    return () => {
      navigation.removeListener('beforeRemove', backListener)
    }
  }, []);

  const { space } = getTokens()

  function onshareclick() {


    // Share.share({
    //   url:
    // })
    // Sharing.shareAsync({
    //   message: 'Check out these awesome images!',
    //   files: imagesToShare,
    //   title: 'Share Images',
    // })
  }

  return (
    <View style={{ flex: 1 }}>

      <View style={[
        {
          position: "absolute",
          top: 0,
          left: 0,
          width,
          zIndex: 99
        },
        !overlayVisible && {
          opacity: 0,
          pointerEvents: 'none'
        }
      ]}>
        <AppHeader
          title={
            selectionOn ?
              `${selectedItems.length.toString().padStart(2, '0')} item${selectedItems.length === 1 ? "" : "s"} selected` :
              activeFile.filename
          }
          subTitle={
            !selectionOn &&
              activeFile.modificationTime ?
              format(new Date(activeFile.modificationTime), "dd MMM y hh:mm a") ?? "" :
              ""
          }
          type={selectionOn ? 'cancel' : 'back'}
          onCancel={() => {
            if (selectionOn) {
              emptySelectedAlbumItems(album.id)
            }
            // router.back()
          }}
        />
      </View>

      <View style={{ flex: 1 }}>
        <AwesomeGallery
          ref={mainImageListRef}
          style={{ flex: 1 }}
          data={album.items}
          initialIndex={Number(fileIndex) ?? 0}
          numToRender={3}
          // disableVerticalSwipe
          disableSwipeUp
          // hideAdjacentImagesOnScaledImage
          onTap={toggleOverlayVisibility}
          onSwipeToClose={() => {
            // console.log('clsoe')
            router.back()
          }}

          onIndexChange={(index) => {
            setActiveIndex(index)
            footerListref.current?.scrollToIndex({
              index,
              animated: true,
              viewOffset: (width / 2) - (footerImageEstimatedSize / 2),
            })
          }}

          renderItem={({ item: id, setImageDimensions }) => {
            setImageDimensions({
              width,
              height
            })
            return (
              <File
                id={id}
                width={width}
                height={height}
              // onPress={() => {
              //   toggleOverlayVisibility()
              //   // console.log("file pressed")
              // }}
              />
            )
          }}
        />
      </View>


      <View
        style={
          [{
            position: "absolute",
            bottom: 0,
            left: 0,
            width,
            // backgroundColor: theme.background025.val,
            // paddingVertical: size["$0.5"].val,
            zIndex: 99,
            // flexDirection: "row",
            alignItems: "center"
          },
          !overlayVisible && {
            opacity: 0,
            pointerEvents: 'none'
          }
          ]}
        // paddingVertical={"$0.5"}
        // paddingBottom={"$2"}
        gap="$2"
      >

        <View style={{ flex: 1 }}>
          {/* <FlatList */}
          <FlashList
            ref={footerListref}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={album.items}
            // getItemLayout={(data, index) => ({
            //   // length: data?.length ?? 0,
            //   length: footerImageEstimatedSize,
            //   // offset: (footerImageEstimatedSize * index),
            //   offset: footerImageEstimatedSize * index + (width / 2) - (footerImageEstimatedSize),
            //   // offset: (footerImageEstimatedSize * (index + 1)) + space["$1.5"].val * 3,
            //   index,
            // })}
            initialScrollIndex={selectionOn ? undefined : (Number(activeIndex) ?? 0)}
            extraData={[selectionOn, selectedItems]}
            estimatedItemSize={footerImageEstimatedSize}
            renderItem={({ item: id, index }) => {
              return (
                <ZStack
                  borderRadius="$6"
                  overflow={"hidden"}
                  marginHorizontal={"$1.5"}
                  width={footerImageEstimatedSize}
                  height={footerImageEstimatedSize}
                >
                  <File
                    id={id}
                    width={footerImageEstimatedSize}
                    height={footerImageEstimatedSize}
                    contentFit="cover"
                    onPress={() => {
                      setActiveIndex(index)
                      mainImageListRef.current?.setIndex(index, true)
                    }}
                    onLongPress={() => {
                      // console.log('longpress')
                      addOrRemoveSelectedAlbumItem(album.id, id)
                    }}
                  />

                  {
                    selectionOn &&
                    <XStack>
                      <XStack
                        padding="$2"
                      >

                        <Checkbox
                          checked={selectedItems.includes(id)}
                          onCheckedChange={_ => {
                            console.log(_)
                            addOrRemoveSelectedAlbumItem(album.id, id)
                          }}
                        />
                      </XStack>
                    </XStack>

                  }
                </ZStack>
              )
            }}
            ListHeaderComponent={<View style={{ width: size["$1.5"].val }} />}
            ListFooterComponent={<View style={{ width: size['$1.5'].val }} />}
          />
        </View>

        <XStack
          backgroundColor={"$background075"}
        >
          <ToolBarButton
            type="copy"
            style={{ flex: 1 }}
          />
          <ToolBarButton
            type="move"
            style={{ flex: 1 }}
          />
          <ToolBarButton
            type="delete"
            style={{ flex: 1 }}
          />
          <ToolBarButton
            type="share"
            style={{ flex: 1 }}
            disabled
            onPress={() => {
              // RNShare.open({
              //   title: "Share files",
              //   message: "Share files",
              //   urls: [activeFile.uri, activeFile.uri]
              // })
              // ExpoIntentLauncher.startActivityAsync()
              // Share.open({
              //   title: "Share files"
              // })
              // ShareIntent.shareIntent.files
              // ExpoSharing.shareAsync(
              //   activeFile.uri,
              // )
            }}
          />
          {
            selectionOn ?
              <>
                {/* <ToolBarButton
                  type="selectAll"
                  style={{ flex: 1 }}
                /> */}
                <ToolBarButton
                  type="close"
                  style={{ flex: 1 }}
                  onPress={() => emptySelectedAlbumItems(album.id)}
                />
              </> :
              <>
                <ToolBarButton
                  type="info"
                  style={{ flex: 1 }}
                />
              </>
          }
        </XStack>
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
  onLongPress?: () => void
}
const File = memo(({
  id,
  width,
  height,
  contentFit = "contain",
  onPress,
  onLongPress
}: FileProps) => {
  const { items } = useAlbumStore()
  const item = items[id]

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={{
        width,
        height,
      }}
      onPress={onPress}
      onLongPress={onLongPress}
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


interface FooterFileProps {
  fileId: string
  index: number
  onPress: () => void
}
function FooterFile(
  {
    fileId,
    index,
    onPress
  }: FooterFileProps
) {
  const { width } = useWindowDimensions()
  const { albumItemColumns } = useSettings()
  const footerImageEstimatedSize = Math.max(width / (albumItemColumns * 2), 60)

  return (
    <ZStack
      borderRadius="$6"
      overflow={"hidden"}
      marginHorizontal={"$1.5"}
      width={footerImageEstimatedSize}
      height={footerImageEstimatedSize}
    >
      <File
        id={fileId}
        width={footerImageEstimatedSize}
        height={footerImageEstimatedSize}
        contentFit="cover"
        onPress={() => {
          setActiveIndex(index)
          mainImageListRef.current?.setIndex(index, true)
        }}
        onLongPress={() => {
          // console.log('longpress')
          addOrRemoveSelectedAlbumItem(album.id, id)
        }}
      />

      {
        selectionOn &&
        <XStack>
          <XStack
            padding="$2"
          >

            <Checkbox
              checked={selectedItems.includes(id)}
              onCheckedChange={_ => {
                console.log(_)
                addOrRemoveSelectedAlbumItem(album.id, id)
              }}
            />
          </XStack>
        </XStack>

      }
    </ZStack>
  )
}