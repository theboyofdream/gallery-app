import * as MediaLibrary from "expo-media-library";
import { useEffect, useState } from "react";

export function usePermissions() {

  const [permissionResponse, requestPermission, getPermissionsAsync] = MediaLibrary.usePermissions();
  const [permissionStatus, setPermissionStatus] = useState<AppPermissionStatus>(permissionResponse?.status || 'undetermined')

  useEffect(() => {
    getPermissionsAsync()
      .then(({ status }) => setPermissionStatus(status))
      .catch(console.error)
  }, [])

  return {
    permissionStatus,
    requestPermission
  }
}
