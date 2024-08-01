import { useEffect, useState } from "react";

export function useLocalStorageState(initialState, key) {
    const [value, setValue] = useState(() => {
        const storedValued = localStorage.getItem(key);
        return JSON.parse(storedValued);
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value || initialState));
    },[value, initialState, key]);

    return [value, setValue];
}