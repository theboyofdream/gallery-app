import { create } from "zustand";
import { combine } from "zustand/middleware";

export const useSelectStore = create(
  combine(
    {
      selectedAlbumItems: {} as Record<string, string[]>,
    },
    (set, get) => ({
      addOrRemoveSelectedAlbumItem(albumId: string, itemId: string) {
        let selectedAlbumItems = { ...get().selectedAlbumItems }

        if (!selectedAlbumItems[albumId]) {
          selectedAlbumItems[albumId] = []
        }

        if (selectedAlbumItems[albumId].includes(itemId)) {
          selectedAlbumItems[albumId] = selectedAlbumItems[albumId].filter(id => id !== itemId)
        } else {
          selectedAlbumItems[albumId].push(itemId)
        }

        // if (!selectedAlbumItems[albumId]) {
        //   selectedAlbumItems[albumId] = [itemId]
        // } else if (selectedAlbumItems[albumId].includes(itemId)) {
        //   selectedAlbumItems[albumId] = selectedAlbumItems[albumId].filter(id => id !== itemId)
        // }else if()
        // console.log(selectedAlbumItems)
        set({ selectedAlbumItems })
      },

      emptySelectedAlbumItems(albumId: string) {
        let selectedAlbumItems = { ...get().selectedAlbumItems }

        if (!selectedAlbumItems[albumId]) {
          return
        }

        selectedAlbumItems[albumId] = []

        set({ selectedAlbumItems })
      }
    })
  )
)