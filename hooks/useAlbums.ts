import {
  usePermissions,
  Asset,
  getAlbumsAsync,
  getAssetsAsync,
  Album,
} from "expo-media-library";
import { useRouter } from "expo-router";
import { useState, useEffect, useMemo } from "react";
import { getTokens, useTheme } from "tamagui";

export function useAlbums() {
  const [permissionResponse, requestPermission] = usePermissions();
  async function handlePermission() {
    if (permissionResponse?.status !== "granted") {
      await requestPermission();
    }
  }

  const [customAlbums, setCustomAlbums] = useState<CustomAlbum[]>([]);
  async function getAlbums() {
    let customAlbums = [] as CustomAlbum[];
    await getAlbumsAsync({
      includeSmartAlbums: false,
    }).then(async (albums) => {
      for (let album of albums) {
        const asset = await getAssetsAsync({
          first: 1,
          album: album,
          sortBy: "modificationTime",
          mediaType: "photo",
        });
        if (asset.assets.length > 0) {
          customAlbums.push({
            ...album,
            thumbnail: asset.assets[0],
            // assets: asset.assets,
          });
        }
      }
    });
    setCustomAlbums(customAlbums);
  }

  useMemo(() => {
    if (permissionResponse && permissionResponse.status != "granted") {
      handlePermission();
    } else {
      getAlbums();
    }
  }, [permissionResponse]);

  async function getAlbumById(id: string) {
    for (let album of customAlbums) {
      if (album.id === id) {
        const asset = await getAssetsAsync({
          first: album.assetCount,
          album: album,
          sortBy: "modificationTime",
          mediaType: "photo",
        });
        return {
          ...album,
          items: asset,
        };
      }
    }
    return null;
  }

  return {
    albums: customAlbums,
    getAlbums,
    getAlbumById,
    hasPermission: permissionResponse?.granted ?? false,
    requestPermission: handlePermission,
  };
}
