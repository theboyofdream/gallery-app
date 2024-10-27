import { Album, getAlbumsAsync, getAssetsAsync } from "expo-media-library";
import { create } from "zustand";
import { combine } from "zustand/middleware";
import { useFilters } from "./useFilters";
import { useEffect } from "react";

// useAlbumStore.getState()
async function updateAlbumDetails(album: Album | AlbumDetails) {

  const params = {
    first: album.assetCount ?? 1,
    album: album,
    sortBy: useFilters.getState().sortBy,
    mediaType: useFilters.getState().mediaType
  }

  let asset = await getAssetsAsync(params)
  let itemIds = [] as string[]
  let items = {} as Record<string, AlbumItem>

  const { items: albumItems, removeAlbum, setAlbumItems, setAlbumDetails } = useAlbumStore.getState()

  for (let file of asset.assets) {
    // if (useFilters.getState().mediaType.includes(file.mediaType)) {
    if (file.mediaType === "photo") {
      if (albumItems[file.id]) {
        items[file.id] = {
          ...albumItems[file.id],
          ...asset,
          // selected: albumItems[asset.id].selected
        }
      } else {
        items[file.id] = file
      }
      itemIds.push(file.id)
    }
  }

  if (itemIds.length < 1) {
    removeAlbum(album)
    return
  }

  setAlbumDetails({
    ...album,
    items: itemIds,
    thumbnail: items[itemIds[0]],
    assetCount: itemIds.length,
    // selected: false
  })

  setAlbumItems(items)
}

async function updateAlbumThumbnail(album: Album | AlbumDetails) {
  const { assets } = await getAssetsAsync({
    first: 1,
    album: album,
    sortBy: useFilters.getState().sortBy,
    mediaType: useFilters.getState().mediaType
  })


  // useAlbumStore.getState().setAlbumDetails({
  //   ...album,

  // })

  return assets.length > 0 ? assets[0] : null
}

export const useAlbumStore = create(
  combine(
    {
      albumIds: [] as string[],
      activeAlbumId: "",
      albums: {} as Record<string, AlbumDetails>,
      activeAlbumItemId: "",
      activeAlbumItemIndex: 0,
      items: {} as Record<string, AlbumItem>,
    },
    (set, get) => {
      const unsubscribeFilterStore = useFilters.subscribe((state, prevState) => {
        const { albumIds, albums, items } = get()
        // console.log('subs', state, prevState)
        console.log('subs', state.sortBy, prevState.sortBy)
        if (state.sortingOrder !== prevState.sortingOrder) {
          set({ albumIds: albumIds.reverse() })
        }
        if (state.sortBy !== prevState.sortBy) {
          // // albumIds: 
          // albumIds.sort((a, b) => {
          //   albums[a].items
          //   albums[b]
          // })

          // set({
          // })
        }
        if (state.mediaType !== prevState.mediaType) {
          if (state.mediaType === 'photo') {
            albumIds.map(id => {
              albums[id].items
            })
          }
        }
      })

      return {
        async findAlbums() {
          let albums = await getAlbumsAsync({ includeSmartAlbums: false })
          let albumIds = [] as string[]

          for (let album of albums) {
            if (album.assetCount > 0) {
              const thumbnail = await updateAlbumThumbnail(album)
              if (thumbnail) {
                set({
                  albums: {
                    ...get().albums,
                    [album.id]: {
                      ...album,
                      thumbnail,
                      items: []
                    }
                  }
                })
                updateAlbumDetails(album)
                albumIds.push(album.id)
              }
            }
          }

          // if (useFilters.getState().sortingOrder === 'desc') {
          //   albumIds = albumIds.reverse()
          // }

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

        removeAlbum(album: Album | AlbumDetails) {
          set({
            albumIds: get().albumIds.filter(id => id !== album.id)
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

        unsubscribeFilterStore
      }
    }
  )
)

// useAlbumStore.getState().findAlbums()