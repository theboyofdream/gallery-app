import { create } from "zustand";
import { combine } from "zustand/middleware";

const INITIAL_STATE = {
  startDate: null as Date | null,
  endDate: null as Date | null,
  sortBy: ["modificationTime"] as SortBy,
  mediaType: ["photo", "video"] as MediaType,
} as const

export const useFilters = create(
  combine(INITIAL_STATE, (set, get) => ({
    updateFilters(filters: Partial<typeof INITIAL_STATE>) {
      set({
        ...get(),
        ...filters
      })
    },
    clearFilter() {
      set({ ...INITIAL_STATE })
    }
  }))
)