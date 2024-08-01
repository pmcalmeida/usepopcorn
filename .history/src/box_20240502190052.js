import { useState } from "react";

export default function Box() {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="box">
            <button
                className="btn-toggle"
                onClick={toggleOpen}
            >
                {isOpen ? "–" : "+"}
            </button>
        </div>
    )

}