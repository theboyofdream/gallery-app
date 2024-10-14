import { Copy, Info } from "@tamagui/lucide-icons";
import { format } from "date-fns/format";
import * as Clipboard from "expo-clipboard";
import { Button, Text, YStack } from "tamagui";
import { BottomSheet } from "../BottomSheet";
import { ToolbarOptionFooter } from "./ToolbarOptionFooter";
import { ToolbarOptionHeader } from "./ToolbarOptionHeader";

interface DeleteViewProps {
  close: () => void;
  open: boolean;
  urls: string[];
  // details: Asset;
}

export function DeleteView({ close, open, urls }: DeleteViewProps) {
  // const [size, setSize] = useState(0);

  // useEffect(() => {
  //   fs.getInfoAsync(details.uri).then((v) => {
  //     setSize(v.size ?? 0);
  //   });
  // }, [details]);

  return (
    <BottomSheet close={close} open={open}>
      <ToolbarOptionHeader icon={Info} title={"Details"} />

      <YStack px="$3" gap="$3">
        <Item label="Name" text={details.filename} />
        <Item label="Type" text={details.mediaType} />
        <Item label="Dimension" text={`${details.width}x${details.height}`} />
        <Item label="Size" text={formatBytes(size)} />
        <Item
          label="Creation Time"
          text={format(new Date(details.creationTime), "dd MMM y hh:mm a")}
        />
        <Item
          label="Last Modified Time"
          text={format(new Date(details.modificationTime), "dd MMM y hh:mm a")}
        />
        <Item label="Path" text={details.uri} copy />
      </YStack>

      <ToolbarOptionFooter onCancel={close} />
    </BottomSheet>
  );
}

interface ItemProps {
  label: string;
  text: string;
  copy?: boolean;
}
function Item({ label, text, copy }: ItemProps) {
  return (
    <YStack>
      <Text opacity={0.5}>{label}</Text>
      <Text>{text}</Text>

      {copy && (
        <Button
          icon={Copy}
          padded={false}
          height={"$3"}
          mt={"$2"}
          alignSelf="flex-start"
          children={"copy"}
          onPress={() => {
            Clipboard.setStringAsync(text);
          }}
        />
      )}
    </YStack>
  );
}
