import { useState } from "react";

export function useLocalStorageState(initialState) {
    const [watched, setWatched] = useState(() => {
        const storedValued = localStorage.getItem("watched");
        return JSON.parse(storedValued);
    });

    return [watched, setWatched];
}