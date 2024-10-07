import { getAlbumsAsync, getAssetsAsync } from "expo-media-library";
import { create } from "zustand";
import { combine } from "zustand/middleware";

export const useAlbumStore = create(
  combine({
    // albums: [] as CustomAlbum[],
    albums: {} as { [key: string]: CustomAlbum },
    sortedAlbums: [] as string[],
    activeAlbum: null as CustomAlbum | null,
    activeFileIndex: 0,
  },
    (set, get) => ({
      async findAlbums() {
        const albums = await getAlbumsAsync({
          includeSmartAlbums: false,
        })

        let sortedAlbumIds = [] as string[]
        albums.map(album => {
          sortedAlbumIds.push(album.id)
        })
        set({ sortedAlbums: sortedAlbumIds })
        // set({ sortedAlbums: 
        //   albums
        //  });
        // let customAlbums = [] as CustomAlbum[];
        for (let album of albums) {
          const asset = await getAssetsAsync({
            // first: 1,
            first: album.assetCount,
            album: album,
            sortBy: "modificationTime",
            mediaType: "photo",
          });
          if (asset.assets.length > 0) {
            // customAlbums.push({
            //   ...album,
            //   thumbnail: asset.assets[0],
            //   // items: asset.assets,
            // });

            set({
              albums: {
                ...get().albums,
                [album.id]: {
                  ...album,
                  thumbnail: asset.assets[0],
                },
              },
            });

            // set({
            //   albums: [
            //     ...get().albums,
            //     {
            //       ...album,
            //       thumbnail: asset.assets[0]
            //     },
            //   ],
            // });
          }
        }
        // set({ albums: customAlbums });
      },

      async getAlbumThumbnail(album: CustomAlbum) {
        const asset = await getAssetsAsync({
          first: 1,
          album: album,
          sortBy: "modificationTime",
          mediaType: "photo",
        });
        return asset.assets[0];
      },

      async findAlbumById(id: string) {
        const album = get().albums[id];
        // let album = get().albums.find((album) => album.id === id);
        return album;
        // if (album) {
        //   const asset = await getAssetsAsync({
        //     first: album.assetCount,
        //     album: album,
        //     sortBy: "modificationTime",
        //     mediaType: "photo",
        //   });
        //   return {
        //     ...album,
        //     items: asset,
        //   };
        // }
        // return null;
      },

      setActiveAlbum(album: CustomAlbum) {
        set({ activeAlbum: album });
      },

      setActiveFileIndex(index: number) {
        set({ activeFileIndex: index });
      }
    }))
)

useAlbumStore.getState().findAlbums()