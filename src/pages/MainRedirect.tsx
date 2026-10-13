import { useEffect } from "react";

interface MainRedirectProps {
  to?: string;
}

const MainRedirect = ({ to = "/main/index.html" }: MainRedirectProps) => {
  useEffect(() => {
    window.location.replace(to + window.location.search);
  }, [to]);

  return null;
};

export default MainRedirect;
