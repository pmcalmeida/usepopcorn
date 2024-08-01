import { useEffect, useState } from "react";

export function useLocalStorageState(initialState, key) {
    const [value, setValue] = useState(() => {
        const storedValued = localStorage.getItem(key);
        return storedValued ? JSON.parse(storedValued) : initialState;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    },[value, initialState, key]);

    return [value, setValue];
}