import * as MediaLibrary from "expo-media-library";
import { useEffect, useState } from "react";
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function App() {
  const [albums, setAlbums] = useState<MediaLibrary.Album[]>([]);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  async function getAlbums() {
    if (permissionResponse?.status !== "granted") {
      await requestPermission();
    }
    const fetchedAlbums = await MediaLibrary.getAlbumsAsync({
      includeSmartAlbums: true,
    });
    setAlbums(fetchedAlbums);
  }

  useEffect(() => {
    getAlbums();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* <Button onPress={getAlbums} title="Get albums" /> */}
      <ScrollView style={{ flex: 1 }}>
        {albums && albums.map((album) => <AlbumEntry album={album} />)}
      </ScrollView>
    </SafeAreaView>
  );
}

function AlbumEntry({ album }) {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    async function getAlbumAssets() {
      const albumAssets = await MediaLibrary.getAssetsAsync({ album });
      setAssets(albumAssets.assets);
    }
    getAlbumAssets();
  }, [album]);

  return (
    <View key={album.id} style={styles.albumContainer}>
      <Text>
        {album.title} - {album.assetCount ?? "no"} assets
      </Text>
      <View style={styles.albumAssetsContainer}>
        {assets &&
          assets.map((asset) => (
            <Image source={{ uri: asset.uri }} width={50} height={50} />
          ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 8,
    justifyContent: "center",
    ...Platform.select({
      android: {
        paddingTop: 40,
      },
    }),
  },
  albumContainer: {
    paddingHorizontal: 20,
    marginBottom: 12,
    gap: 4,
  },
  albumAssetsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
