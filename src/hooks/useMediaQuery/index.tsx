import { useEffect, useState } from "react";

export function useMediaQuery(query: number): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  // Verifica se o window já é existente na DOM e o onresize vai verificando qual o tamanho da tela.
  if (typeof window !== "undefined") {
    window.onresize = function () {
      const screenWidth = window.innerWidth;
      if (screenWidth <= query) {
        setMatches(true);
      } else {
        setMatches(false);
      }
    };
  }

  useEffect(() => {
    const screenWidth = window.innerWidth;
    if (screenWidth <= query) {
      setMatches(true);
    } else {
      setMatches(false);
    }
  }, [setMatches, query]);

  return matches;
}
