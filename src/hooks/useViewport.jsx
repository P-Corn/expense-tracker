import { useEffect, useState } from "react";

export default function useViewPort() {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  function debounce(func, timeout = 100){
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }

  useEffect(() => {
    const handleWindowResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }

    window.addEventListener("resize", debounce(handleWindowResize));

    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return { width, height };
}