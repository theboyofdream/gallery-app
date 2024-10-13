import { useSettings } from "@/zustand"
import { AlignHorizontalJustifyStart, AlignStartHorizontal, LayoutDashboard, LayoutGrid } from "@tamagui/lucide-icons"
import { useState } from "react"
import { Button, Slider, Text, View, XStack, YStack } from "tamagui"
import { ToolbarOptionHeader } from "./ToolbarOptionHeader"
import { ToolbarOptionFooter } from "./ToolbarOptionFooter"

interface LayoutViewProps {
  close: () => void
}

export function LayoutView(
  { close }: LayoutViewProps
) {

  const { albumItemColumns, albumItemLayoutType, updateColumns, resetStore, updateLayoutType, maxColumns, minColumns } = useSettings()

  const [layoutType, setLayoutType] = useState<LayoutType>(albumItemLayoutType)
  const [columns, setColumns] = useState(albumItemColumns)
  // const showMediaTypeBtnBgClr = showMediaType === "all" ? "$blue10" : undefined


  function applyChanges() {
    updateColumns(columns, 'item')
    updateLayoutType(layoutType, 'item')
    close()
  }

  function clearChanges() {
    setLayoutType(albumItemLayoutType)
    setColumns(albumItemColumns)
    // close()
  }

  return (
    <>

      <ToolbarOptionHeader
        icon={AlignStartHorizontal}
        title={'Layout'}
        onReset={() => {
          resetStore(['albumItemLayoutType', 'albumItemColumns'])
          clearChanges()
        }}
      />

      <View gap="$4" zIndex={100} px="$3">

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
              backgroundColor={layoutType === 'masonry' ? "$blue10" : undefined}
              color={layoutType === 'masonry' ? "white" : undefined}
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
              onPress={() => setLayoutType('masonry')}
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
          <Text>Number of Columns: {columns}</Text>
          <Slider
            // defaultValue={[columns]}
            value={[columns]}
            min={minColumns}
            max={maxColumns}
            step={1}
            onValueChange={(value) => {
              setColumns(value[0])
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

      <ToolbarOptionFooter
        onApply={applyChanges}
        onClear={clearChanges}
        onCancel={close}
      />
    </>
  )
}
