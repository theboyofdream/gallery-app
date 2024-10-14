import { PropsWithChildren } from "react";
import { Pressable, StatusBar } from "react-native";
import { useTheme, View } from "tamagui";

interface BottomSheetProps extends PropsWithChildren {
  close: () => void;
  open: boolean;
}

export function BottomSheet({ children, close, open }: BottomSheetProps) {
  const theme = useTheme();

  if (!open) {
    return null;
  }

  return (
    <>
      <StatusBar translucent backgroundColor={theme.background05.val} />

      <Pressable
        onPress={close}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: theme.background05.val,
          zIndex: 100,
        }}
      />

      <View
        animation={"slow"}
        style={[
          {
            position: "absolute",
            bottom: 0,
            zIndex: 109,
            userSelect: "none",
            alignSelf: "center",
            overflow: "hidden",
          },
          open && {
            width: open ? "96%" : undefined,
            maxWidth: open ? "96%" : "80%",
            maxHeight: "96%",
          },
        ]}
        p="$1"
        px={"$1.5"}
        borderRadius={"$9"}
        margin="$2"
        marginBottom="$3"
        backgroundColor={"$background"}
        borderWidth={"$0.5"}
        borderColor={"$borderColor"}
        gap="$1"
      >
        {children}
      </View>
    </>
  );
}
