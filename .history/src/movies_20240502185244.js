import { useState } from "react";
import ToggleButton from "./toggle-button"

export default function Movies({ children }) {
    const [isOpen1, setIsOpen1] = useState(true);

    return (
        <div className="box">
            <ToggleButton isOpen={isOpen1} toggleOpen={() => setIsOpen1((open) => !open)}/>
            {isOpen1 && children }
        </div>
    )
}