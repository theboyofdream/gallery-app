import { Album, getAlbumAsync, getAlbumsAsync, getAssetsAsync } from "expo-media-library";
import { create } from "zustand";
import { combine } from "zustand/middleware";
import { useFilters } from "./useFilters";

// useAlbumStore.getState()
async function updateAlbumDetails(album: Album | AlbumDetails) {

  const params = {
    first: album.assetCount ?? 1,
    album: album,
    sortBy: useFilters.getState().sortBy,
    mediaType: useFilters.getState().mediaType
  }

  let asset = await getAssetsAsync(params)
  let items = {} as Record<string, AlbumItem>

  const { items: albumItems, setAlbumItems, setAlbumDetails } = useAlbumStore.getState()

  asset.assets.map(asset => {
    if (albumItems[asset.id]) {
      items[asset.id] = {
        ...albumItems[asset.id],
        ...asset,
        // selected: albumItems[asset.id].selected
      }
    } else {
      items[asset.id] = {
        ...asset,
        // selected: false
      }
    }
  })

  setAlbumDetails({
    ...album,
    items: [],
    thumbnail: asset.assets[0],
    // selected: false
  })

  setAlbumItems(items)
}

export const useAlbumStore = create(
  combine(
    {
      albumIds: [] as string[],
      activeAlbumId: "",
      albums: {} as Record<string, CustomAlbum>,
      activeAlbumItemId: "",
      activeAlbumItemIndex: 0,
      items: {} as Record<string, AlbumItem>,
      // selectedItems: {} as Record<string, AlbumItem>,
    },
    (set, get) => ({

      async findAlbums() {
        let albums = await getAlbumsAsync({ includeSmartAlbums: false })
        let albumIds = [] as string[]

        albums.map(album => {
          if (album.assetCount > 0) {
            albumIds.push(album.id)
            updateAlbumDetails(album)
          }
        })

        set({ albumIds })
      },

      async getAlbumDetails(album: Album) {
        await updateAlbumDetails(album)
      },

      setActiveAlbum(id: string, index: number) {
        set({
          activeAlbumItemId: id,
          activeAlbumItemIndex: index
        })
      },

      setAlbumDetails(album: AlbumDetails) {
        set({
          albums: {
            ...get().albums,
            [album.id]: {
              ...album,
            }
          }
        })
      },

      setAlbumItems(items: Record<string, AlbumItem>) {
        set({
          items: {
            ...get().items,
            ...items,
          }
        })
      },

    }))
)

// useAlbumStore.getState().findAlbums()