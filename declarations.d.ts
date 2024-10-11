import { Album, Asset, SortByValue, MediaTypeValue } from "expo-media-library";

declare global {

  type CustomAlbum = Album & {
    thumbnail: Asset;
    // items: Asset[];
  };

  type AlbumDetails = Album & {
    // selected: boolean
    thumbnail: Asset
    items: string[]
  }

  type AlbumItem = Asset & {
    // selected: boolean
  }

  type LayoutType = "grid" | "masonry";

  type AppTheme = "system" | "light" | "dark";

  type SortBy = SortByValue | SortByValue[];

  type SortingOrder = "asc" | "desc";

  type MediaType = MediaTypeValue | MediaTypeValue[];
}
