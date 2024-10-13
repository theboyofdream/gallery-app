import { Check } from "@tamagui/lucide-icons";
import { Checkbox as TCheckbox, CheckboxProps } from "tamagui";

export function Checkbox({
  id,
  size,
  ...checkboxProps
}: CheckboxProps
) {
  return (
    <TCheckbox id={id} size={size}
      backgroundColor={checkboxProps.checked ? "$blue10" : undefined}
      borderRadius={"$3"}
      borderColor={checkboxProps.checked ? "$blue9" : undefined}
      {...checkboxProps}>
      <TCheckbox.Indicator>
        <Check
          color={checkboxProps.checked ? "white" : undefined}
        />
      </TCheckbox.Indicator>
    </TCheckbox>
  )
}