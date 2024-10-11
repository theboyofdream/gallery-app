import { useSettings } from "@/zustand"
import { LayoutDashboard, LayoutGrid } from "@tamagui/lucide-icons"
import { useState } from "react"
import { Button, Slider, Text, View, XStack, YStack } from "tamagui"


export function LayoutView() {

  const [layoutType, setLayoutType] = useState<'grid' | 'masnory'>("grid")
  const [sortingOrder, setSortingOrder] = useState<SortingOrder>("asc")
  const [sortBy, setSortBy] = useState<SortBy>("modificationTime")
  // const showMediaTypeBtnBgClr = showMediaType === "all" ? "$blue10" : undefined

  const { albumItemColumns, updateColumns, maxColumns, minColumns } = useSettings()

  return (
    <>
      <View gap="$4" zIndex={100}>

        <YStack gap="$2">
          <Text>Select Layout Type</Text>
          <XStack gap="$2">
            <Button
              backgroundColor={layoutType === "grid" ? "$blue10" : undefined}
              color={layoutType === "grid" ? "white" : undefined}
              borderRadius={"$7"}
              // gap="$1"
              padding="$3"
              flex={1}
              justifyContent="flex-start"
              alignItems="flex-start"
              flexDirection="column"
              height={"auto"}
              fontSize={"$6"}
              icon={LayoutGrid}
              scaleIcon={2}
              onPress={() => setLayoutType("grid")}
            >
              Grid
            </Button>
            <Button
              backgroundColor={layoutType === "masnory" ? "$blue10" : undefined}
              color={layoutType === "masnory" ? "white" : undefined}
              borderRadius={"$7"}
              // gap="$1"
              padding="$3"
              flex={1}
              justifyContent="flex-start"
              alignItems="flex-start"
              flexDirection="column"
              height={"auto"}
              fontSize={"$6"}
              icon={LayoutDashboard}
              scaleIcon={2}
              onPress={() => setLayoutType("masnory")}
            >
              Masnory
            </Button>
            <View
              style={{ flex: 1 }}
            />
          </XStack>
        </YStack>

        <YStack gap="$2"
        // px="$2"
        >
          <Text>Number of Columns: {albumItemColumns}</Text>
          <Slider
            defaultValue={[albumItemColumns]}
            min={minColumns}
            max={maxColumns}
            step={1}
            onValueChange={(value) => {
              updateColumns(value[0], "item")
            }}
          >
            <Slider.Track>
              <Slider.TrackActive
                backgroundColor={"$blue10"}
              />
            </Slider.Track>
            <Slider.Thumb
              size="$1"
              index={0}
              circular
              borderWidth={1}
              borderColor={"$blue10"}
              backgroundColor={"white"}
            />
          </Slider>
        </YStack>
      </View>
    </>
  )
}
