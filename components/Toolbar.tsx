import { IconProps } from "@expo/vector-icons/build/createIconSet";
import { AlignStartHorizontal, CheckCheck, Copy, Filter, Grid, Grid3x3, LayoutDashboard, LayoutGrid, Move, Settings, Settings2, Share2, Trash2, Wand2, X } from "@tamagui/lucide-icons";
import { BlurView } from "expo-blur";
import { Slot } from "expo-router";
import { ReactNode, useState } from "react";
import { TouchableOpacity } from "react-native";
import Animated from "react-native-reanimated";
import { View, Text, useTheme, XStack, YStack, getTokens, Button, ScrollView, SizableText } from "tamagui";

// const 

const ToolbarItems = [
  'close',
  'copy',
  'move',
  'selectAll',
  'delete',
  'settings',
  'filter',
  'share',
  'layout',
  'close',
  'organise',
] as const
type ToolbarItemType = typeof ToolbarItems[number];


interface ToolbarProps {
  items:
  {
    [key in ToolbarItemType]?: {
      iconColor?: string,
      textColor?: string,
      onPress?: () => void
    }
  }
  visible: boolean
}

export function Toolbar({
  items,
  visible,
}: ToolbarProps) {
  // const theme = useTheme()

  // console.log(theme.background.get())

  const [opened, setOpened] = useState(false)

  if (!visible || Object.keys(items).length < 1) {
    return null
  }

  return (
    <Animated.View
    // sharedTransitionTag="toolbar"
    >
      <View
        style={{
          position: "absolute",
          bottom: 0,
          zIndex: 109,
          userSelect: "none",
          maxWidth: opened ? "96%" : "80%",
          alignSelf: "center",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
        borderRadius={opened ? "$8" : "$7"}
        margin="$2"
        marginBottom="$3"
        backgroundColor={"$background"}
        borderWidth={"$0.5"}
        borderColor={"$borderColor"}
      >
        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {
              Object.keys(items).map((key) => (
                <ToolBarButton
                  key={key}
                  type={key as ToolbarItemType}
                  iconColor={items[key as ToolbarItemType]?.iconColor}
                  textColor={items[key as ToolbarItemType]?.textColor}
                  onPress={items[key as ToolbarItemType]?.onPress}
                />
              ))
            }
          </ScrollView>
        </View>
      </View>
    </Animated.View>
  )
}

const ToolbarIcons: {
  [key in ToolbarItemType]: any
} = {
  "close": X,
  "copy": Copy,
  "move": Move,
  "selectAll": CheckCheck,
  "delete": Trash2,
  "settings": Settings,
  "filter": Filter,
  "share": Share2,
  "layout": AlignStartHorizontal,
  "organise": Wand2,
}

interface ToolBarButtonProps {
  type: ToolbarItemType
  iconColor?: string;
  textColor?: string;
  onPress?: () => void;
}

function ToolBarButton({
  type,
  iconColor,
  textColor,
  onPress = () => { },
}: ToolBarButtonProps) {
  const Icon = ToolbarIcons[type]
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
    >
      <YStack
        alignItems="center"
        padding="$2"
        paddingTop="$2.5"
        minWidth={"$6"}
      // aspectRatio={1}
      // backgroundColor={"$blue3"}
      >
        <Icon size={"$1"} color={iconColor} />
        <Text
          fontSize={"$1"}
          color={textColor}
          opacity={1}
          textTransform="capitalize"
        >{type}</Text>
      </YStack>
    </TouchableOpacity>
  )
}