import { useEffect } from "react";

export function useKeyDown() {
    useEffect(() => {
        const onKeyDown = function(e) {
          if(e.code === 'Escape') {
            onCloseMovie();
          }
        };
    
        document.addEventListener('keydown', onKeyDown);
    
        return () => {
          document.removeEventListener('keydown', onKeyDown);
        }
      }, [onCloseMovie]);
}