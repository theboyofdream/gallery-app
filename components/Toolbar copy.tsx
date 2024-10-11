import { useSettings } from "@/zustand";
import { IconProps } from "@expo/vector-icons/build/createIconSet";
import { AlignStartHorizontal, CheckCheck, Copy, Filter, Grid, Grid3x3, LayoutDashboard, LayoutGrid, Move, Image as ImageIcon, Check as CheckIcon, Settings, Settings2, Share2, Trash2, Wand2, X, Video, ArrowBigUpDash, ArrowBigDownDash, RefreshCw, SwatchBook, Sun, MoonStar, LogOut, ChevronDown, Info, ExternalLink, ArrowUpRight, CircleDollarSign, Palette, CalendarClock, CupSoda, Pizza, Soup, Cookie, Hand, Coins, ArrowRight } from "@tamagui/lucide-icons";
import { BlurView } from "expo-blur";
import { Slot } from "expo-router";
import { ReactNode, useState } from "react";
import { Pressable, StatusBar, TouchableOpacity, useWindowDimensions } from "react-native";
import Animated from "react-native-reanimated";
import { G } from "react-native-svg";
import { View, Text, useTheme, XStack, YStack, getTokens, ScrollView, Button, SizableText, Separator, Group, CheckboxProps, Checkbox, Label, Progress, Slider, Header, H1, Accordion, Paragraph, Square, Input, InputFrame, Avatar } from "tamagui";

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

  const [opened, setOpened] = useState(true)

  const theme = useTheme()
  const overlayColor = theme.color05.get()

  if (!visible || Object.keys(items).length < 1) {
    return null
  }

  return (
    <AnimatedPressable
      // sharedTransitionTag="toolbar"
      style={[
        opened && {
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: overlayColor,
        }]}
    >
      {
        opened &&
        <StatusBar
          translucent
          backgroundColor={overlayColor}
        />
      }
      <View
        style={{
          position: "absolute",
          bottom: 0,
          zIndex: 109,
          userSelect: "none",
          width: opened ? "96%" : undefined,
          maxWidth: opened ? "96%" : "80%",
          maxHeight: "96%",
          alignSelf: "center",
          // flexDirection: "row",
          // justifyContent: "center",
          // alignItems: "center",
          overflow: "hidden",
        }}
        p="$1"
        px="$2"
        borderRadius={"$9"}
        margin="$2"
        marginBottom="$3"
        backgroundColor={"$background"}
        borderWidth={"$0.5"}
        borderColor={"$borderColor"}
      >
        <View
          p="$2.5"
          gap="$2"
        >

          {/* <FilterView /> */}
          {/* <LayoutView /> */}
          <SettingsView />

        </View>

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
    </AnimatedPressable>
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

function FilterView() {

  const [showMediaType, setShowMediaType] = useState<MediaType | "all">("all")
  const [sortingOrder, setSortingOrder] = useState<SortingOrder>("asc")
  const [sortBy, setSortBy] = useState<SortBy>("modificationTime")
  // const showMediaTypeBtnBgClr = showMediaType === "all" ? "$blue10" : undefined

  return (
    <View gap="$4">

      <YStack gap="$2">
        <Text pl="$2">Show</Text>
        <Group orientation="horizontal" borderRadius={"$12"}>
          <Group.Item>
            <Button onPress={() => setShowMediaType("all")} backgroundColor={showMediaType === "all" ? "$blue10" : undefined} color={showMediaType === "all" ? "white" : undefined}>All</Button>
          </Group.Item>
          <Group.Item>
            <Button onPress={() => setShowMediaType("photo")} backgroundColor={showMediaType === "photo" ? "$blue10" : undefined} color={showMediaType === "photo" ? "white" : undefined} icon={ImageIcon} scaleIcon={1.4}>Photos</Button>
          </Group.Item>
          <Group.Item>
            <Button onPress={() => setShowMediaType("video")} backgroundColor={showMediaType === "video" ? "$blue10" : undefined} color={showMediaType === "video" ? "white" : undefined} icon={Video} scaleIcon={1.4}>Videos</Button>
          </Group.Item>
        </Group>
      </YStack>

      <YStack gap="$2">
        <Text pl="$2">Sorting order</Text>
        <Group orientation="horizontal" borderRadius={"$12"}>
          <Group.Item>
            <Button onPress={() => setSortingOrder("asc")} backgroundColor={sortingOrder === "asc" ? "$blue10" : undefined} color={sortingOrder === "asc" ? "white" : undefined} icon={ArrowBigUpDash} scaleIcon={1.5}>Ascending</Button>
          </Group.Item>
          <Group.Item>
            <Button onPress={() => setSortingOrder("desc")} backgroundColor={sortingOrder === "desc" ? "$blue10" : undefined} color={sortingOrder === "desc" ? "white" : undefined} icon={ArrowBigDownDash} scaleIcon={1.5}>Descending</Button>
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

      {/* <View
        height={"$1.5"}
        width={"100%"}
      /> */}

      <XStack alignItems="center" justifyContent="space-between">
        <XStack alignItems="center" gap="$2">
          <Filter size={"$1"} />
          <Text>Filter</Text>
        </XStack>
        <XStack alignItems="center" gap="$2">
          <Button
            backgroundColor={"$blue4"}
            color={"$blue10"}
            borderRadius={"$12"}
          >Apply</Button>
          <Button
            backgroundColor={"$red4"}
            color={"$red10"}
            borderRadius={"$12"}
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

    </View>
  )
}


function LayoutView() {

  const [layoutType, setLayoutType] = useState<'grid' | 'masnory'>("grid")
  const [sortingOrder, setSortingOrder] = useState<SortingOrder>("asc")
  const [sortBy, setSortBy] = useState<SortBy>("modificationTime")
  // const showMediaTypeBtnBgClr = showMediaType === "all" ? "$blue10" : undefined

  const { albumItemColumns, updateColumns, maxColumns, minColumns } = useSettings()
  const { width, height } = useWindowDimensions()

  return (
    <>
      {/* <View
        style={{
          position: "fixed",
          zIndex: 1,
          top: 0,
          left: 0,
          width,
          height,
          backgroundColor: 'red'
        }}
      /> */}

      <View gap="$4" zIndex={100}>


        <XStack justifyContent="space-between">
          <XStack alignItems="center" gap="$2">
            <AlignStartHorizontal size={"$1"} />
            <Text>Layout</Text>
          </XStack>
          <Button
            // padding="$0"
            height="unset"
            backgroundColor={"transparent"}
            opacity={0.5}
            icon={RefreshCw}
          >Reset</Button>
        </XStack>

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

        <XStack alignItems="center" justifyContent="flex-end">
          {/* <XStack alignItems="center" gap="$2">
          <AlignStartHorizontal size={"$1"} />
          <Text>Layout</Text>
        </XStack> */}
          <XStack alignItems="center" gap="$2">
            <Button
              backgroundColor={"$blue4"}
              color={"$blue10"}
              borderRadius={"$12"}
            >Apply</Button>
            <Button
              backgroundColor={"$red4"}
              color={"$red10"}
              borderRadius={"$12"}
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

      </View>
    </>
  )
}


const Themes = [
  {
    label: "System",
    value: "system",
    icon: SwatchBook
  },
  {
    label: "Light",
    value: "light",
    icon: Sun
  },
  {
    label: "Dark",
    value: "dark",
    icon: MoonStar
  },
] as const

const DonationTypes = [
  {
    label: 'One-time donation',
    // subLabel: 'via Stripe',
    icon: CircleDollarSign
  },
  {
    label: 'Recurring donation',
    // subLabel: 'via PayPal',
    icon: CalendarClock
  }
]
const DonationAmounts = [
  {
    label: '$5',
    subLabel: 'Cookie',
    currency: 'USD',
    currencySymbol: '$',
    amount: 5,
    icon: Cookie
  },
  {
    label: '$10',
    subLabel: 'Cup of coffee',
    currency: 'USD',
    currencySymbol: '$',
    amount: 10,
    icon: CupSoda
  },
  {
    label: '$15',
    subLabel: 'Pizza',
    currency: 'USD',
    currencySymbol: '$',
    amount: 15,
    icon: Pizza
  },
  {
    label: '$25',
    subLabel: 'Soup',
    currency: 'USD',
    currencySymbol: '$',
    amount: 25,
    icon: Soup
  },
  {
    label: 'Custom',
    subLabel: 'Custom amount (from $1)',
    currency: 'USD',
    currencySymbol: '$',
    amount: 1,
    icon: Coins
  },
]


function SettingsView() {

  const { albumItemColumns, updateColumns, maxColumns, minColumns, theme, setTheme } = useSettings()
  const [opendAccordion, setOpendAccordion] = useState<'license' | 'terms-and-conditions' | 'privacy-policy' | 'about-us' | ''>('')

  return (

    <View gap="$4" zIndex={100}>

      <XStack justifyContent="space-between">
        <XStack alignItems="center" gap="$2">
          <Settings size={"$1"} />
          <Text>Settings</Text>
        </XStack>
        <Button
          // padding="$0"
          height="unset"
          backgroundColor={"transparent"}
          opacity={0.5}
          icon={RefreshCw}
        >Reset</Button>
      </XStack>


      <ScrollView
        maxHeight={"100%"}
        scrollEnabled
        contentContainerStyle={{
          gap: "$4"
        }}
      >

        <XStack gap="$2" alignItems="center">
          <Avatar circular size="$5">
            <Avatar.Image
              accessibilityLabel="Cam"
              src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
            />
            <Avatar.Fallback backgroundColor="$blue10" />
          </Avatar>
          <YStack>
            <Text>Username</Text>
            <Text opacity={0.5}>email</Text>
          </YStack>
          <View flex={1} />
          <Button
            borderRadius={"$12"}
            px="$4"
            backgroundColor={"$red10"}
            color={"$white1"}
            icon={LogOut}
          >
            Logout
          </Button>
        </XStack>

        <YStack gap="$2" mt="$3">
          <Text fontSize={"$5"}>Select Theme</Text>
          <XStack gap="$2">
            {
              (Themes).map(({ label, value, icon: Icon }) => {
                return (
                  <Button
                    key={value}
                    backgroundColor={value === theme ? "$blue10" : undefined}
                    color={value === theme ? "white" : undefined}
                    borderRadius={"$7"}
                    // gap="$1"
                    padding="$3"
                    flex={1}
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    flexDirection="column"
                    height={"auto"}
                    // fontSize={"$5"}
                    icon={Icon}
                    scaleIcon={1.5}
                    textProps={{
                      textTransform: "capitalize"
                    }}
                    onPress={() => setTheme(value)}
                  >
                    {label}
                  </Button>
                )
              })
            }


          </XStack>
        </YStack>

        {/* <Text fontSize={"$6"} fontWeight={"bold"}>Support development with Donation</Text> */}
        {/* <Text fontSize={"$5"}>Support development with Donation</Text> */}
        <YStack gap="$2" mt="$3">
          <Text fontSize={"$5"}>Donations</Text>
          <Text>Select Type</Text>
          <XStack gap="$2">
            {
              DonationTypes.map((item) => {
                return (
                  <Button
                    key={item.label}
                    // backgroundColor={item === theme ? "$blue10" : undefined}
                    // color={item === theme ? "white" : undefined}
                    borderRadius={"$7"}
                    // gap="$1"
                    padding="$3"
                    flex={1}
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    flexDirection="column"
                    height={"auto"}
                    // fontSize={"$6"}
                    icon={item.icon}
                    scaleIcon={1.5}
                    textProps={{
                      textTransform: "capitalize"
                    }}
                  // onPress={() => setTheme(item)}
                  >
                    {item.label}
                  </Button>
                )
              })
            }
          </XStack>
          <Text>Select Amount</Text>
          <XStack gap="$2" flexWrap="wrap">
            {
              DonationAmounts.map((item) => {
                return (
                  <Button
                    key={item.amount}
                    // backgroundColor={item === theme ? "$blue10" : undefined}
                    // color={item === theme ? "white" : undefined}
                    borderRadius={"$7"}
                    // gap="$1"
                    padding="$3"
                    // flex={1}
                    flexGrow={1}
                    minWidth={"$10"}
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    flexDirection="column"
                    height={"auto"}
                    // fontSize={"$6"}
                    icon={item.icon}
                    scaleIcon={1.5}
                    textProps={{
                      textTransform: "capitalize"
                    }}
                  // onPress={() => setTheme(item)}
                  >
                    <YStack>
                      <Text fontSize={"$6"}>
                        {item.label}
                      </Text>
                      <Text>{item.subLabel}</Text>
                    </YStack>
                  </Button>
                )
              })
            }
          </XStack>
          <XStack
            // borderRadius={"$7"}
            // borderColor={"$borderColor"}
            // borderWidth={"$0.5"}
            gap="$2"
          >
            <Input
              borderRadius={"$6"}
              // borderWidth={"$0"}
              placeholder="Custom amount (from $1)"
              flex={1}
            />
            <Button
              icon={ArrowRight}
              borderRadius={"$6"}
              scaleIcon={1.5}
              aspectRatio={1}
            // borderTopLeftRadius={0}
            // borderBottomLeftRadius={0}
            />
          </XStack>
        </YStack>

        <YStack gap="$2" mt="$3">
          {
            [
              {
                label: "License",
                key: "license",
                url: "https://github.com/sahil-saini/react-native-media-gallery/blob/main/LICENSE"
              },
              {
                label: "Terms & Conditions",
                key: "terms-and-conditions",
                url: "https://github.com/sahil-saini/react-native-media-gallery/blob/main/LICENSE"
              },
              {
                label: "Privacy Policy",
                key: "privacy-policy",
                url: "https://github.com/sahil-saini/react-native-media-gallery/blob/main/LICENSE"
              },
              {
                label: "About Us",
                key: "about-us",
                url: "https://github",
              }
            ].map(({ label, key, url }) => (
              <TouchableOpacity
                activeOpacity={0.8}
                key={key}
              >
                <XStack
                  key={key}
                  alignItems="flex-start"
                  padding="$1"
                >
                  <Text>{label}</Text>
                  <ArrowUpRight size={"$1"} scale={0.8} />
                </XStack>
              </TouchableOpacity>
            ))}
        </YStack>

        <Text textAlign="center" opacity={0.5}>Version: 1.0.0</Text>
      </ScrollView>

      <XStack alignItems="center" justifyContent="flex-end">
        {/* <XStack alignItems="center" gap="$2">
          <AlignStartHorizontal size={"$1"} />
          <Text>Layout</Text>
        </XStack> */}

        {/* <Button
          borderRadius={"$12"}
          px="$4"
          backgroundColor={"$red10"}
          color={"$white1"}
          // color={"$red10"}
          icon={LogOut}
        >
          Logout
        </Button> */}

        <XStack alignItems="center" gap="$2">
          <Button
            backgroundColor={"$blue4"}
            color={"$blue10"}
            borderRadius={"$12"}
          >Apply</Button>
          <Button
            backgroundColor={"$red4"}
            color={"$red10"}
            borderRadius={"$12"}
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

    </View>
  )
}


function CheckboxWithLabel({
  id,
  size,
  label = 'Default Label',
  ...checkboxProps
}: CheckboxProps & { label?: string }) {
  // const id = `checkbox-${(size || '').toString().slice(1)}`
  return (
    <XStack alignItems="center" gap="$4">
      <Checkbox id={id} size={size}
        backgroundColor={checkboxProps.checked ? "$blue10" : undefined}
        borderRadius={"$3"}
        borderColor={checkboxProps.checked ? "$blue9" : undefined}
        {...checkboxProps}>
        <Checkbox.Indicator>
          <CheckIcon
            color={checkboxProps.checked ? "white" : undefined}
          />
        </Checkbox.Indicator>
      </Checkbox>

      <Label size={size} htmlFor={id} lineHeight={"$1"} color={"$color"}>
        {label}
      </Label>
    </XStack>
  )
}