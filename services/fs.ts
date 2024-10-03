import * as MediaLibrary from "expo-media-library";
import { useEffect, useState } from "react";


export async function fs() { }

function useMediaPermissions() {
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const hasPermission = permissionResponse?.granted ?? false

  useEffect(() => {
    if (!permissionResponse || permissionResponse.granted) return

    if (
      (
        permissionResponse.accessPrivileges !== "all" ||
        permissionResponse.status !== "granted"
      ) &&
      permissionResponse.canAskAgain
    ) {
      requestPermission()
    }
  }, [permissionResponse])

  return {
    hasPermission,
    requestPermission
  }
}
function useAlbums() {
  const { hasPermission, requestPermission } = useMediaPermissions()

  const [albums, setAlbums] = useState<MediaLibrary.Album[]>([]);
  async function getAlbums() {
    const fetchedAlbums = await MediaLibrary.getAlbumsAsync({
      includeSmartAlbums: true,

    });
    setAlbums(fetchedAlbums);
  }

  useEffect(() => {
    if (hasPermission) {
      getAlbums();
    } else {
      requestPermission()
    }
  }, [hasPermission]);

  useEffect(() => {
    const subscribeMediaChanges = MediaLibrary.addListener((e) => {

    });

    () => {
      subscribeMediaChanges.remove()
      MediaLibrary.removeAllListeners()
    }
  }, [])
}
