import { Check } from "@tamagui/lucide-icons";
import { Checkbox, CheckboxProps, Label, XStack } from "tamagui";

export function CheckboxWithLabel({
  id,
  size,
  label = 'Default Label',
  ...checkboxProps
}: CheckboxProps & { label?: string }) {
  // const id = `checkbox-${(size || '').toString().slice(1)}`
  return (
    <XStack alignItems="center" gap="$4">
      <Checkbox id={id} size={size}
        backgroundColor={checkboxProps.checked ? "$blue10" : undefined}
        borderRadius={"$3"}
        borderColor={checkboxProps.checked ? "$blue9" : undefined}
        {...checkboxProps}>
        <Checkbox.Indicator>
          <Check
            color={checkboxProps.checked ? "white" : undefined}
          />
        </Checkbox.Indicator>
      </Checkbox>

      <Label size={size} htmlFor={id} lineHeight={"$1"} color={"$color"}>
        {label}
      </Label>
    </XStack>
  )
}