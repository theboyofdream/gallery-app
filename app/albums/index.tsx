import { AlbumItem } from "@/components";
import { Toolbar } from "@/components/Toolbar";
import { useFilters, useSettings } from "@/zustand";
import { useAlbumStore } from "@/zustand/useAlbumStore";
import { FlashList } from "@shopify/flash-list";
import { ChevronLeft, Settings, Settings2 } from "@tamagui/lucide-icons";
import { Image } from 'expo-image';
import { useRouter } from "expo-router";
import { memo, useMemo, useRef } from "react";
import { FlatList, RefreshControl, useWindowDimensions } from "react-native";
import Animated, { Easing, Extrapolation, interpolate, LinearTransition, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { useQuery } from "react-query";
import { Button, getTokens, Text, useTheme, View, XStack, YStack } from "tamagui";

export const AnimatedExpoImage = Animated.createAnimatedComponent(Image);

const AnimatedFlashList = Animated.createAnimatedComponent(FlashList)

const AnimatedText = Animated.createAnimatedComponent(Text)
const AnimatedButton = Animated.createAnimatedComponent(Button)

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


    const theme = useTheme()
    // const scrollOffsetY = useSharedValue(0)
    // const handleScroll = useAnimatedScrollHandler({
    //     onScroll: (e) => {
    //         // 'worklet';
    //         scrollOffsetY.value = e.contentOffset.y;
    //     }
    // })
    // const animatedHeaderStyle = useAnimatedStyle(() => {
    //     const y = scrollOffsetY.value
    //     return {
    //         padding: interpolate(y, [0, y], [tokens.size.$2.val, tokens.size["$0.5"].val]),
    //         gap: interpolate(y, [0, y], [tokens.space.$2.val, 0]),
    //         flexDirection: interpolate(y, [0, y], [1, 0]) > 0.5 ? 'column' : 'row',
    //     }
    // }, [])


    return (
        <YStack gap="$2" flex={1}>
            {/* <Animated.View
                layout={LinearTransition}
                style={[{
                    padding: tokens.size.$2.val,
                    justifyContent: 'center',
                    gap: tokens.space.$2.val,
                    height: tokens.size.$20.val,
                    // padding: tokens.size["$0.5"].val,
                    // flexDirection: 'row',
                },
                    // animatedHeaderStyle
                ]}
            >
                <AnimatedButton
                    style={{
                        alignSelf: 'flex-start',
                        borderRadius: tokens.radius.$12.val,
                        // backgroundColor: theme.borderColorFocus.val,
                        backgroundColor: 'transparent',
                        padding: 0,
                    }}
                    gap={'$0.5'}
                    scaleSpace={0}
                >
                    <XStack pl='$2' pr="$3">
                        <ChevronLeft
                            style={{
                                padding: 0,
                                transform: [
                                    { scale: 1 }
                                ]
                            }}
                        />
                        <AnimatedText style={{
                            display: 'none'
                        }}>back</AnimatedText>
                    </XStack>
                </AnimatedButton>
                <YStack>
                    <AnimatedText
                        style={{
                            // fontSize: tokens.size["$4.5"].val * 0.96,
                            fontSize: tokens.size["$1"].val * 0.9,
                        }}
                    >Albums</AnimatedText>
                    <AnimatedText style={{
                        opacity: 0.5,
                        fontSize: tokens.size["$1"].val * 0.6
                    }}>100 items</AnimatedText>
                </YStack>
            </Animated.View> */}
            {/* <XStack p='$2'>
        <Button
          aspectRatio={1}
          alignSelf='flex-start'
          icon={ChevronLeft}
          scaleIcon={2}
          borderRadius={'$12'}
          chromeless
        />
        <YStack my="$1">
          <Text fontSize={"$6"}>Albums</Text>
          {
            true &&
            <Text opacity={0.5} fontSize={"$1"}>
              {sortedAlbumIds.length} items
            </Text>
          }
        </YStack>
      </XStack> */}
            {/* <YStack
        p='$2'
        // height={'$20'}
        justifyContent="center"
      >
        <Text fontSize={"$10"}>Albums</Text>
        <Text opacity={0.5}>Total {sortedAlbumIds.length}</Text>
      </YStack> */}

            <Animated.ScrollView
                // onScroll={handleScroll}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled
            >
                <FlashList
                    ListHeaderComponent={
                        <>
                            <XStack
                                justifyContent='flex-end'
                                padding='$2'
                            >
                                <Button
                                    icon={Settings2}
                                    scaleIcon={1.5}
                                    borderRadius={'$12'}
                                    aspectRatio={1}
                                    chromeless
                                />
                                {/* <Settings2 /> */}
                            </XStack>
                            <Animated.View
                                layout={LinearTransition}
                                style={[{
                                    padding: tokens.size.$2.val,
                                    justifyContent: 'center',
                                    gap: tokens.space.$2.val,
                                    height: tokens.size.$20.val,
                                    // padding: tokens.size["$0.5"].val,
                                    // flexDirection: 'row',
                                },
                                    // animatedHeaderStyle
                                ]}
                            >
                                <YStack>
                                    <AnimatedText
                                        style={{
                                            fontSize: tokens.size["$4.5"].val * 0.96,
                                            // fontSize: tokens.size["$1"].val * 0.9,
                                        }}
                                    // gap={'$2'}
                                    >
                                        {/* <Text fontSize={'$1'} >All</Text> */}
                                        Albums
                                    </AnimatedText>
                                    <AnimatedText style={{
                                        opacity: 0.5,
                                        // fontSize: tokens.size["$1"].val * 0.6
                                        fontSize: tokens.size["$1"].val * 0.7
                                    }}>100 items</AnimatedText>
                                </YStack>
                            </Animated.View>
                        </>
                    }
                    refreshing={isLoading}
                    // onScroll={(e) => {
                    //     'worklet'
                    //     scrollOffsetY.value = e.nativeEvent.contentOffset.y
                    //     // console.log(e.nativeEvent.contentOffset.y)
                    // }}
                    // onScroll={handleScroll}
                    // scrollEventThrottle={30}
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
                    // ListHeaderComponent={ListHeaderComponent}
                    renderItem={({ item, index }) => (
                        <AlbumItem
                            {...computedAlbumItemProps}
                            id={item}
                            onPress={(id) => {
                                router.navigate({
                                    pathname: "/albums/[albumId]/images",
                                    params: { albumId: id },
                                });
                            }}
                        />
                    )}
                    ListFooterComponent={<YStack m="$10" />}
                />
            </Animated.ScrollView>
            <Toolbar
                items={{
                    "filter": {},
                    // "settings": {},
                }}
                visible
            />
        </YStack>
    );
}
