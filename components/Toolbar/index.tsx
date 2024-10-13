import { useSettings } from "@/zustand";
import { IconProps } from "@expo/vector-icons/build/createIconSet";
import { AlignStartHorizontal, CheckCheck, Copy, Filter, Grid, Grid3x3, LayoutDashboard, LayoutGrid, Move, Image as ImageIcon, Check as CheckIcon, Settings, Settings2, Share2, Trash2, Wand2, X, Video, ArrowBigUpDash, ArrowBigDownDash, RefreshCw, SwatchBook, Sun, MoonStar, LogOut, ChevronDown, Info, ExternalLink, ArrowUpRight, CircleDollarSign, Palette, CalendarClock, CupSoda, Pizza, Soup, Cookie, Hand, Coins, ArrowRight, Link, Share, Github, Twitter, Trash } from "@tamagui/lucide-icons";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { Slot, useRouter } from "expo-router";
import { ReactNode, useCallback, useState } from "react";
import { Linking, Pressable, StatusBar, TextInput, TouchableOpacity, useWindowDimensions, ViewStyle } from "react-native";
import Animated from "react-native-reanimated";
import { G } from "react-native-svg";
import { View, Text, useTheme, XStack, YStack, getTokens, ScrollView, Button, SizableText, Separator, Group, CheckboxProps, Checkbox, Label, Progress, Slider, Header, H1, Accordion, Paragraph, Square, Input, InputFrame, Avatar } from "tamagui";
import { ToolbarOptionFooter } from "./ToolbarOptionFooter";
import { ToolbarOptionHeader } from "./ToolbarOptionHeader";
import { LayoutView } from "./LayoutView";
import { SettingsView } from "./SettingsView";
import { FilterView } from "./FilterView";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

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
  'info'
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
  const router = useRouter()
  const gotoSettings = () => router.push('/albums/settings')

  // console.log(theme.background.get())
  const [activeOption, setActiveOption] = useState<'organise' | 'filter' | 'layout' | 'settings' | null>(null)
  const [opened, setOpened] = useState(false)

  const theme = useTheme()
  const overlayColor = theme.color1.get()


  function onToolbarOptionPress(option: typeof activeOption) {
    setOpened(true)
    setActiveOption(option)
  }
  function onToolbarOptionClose() {
    setOpened(false)
    setActiveOption(null)
  }


  if (!visible || Object.keys(items).length < 1) {
    return null
  }

  return (
    <>
      {
        opened && activeOption !== 'organise' &&
        <>

          <StatusBar
            translucent
            backgroundColor={theme.background05.val}
          />

          <Pressable
            onPress={onToolbarOptionClose}
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

        </>
      }

      <View
        animation={"slow"}
        style={[{
          position: "absolute",
          bottom: 0,
          zIndex: 109,
          userSelect: "none",
          alignSelf: "center",
          overflow: "hidden",
        },
        opened && {
          width: opened ? "96%" : undefined,
          maxWidth: opened ? "96%" : "80%",
          maxHeight: "96%",
        }
        ]}
        p="$1"
        px={"$1.5"}
        borderRadius={"$9"}
        margin="$2"
        marginBottom="$3"
        backgroundColor={"$background"}
        borderWidth={"$0.5"}
        borderColor={"$borderColor"}
      >
        {
          opened && activeOption !== 'organise' &&
          <>
            {/* <ToolbarOptionHeader
              icon={ToolbarIcons[activeOption ?? "layout"]}
              title={activeOption ?? ""}
            /> */}

            <YStack gap="$3">
              {activeOption === 'filter' && <FilterView close={onToolbarOptionClose} />}
              {activeOption === 'layout' && <LayoutView close={onToolbarOptionClose} />}
              {/* {activeOption === 'settings' && <SettingsView />} */}
            </YStack>

            {/* <ToolbarOptionFooter
              onApply={() => { }}
              onClear={() => { }}
              onCancel={onToolbarOptionClose}
            /> */}
          </>
        }


        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          paddingVertical="$1"
        >
          {
            activeOption === 'organise' &&
            <>
              <ToolBarButton
                type={"close"}
                onPress={onToolbarOptionClose}
              />
              <ToolBarButton
                type={"copy"}
              />
              <ToolBarButton
                type={"move"}
              />
              <ToolBarButton
                type={"selectAll"}
                text="Select All"
              />
              <ToolBarButton
                type={"delete"}
              />
              <ToolBarButton
                type={"share"}
                disabled
              />
            </>
          }

          {
            !opened &&
            Object.keys(items).map((key) => (
              <ToolBarButton
                key={key}
                type={key as ToolbarItemType}
                iconColor={items[key as ToolbarItemType]?.iconColor}
                textColor={items[key as ToolbarItemType]?.textColor}
                disabled={key == 'share'}
                // disabled
                onPress={() => {
                  onToolbarOptionPress(key as typeof activeOption)
                  items[key as ToolbarItemType]?.onPress?.()
                  if (key === 'settings') {
                    gotoSettings()
                    return
                  }
                  if (key === 'close') {
                    onToolbarOptionClose()
                    return
                  }
                }}
              />
            ))
          }
        </ScrollView>
      </View>
    </>
  )
}

const ToolbarIcons: {
  [key in ToolbarItemType]: any
} = {
  "close": X,
  "copy": Copy,
  "move": Move,
  "selectAll": CheckCheck,
  "delete": Trash,
  "settings": Settings,
  "filter": Filter,
  "share": Share,
  "layout": AlignStartHorizontal,
  "organise": Wand2,
  'info': Info
}

interface ToolBarButtonProps {
  type: ToolbarItemType
  iconColor?: string;
  textColor?: string;
  text?: string;
  onPress?: () => void;
  style?: ViewStyle
  disabled?: boolean;
}

export function ToolBarButton({
  type,
  iconColor,
  textColor,
  text,
  onPress = () => { },
  disabled,
  style
}: ToolBarButtonProps) {
  const Icon = ToolbarIcons[type]
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled}
      style={[
        style,
        disabled && {
          opacity: 0.5,
        }
      ]}
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
        >{text ?? type}</Text>
      </YStack>
    </TouchableOpacity>
  )
}
