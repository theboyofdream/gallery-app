import { TouchableOpacity, TouchableOpacityProps } from "react-native";

export function PressableBox(props: TouchableOpacityProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      {...props}
    />
  )
}