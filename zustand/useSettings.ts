import { create } from "zustand";
import { combine } from "zustand/middleware";

export const useSettings = create(
  combine({
    defaultColumns: 3,
    minColumns: 1,
    maxColumns: 6,

    albumColumns: 3,
    albumLayoutType: "grid" as LayoutType,

    albumItemColumns: 3,
    albumItemLayoutType: "grid" as LayoutType,

    theme: "system" as AppTheme,

  }, (set, get) => ({

    setColumn(count: number, type: "album" | "item") {
      if (count >= get().minColumns && count <= get().maxColumns) {
        if (type === "album") {
          set({ albumColumns: count })
        } else if (type === "item") {
          set({ albumItemColumns: count })
        }
      }
    },

    adjustColumns(by: 1 | -1, type: "album" | "item") {
      const { albumColumns, albumItemColumns: itemColumns } = get()
      const count = (type === "album" ? albumColumns : itemColumns) + by
      if (count >= get().minColumns && count <= get().maxColumns) {
        if (type === "album") {
          set({ albumColumns: count })
        } else if (type === "item") {
          set({ albumItemColumns: count })
        }
      }
    },

    updateColumns(count: number, type: "album" | "item") {
      if (count >= get().minColumns && count <= get().maxColumns) {
        if (type === "album") {
          set({ albumColumns: count })
        } else if (type === "item") {
          set({ albumItemColumns: count })
        }
      }
    },

    setTheme(theme: AppTheme) {
      set({ theme })
    }
  })
  ))