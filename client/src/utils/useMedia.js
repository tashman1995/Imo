import { useEffect, useState } from "react";

export default function useMedia(queries, values, defaultValue) {
  
  const [value, set] = useState(null);
  useEffect(() => {
    
    const match = () =>
      values[queries.findIndex((q) => matchMedia(q).matches)] || defaultValue;
    set(match);
      const handler = () => set(match);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [defaultValue, queries, values]);
  return value;
}
