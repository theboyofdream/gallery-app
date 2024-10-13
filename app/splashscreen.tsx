import { useAlbum, useAlbums } from "@/hooks";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "tamagui";

export default function SplashScreen() {
  const router = useRouter();

  const { hasPermission } = useAlbums()

  const [redirectingIn, setRedirectingIn] = useState(3)
  let interval: NodeJS.Timer | null = null

  useEffect(() => {
    const interval = setInterval(() => {
      setRedirectingIn(prev => prev - 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (redirectingIn <= 0) {
      interval && clearInterval(interval)
      router.push("/permissions")
    }
  }, [redirectingIn])

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Splash</Text>
      <Text>{redirectingIn} in seconds</Text>
    </View>
  )
}