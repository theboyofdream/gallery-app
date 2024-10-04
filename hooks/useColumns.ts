import { useEffect, useState } from "react";
import { useWindowDimensions } from "react-native";

export function useColumns() {
  const defaultColumns = 3;
  const [columns, setColumns] = useState(defaultColumns);

  const { width } = useWindowDimensions();
  const columnWidth = width / columns;

  useEffect(() => {
    // set local storage
  }, [columns]);

  return {
    defaultColumns,
    columns,
    setColumns,
    columnWidth,
  };
}
