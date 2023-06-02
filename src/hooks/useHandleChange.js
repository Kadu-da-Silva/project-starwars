import { useState } from 'react';

export default function useHandleChange(initialValue) {
  const [value, setValue] = useState(initialValue);

  function handleChange(e) {
    setValue(e.target.value);
  }

  return { value, setValue, handleChange };
}
