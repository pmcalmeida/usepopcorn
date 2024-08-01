import { useEffect, useState } from "react";

export function useLocalStorageState(initialState) {
    const [value, setValue] = useState(() => {
        const storedValued = localStorage.getItem("watched");
        return JSON.parse(storedValued);
    });

    useEffect(() => {
        localStorage.setItem("watched", JSON.stringify(value));
    },[value]);

    return [value, setValue];
}