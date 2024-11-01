import { AppHeader } from "@/components/AppHeader"
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
] as const
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
] as const
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
] as const
const PoliciesLink = [
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
] as const

export default function SettingsPage() {

    const theme = useTheme()
    const { space } = getTokens()

    const { theme: appTheme, setTheme: setAppTheme } = useSettings()

    const [donationType, setDonationType] = useState<typeof DonationTypes[number]['label']>('One-time donation')
    const [donationAmount, setDonationAmount] = useState<typeof DonationAmounts[number]['label']>('$5')

    return (
        <>
            <AppHeader
                title={"Settings"}
            />
            <ScrollView
                nestedScrollEnabled
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    gap: "$4",
                    paddingBottom: space[10].val
                }}
                padding="$3"
            >

                <XStack gap="$4" alignItems="center">
                    <Avatar circular size="$6">
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
                </XStack>

                <YStack gap="$2" pt="$1">
                    <Text fontSize={"$5"}>Select Theme</Text>
                    <XStack gap="$2">
                        {
                            Themes.map(({ label, value, icon: Icon }) => (
                                <Button
                                    key={value}
                                    backgroundColor={value === appTheme ? "$blue10" : undefined}
                                    color={value === appTheme ? "white" : undefined}
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
                                    onPress={() => setAppTheme(value)}
                                    children={label}
                                />
                            ))
                        }


                    </XStack>
                </YStack>

                <YStack gap="$2" pt="$1">
                    <Text fontSize={"$5"}>Share with a friend</Text>
                    <XStack gap="$2">
                        <Image
                            source={{ uri: 'https://picsum.photos/200/300?random=1' }}
                            style={{
                                borderRadius: space["$4.5"].val,
                                flex: 0.9,
                                aspectRatio: 1,
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
                                        borderRadius={"$7"}
                                        padding="$3"
                                        flexGrow={2}
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
                                        }}
                                        children={label}
                                    />
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
                            DonationTypes.map(({ label, icon }) => (
                                <Button
                                    key={label}
                                    backgroundColor={label === donationType ? "$blue10" : undefined}
                                    color={label === donationType ? "white" : undefined}
                                    borderRadius={"$7"}
                                    padding="$3"
                                    flex={1}
                                    justifyContent="flex-start"
                                    alignItems="flex-start"
                                    flexDirection="column"
                                    height={"auto"}
                                    icon={icon}
                                    scaleIcon={1.5}
                                    textProps={{
                                        textTransform: "capitalize"
                                    }}
                                    onPress={() => setDonationType(label)}
                                    children={label}
                                />
                            ))
                        }
                    </XStack>
                    <Text>Select Amount</Text>
                    <XStack gap="$2" flexWrap="wrap">
                        {
                            DonationAmounts.map(({
                                amount,
                                icon,
                                label,
                                subLabel
                            }) => (
                                <Button
                                    key={amount}
                                    backgroundColor={
                                        label === donationAmount && label === "Custom" ?
                                            "$blue10" :
                                            undefined
                                    }
                                    color={
                                        label === donationAmount && label === "Custom" ?
                                            "white" :
                                            undefined
                                    }
                                    borderRadius={"$7"}
                                    padding="$3"
                                    flexGrow={1}
                                    minWidth={"$10"}
                                    justifyContent="flex-start"
                                    alignItems="flex-start"
                                    flexDirection="column"
                                    height={"auto"}
                                    icon={icon}
                                    scaleIcon={1.5}
                                    textProps={{
                                        textTransform: "capitalize"
                                    }}
                                    onPress={() => {
                                        setDonationAmount(label)
                                    }}>
                                    <YStack>
                                        <Text
                                            fontSize={"$6"}
                                            color={
                                                label === donationAmount && label === "Custom" ?
                                                    "white" :
                                                    undefined
                                            }>
                                            {label}
                                        </Text>
                                        <Text
                                            color={
                                                label === donationAmount && label === "Custom" ?
                                                    "white" :
                                                    undefined
                                            }
                                            opacity={0.5}>{subLabel}</Text>
                                    </YStack>
                                </Button>
                            ))
                        }
                    </XStack>

                    {
                        donationAmount === "Custom" &&
                        <XStack gap="$2">
                            <TextInput
                                placeholder="Custom amount (from $1)"
                                placeholderTextColor={theme.color05.val}
                                cursorColor={theme.color.val}
                                // autoFocus
                                style={{
                                    flex: 1,
                                    paddingHorizontal: space.$3.val,
                                    backgroundColor: theme.color4.val,
                                    borderRadius: space.$4.val,
                                }}
                            />
                            <Button
                                icon={ArrowRight}
                                borderRadius={"$6"}
                                scaleIcon={1.5}
                                aspectRatio={1}
                            />
                        </XStack>
                    }

                </YStack>

                <YStack gap="$2" pt="$2">
                    {
                        PoliciesLink.map(({ label, key, url }) => (
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

                <Button
                    borderRadius={"$12"}
                    px="$6"
                    backgroundColor={"$red10"}
                    color={"$white1"}
                    icon={LogOut}
                    alignSelf="center"
                >
                    Logout
                </Button>
            </ScrollView >
        </>
    )
}