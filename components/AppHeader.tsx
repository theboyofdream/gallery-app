import { ChevronLeft, X } from "@tamagui/lucide-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "react-native";
import { Button, Text, useTheme, XStack, YStack } from "tamagui";

type AppHeaderType = 'cancel' | 'back'

interface AppHeaderProps {
  title: string;
  subTitle?: string;
  type?: AppHeaderType
  onCancel?: () => void
}

export function AppHeader(
  {
    title,
    subTitle,
    type = 'back',
    onCancel
  }: AppHeaderProps
) {
  const router = useRouter();
  const theme = useTheme()
  return (
    <>
      <StatusBar
        backgroundColor={theme.background075.val}
      />
      <XStack alignItems="center" paddingVertical="$2" backgroundColor={"$background075"} zIndex={99}>
        <Button
          aspectRatio={1}
          icon={type === 'cancel' ? X : ChevronLeft}
          onPress={
            type === 'cancel' ?
              onCancel :
              router.back
          }
          padding={0}
          scaleIcon={2}
          borderRadius={"$12"}
          backgroundColor={"$colorTransparent"}
        />
        <YStack my="$1">
          <Text fontSize={"$6"}>{title}</Text>
          {
            subTitle &&
            <Text opacity={0.5} fontSize={"$1"}>
              {subTitle}
            </Text>
          }
        </YStack>
      </XStack>
    </>
  )
}