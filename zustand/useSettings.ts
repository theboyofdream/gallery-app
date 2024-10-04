import { create } from "zustand";
import { combine } from "zustand/middleware";

export const useSettings = create(
  combine({
    defaultColumns: 3,
    minColumns: 1,
    maxColumns: 6,

    // columns: 3,

    albumColumns: 3,
    albumLayoutType: "grid" as LayoutType,

    itemColumns: 3,
    itemLayoutType: "grid" as LayoutType,

    theme: "system" as AppTheme,

  }, (set, get) => ({

    setColumn(count: number, type: "album" | "item") {
      if (count >= get().minColumns && count <= get().maxColumns) {
        if (type === "album") {
          set({ albumColumns: count })
        } else if (type === "item") {
          set({ itemColumns: count })
        }
      }
    },

    adjustColumns(by: 1 | -1, type: "album" | "item") {
      const { albumColumns, itemColumns } = get()
      const count = (type === "album" ? albumColumns : itemColumns) + by
      if (count >= get().minColumns && count <= get().maxColumns) {
        if (type === "album") {
          set({ albumColumns: count })
        } else if (type === "item") {
          set({ itemColumns: count })
        }
      }
    },

    setTheme(theme: AppTheme) {
      set({ theme })
    }
  })
  ))