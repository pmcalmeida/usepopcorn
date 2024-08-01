import { useState } from "react";
import Logo from "./logo";

export default function Header({ numMovies }) {
    const [query, setQuery] = useState("");

    return (
        <nav className="nav-bar">
            <Logo />
            <input
                className="search"
                type="text"
                placeholder="Search movies..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <p className="num-results">
                Found <strong>{numMovies}</strong> results
            </p>
      </nav>
    )
}