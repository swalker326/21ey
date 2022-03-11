import { useState, useEffect } from "react";
import { Loader } from "./Loader";

const useLoader = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [currentFill, setCurrentFill] = useState(40);
  useEffect(() => {
    console.log("Loader hook?");
  }, []);
  return { showLoader, setShowLoader, Loader, setCurrentFill, currentFill };
};

export default useLoader;
