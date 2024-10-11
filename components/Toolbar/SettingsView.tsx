import { useSettings } from "@/zustand"
import { Link, SwatchBook, Settings, Share, Sun, MoonStar, CircleDollarSign, CalendarClock, Cookie, CupSoda, Pizza, Soup, Coins, RefreshCw, LogOut, Github, Twitter, ArrowRight, ArrowUpRight } from "@tamagui/lucide-icons"
import { Image } from "expo-image"
import { useState } from "react"
import { Linking, TextInput, TouchableOpacity } from "react-native"
import { useTheme, Button, ScrollView, View, getTokens, XStack, Avatar, YStack, Text } from "tamagui"



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
const ShareLinks = [
  {
    label: 'copy',
    icon: Link,
    url: 'https://picsum.photos/200/300?random=1'
  },
  {
    label: 'share',
    icon: Share,
    url: 'https://picsum.photos/200/300?random=1'
  },
  {
    label: 'star',
    icon: Github,
    url: 'https://picsum.photos/200/300?random=1'
  },
  {
    label: 'follow',
    icon: Twitter,
    url: 'https://picsum.photos/200/30'
  }
]

export function SettingsView() {

  const tamaguitheme = useTheme()
  const { space, size } = getTokens()
  const { albumItemColumns, updateColumns, maxColumns, minColumns, theme, setTheme } = useSettings()
  const [opendAccordion, setOpendAccordion] = useState<'license' | 'terms-and-conditions' | 'privacy-policy' | 'about-us' | ''>('')

  return (
    <ScrollView
      nestedScrollEnabled
      showsVerticalScrollIndicator={false}
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

      <YStack gap="$2" pt="$1">
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
                  padding="$3"
                  flex={1}
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  flexDirection="column"
                  height={"auto"}
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


      <YStack gap="$2" pt="$1">
        <Text fontSize={"$5"}>Share with a friend</Text>
        <XStack gap="$2">
          <Image
            source={{ uri: 'https://picsum.photos/200/300?random=1' }}
            style={{
              // height: 100,
              aspectRatio: 1,
              borderRadius: space["$4.5"].val,
              flex: 1,
            }}
          />
          <XStack
            flex={1}
            gap="$2"
            flexWrap="wrap"
          >
            {
              ShareLinks.map(({ label, icon: Icon, url }) => (
                <Button
                  key={label}
                  // backgroundColor={value === theme ? "$blue10" : undefined}
                  // color={value === theme ? "white" : undefined}
                  borderRadius={"$7"}
                  padding="$3"
                  // flex={1}
                  style={{
                    minWidth: "23%"
                  }}
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  flexDirection="column"
                  height={"auto"}
                  icon={Icon}
                  scaleIcon={1.5}
                  textProps={{
                    textTransform: "capitalize"
                  }}
                  onPress={() => {
                    Linking.openURL(url)
                    // setTheme(value)
                  }}
                >
                  {label}
                </Button>
              ))
            }
          </XStack>
        </XStack>
      </YStack>

      <YStack gap="$2" pt="$1">
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
                  padding="$3"
                  flex={1}
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  flexDirection="column"
                  height={"auto"}
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
                  padding="$3"
                  flexGrow={1}
                  minWidth={"$10"}
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  flexDirection="column"
                  height={"auto"}
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
        // backgroundColor={'$color4'}
        >
          <TextInput
            placeholder="Custom amount (from $1)"
            // showSoftInputOnFocus
            // autoFocus
            cursorColor={tamaguitheme.color.val}
            style={{
              flex: 1,
              paddingHorizontal: space.$3.val,
              backgroundColor: tamaguitheme.color4.val,
              borderRadius: space.$4.val,
            }}
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

      <YStack gap="$2" pt="$2">
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
  )
}