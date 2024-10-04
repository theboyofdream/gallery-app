import { getAlbumsAsync, getAssetsAsync } from "expo-media-library";
import { create } from "zustand";
import { combine } from "zustand/middleware";

export const useAlbumStore = create(
  combine({
    albums: [] as CustomAlbum[],
    selectedAlbum: null as CustomAlbum | null,
  },
    (set, get) => ({
      async findAlbums() {
        const albumns = await getAlbumsAsync({
          includeSmartAlbums: false,
        })
        for (let album of albumns) {
          const asset = await getAssetsAsync({
            first: album.assetCount,
            album: album,
            sortBy: "modificationTime",
            mediaType: "photo",
          });
          if (asset.assets.length > 0) {
            set({
              albums: [
                ...get().albums,
                {
                  ...album,
                  thumbnail: asset.assets[0]
                },
              ],
            });
          }
        }
      },

      async findAlbumById(id: string) {
        return get().albums.find((album) => album.id === id);
      },

      setSelectedAlbum(album: CustomAlbum) {
        set({ selectedAlbum: album });
      }
    }))
)

// useAlbumStore.getState().