import { Button, XStack } from "tamagui";

interface ToolbarOptionFooterProps {
  onApply?: () => void
  onClear?: () => void
  onCancel?: () => void
}

export function ToolbarOptionFooter(
  {
    onApply,
    onClear,
    onCancel
  }: ToolbarOptionFooterProps
) {
  return (
    <XStack
      p="$1.5"
      pt="$3"
      alignItems="center"
      justifyContent="flex-end"
    >

      <XStack alignItems="center" gap="$2">

        <Button
          backgroundColor={"$colorTransparent"}
          color={"$red10"}
          borderRadius={"$12"}
          onPress={onCancel}
        >
          Close
        </Button>

        <XStack flex={1} />

        <Button
          backgroundColor={"$blue4"}
          color={"$blue10"}
          borderRadius={"$12"}
          onPress={onApply}
        >Apply</Button>
        <Button
          backgroundColor={"$red4"}
          color={"$red10"}
          borderRadius={"$12"}
          onPress={onClear}
        >Clear</Button>
        {/* <Button
                backgroundColor={"$red4"}
                color={"$red10"}
                borderRadius={"$12"}
                aspectRatio={1}
                icon={X}
                scaleIcon={1.5}
              /> */}
      </XStack>
    </XStack>
  )
}