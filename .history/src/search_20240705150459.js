import { useEffect, useRef } from 'react';
export default function Search({ query, setQuery }) {
    const inputEl = useRef(null);

    useEffect(() => {
        inputEl.current.focus();
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