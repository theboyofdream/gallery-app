import { Album, Asset } from "expo-media-library";

declare global {

  type CustomAlbum = Album & {
    thumbnail: Asset;
  };

  type LayoutType = "grid" | "masonry";

  type AppTheme = "system" | "light" | "dark";
}
