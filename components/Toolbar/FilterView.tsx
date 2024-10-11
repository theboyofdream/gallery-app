import { ArrowBigDownDash, ArrowBigUpDash, Filter, Image, Video } from "@tamagui/lucide-icons"
import { Button, Group, Text, View, XStack, YStack } from "tamagui"
import { CheckboxWithLabel } from "../CheckboxWithLabel"
import { useState } from "react"

export
  function FilterView() {

  const [showMediaType, setShowMediaType] = useState<MediaType | "all">("all")
  const [sortingOrder, setSortingOrder] = useState<SortingOrder>("asc")
  const [sortBy, setSortBy] = useState<SortBy>("modificationTime")
  // const showMediaTypeBtnBgClr = showMediaType === "all" ? "$blue10" : undefined

  return (
    <>

      <YStack gap="$2">
        <Text pl="$2">Show</Text>
        <Group orientation="horizontal" borderRadius={"$12"}>
          <Group.Item>
            <Button
              size={'$3.5'}
              onPress={() => setShowMediaType("all")}
              backgroundColor={showMediaType === "all" ? "$blue10" : undefined}
              color={showMediaType === "all" ? "white" : undefined}
              flex={1}
            >All</Button>
          </Group.Item>
          <Group.Item>
            <Button
              size={'$3.5'}
              onPress={() => setShowMediaType("photo")}
              backgroundColor={showMediaType === "photo" ? "$blue10" : undefined}
              color={showMediaType === "photo" ? "white" : undefined}
              icon={Image}
              scaleIcon={1.4}
              flex={1}
            >Photos</Button>
          </Group.Item>
          <Group.Item>
            <Button
              size={'$3.5'}
              onPress={() => setShowMediaType("video")}
              backgroundColor={showMediaType === "video" ? "$blue10" : undefined}
              color={showMediaType === "video" ? "white" : undefined}
              icon={Video}
              scaleIcon={1.4}
              flex={1}
            >Videos</Button>
          </Group.Item>
        </Group>
      </YStack>

      <YStack gap="$2">
        <Text pl="$2">Sorting order</Text>
        <Group orientation="horizontal" borderRadius={"$12"}>
          <Group.Item>
            <Button
              size={'$3.5'}
              onPress={() => setSortingOrder("asc")}
              backgroundColor={sortingOrder === "asc" ? "$blue10" : undefined}
              color={sortingOrder === "asc" ? "white" : undefined}
              icon={ArrowBigUpDash}
              scaleIcon={1.5}
              flex={1}
            >Ascending</Button>
          </Group.Item>
          <Group.Item>
            <Button
              size={'$3.5'}
              onPress={() => setSortingOrder("desc")}
              backgroundColor={sortingOrder === "desc" ? "$blue10" : undefined}
              color={sortingOrder === "desc" ? "white" : undefined}
              icon={ArrowBigDownDash}
              scaleIcon={1.5}
              flex={1}
            >Descending</Button>
          </Group.Item>
        </Group>
      </YStack>

      <YStack gap="$2">
        <Text pl="$2">Sort By</Text>
        <YStack gap="$2">
          <CheckboxWithLabel
            id="sortBy-mediaType"
            checked={sortBy === "mediaType"}
            label="Media Type"
            onCheckedChange={(checked) => checked && setSortBy("mediaType")}
          />
          <CheckboxWithLabel
            id="sortBy-creationTime"
            checked={sortBy === "creationTime"}
            label="Creation Time"
            onCheckedChange={(checked) => checked && setSortBy("creationTime")}
          />
          <CheckboxWithLabel
            id="sortBy-modificationTime"
            checked={sortBy === "modificationTime"}
            label="Modification Time"
            onCheckedChange={(checked) => checked && setSortBy("modificationTime")}
          />
          <CheckboxWithLabel
            id="sortBy-duration"
            checked={sortBy === "duration"}
            label="Duration (only for videos)"
            onCheckedChange={(checked) => checked && setSortBy("duration")}
          />

        </YStack>
      </YStack>

    </>
  )
}