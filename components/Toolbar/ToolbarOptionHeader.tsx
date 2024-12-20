import { RefreshCw } from "@tamagui/lucide-icons";
import { Button, Text, XStack } from "tamagui";

interface ToolbarOptionHeaderProps {
  icon: typeof RefreshCw;
  title: string;
  onReset?: () => void;
}

export function ToolbarOptionHeader({
  icon: Icon,
  title,
  onReset,
}: ToolbarOptionHeaderProps) {
  return (
    <XStack justifyContent="space-between" pl="$2.5">
      <XStack alignItems="center" gap="$2">
        <Icon size={"$1"} />
        <Text>{title}</Text>
      </XStack>
      <Button
        height="unset"
        backgroundColor={"transparent"}
        borderRadius={"$12"}
        opacity={!onReset ? 0 : 0.5}
        disabled={!onReset}
        icon={RefreshCw}
        onPress={onReset}
      >
        Reset
      </Button>
    </XStack>
  );
}
