import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

type SetValue<T> = Dispatch<SetStateAction<T>>;

export const useStorageHook = <T>(
  key: string,
  defaultValue: T,
  { serialize = JSON.stringify, deserialize = JSON.parse } = {}
): [T, SetValue<T>] => {
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
