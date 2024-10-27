import { create } from "zustand";
import { combine } from "zustand/middleware";
import { useFilters } from "./useFilters";
import { useEffect } from "react";
import { useAlbumStore } from "./useAlbumStore";


export const useFiliteredData = create(
  combine(
    {},
    (set, get) => {

      useEffect(() => {
        const unsubscribeFilterStore = useFilters.subscribe(() => {

        })
        const unsubscribeAlbumStore = useAlbumStore.subscribe(({ albumIds, albums }) => { })
        return () => {
          unsubscribeFilterStore()
          unsubscribeAlbumStore()
        }
      }, [])

      return {
      }
    }
  )
)