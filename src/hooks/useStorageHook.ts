import React, { useEffect, useRef, useState } from "react";

export const useStorageHook = (
  key: string,
  defaultValue: string | Function = "",
  { serialize = JSON.stringify, deserialize = JSON.parse } = {}
): [string | null, React.Dispatch<string | null>] => {
  const [state, setState] = useState(() => {
    const val = window.localStorage.getItem(key);
    if (val) {
      return deserialize(val);
    }
    return typeof defaultValue === "function" ? defaultValue() : defaultValue;
  });

  const prevKeyRef = useRef(key);

  useEffect(() => {
    const prevKey = prevKeyRef.current;
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey);
    }
    prevKeyRef.current = key;
    window.localStorage.setItem(key, serialize(state));
  }, [key, serialize, state]);

  return [state, setState];
};
