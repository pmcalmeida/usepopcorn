import { useEffect } from "react";

export function useKey(callback, keyCode) {
    useEffect(() => {
        const onKeyDown = function(e) {
          if(e.code === keyCode) {
            callback();
          }
        };
    
        document.addEventListener('keydown', onKeyDown);
    
        return () => {
          document.removeEventListener('keydown', onKeyDown);
        }
      }, [callback, keyCode]);
}