import { View as TView, useTheme, ViewProps } from "tamagui";

export function View(props: ViewProps) {
  const { background } = useTheme();
  return (
    <TView
      {...props}
      style={[
        { backgroundColor: background?.val ?? "transparent" },
        props.style,
      ]}
    />
  );
}
