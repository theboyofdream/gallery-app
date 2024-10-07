import { create } from "zustand";
import { combine } from "zustand/middleware";

export const useSelectStore = create(
  combine(
    {
      selectedAlbumItems: {} as Record<string, string[]>,
    },
    (set, get) => ({
      addOrRemoveSelectedAlbumItem(albumId: string, itemId: string) {
        const selectedAlbumItems = get().selectedAlbumItems

        if (!selectedAlbumItems[albumId]) {
          selectedAlbumItems[albumId] = [itemId]
        } else if (selectedAlbumItems[albumId].includes(itemId)) {
          selectedAlbumItems[albumId] = selectedAlbumItems[albumId].filter(id => id !== itemId)
        }
      }
    })
  )
)