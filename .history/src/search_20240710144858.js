import { useEffect, useRef } from 'react';
import { useKey } from './useKey';
export default function Search({ query, setQuery }) {
    const inputEl = useRef(null);

    useEffect(() => {
        const callback = (e) => {
            if (document.activeElement === inputEl.current) return;
            
            if (e.code === 'Enter') {
                inputEl.current.focus();
                setQuery("");
            }
        }
        document.addEventListener('keydown', callback);
        inputEl.current.focus();

        return () => document.removeEventListener('keydown', callback);
    }, [setQuery]);

    useKey('Enter', ()  => {
        if (document.activeElement === inputEl.current) return;
        inputEl.current.focus();
        setQuery("");
    });


    return (
        <input
            ref={inputEl}
            className="search"
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />
    )
}