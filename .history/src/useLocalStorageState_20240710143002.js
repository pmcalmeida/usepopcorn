import { useState } from "react";

export function useLocalStorageState(initialState) {
    const [value, setValue] = useState(() => {
        const storedValued = localStorage.getItem("watched");
        return JSON.parse(storedValued);
    });

    return [value, setValue];
}