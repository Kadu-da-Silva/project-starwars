import { useState, useContext } from 'react';
import FilterContext from '../context/FilterContext';

export default function useHandleChange(initialValue) {
  const [value, setValue] = useState(initialValue);
  const { globalState, setGlobalState } = useContext(FilterContext);

  function handleChange(e) {
    setValue(e.target.value);
    setGlobalState(e.target.value);
  }

  return { value, handleChange, globalState };
}
