import { useEffect } from "react";

const MainRedirect = () => {
  useEffect(() => {
    window.location.replace("/main/index.html");
  }, []);

  return null;
};

export default MainRedirect;
