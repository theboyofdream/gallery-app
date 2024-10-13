import { create } from "zustand";
import { combine } from "zustand/middleware";
import { useAlbumStore } from "./useAlbumStore";

const INITIAL_STATE = {
  startDate: null as Date | null,
  endDate: null as Date | null,
  sortBy: "modificationTime" as SortBy,
  sortingOrder: 'asc' as SortingOrder,
  mediaType: ["photo", 'video'] as MediaType,
} as const

export const useFilters = create(
  combine(INITIAL_STATE, (set, get) => ({
    updateFilters(filters: Partial<typeof INITIAL_STATE>) {
      set({
        ...get(),
        ...filters
      })
      useAlbumStore.getState().findAlbums()
    },
    clearFilter() {
      set({ ...INITIAL_STATE })
      useAlbumStore.getState().findAlbums()
    }
  }))
)