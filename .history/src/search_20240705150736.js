import { useEffect, useRef } from 'react';
export default function Search({ query, setQuery }) {
    const inputEl = useRef(null);

    useEffect(() => {
        const callback = () => {
            inputEl.current.focus();
        }
        document.addEventListener('keydown', callback);
        inputEl.current.focus();

        return () => document.addEventListener('keydown', callback);
    }, []);

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