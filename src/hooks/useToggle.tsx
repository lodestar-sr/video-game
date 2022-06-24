import { useState } from "react";

export const useToggle = (initialValue: boolean = false) => {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggleValue = (newValue?: boolean) => {
    setValue((previousValue) => newValue === undefined ? !previousValue : newValue);
  };

  return [value, toggleValue] as const;
}
