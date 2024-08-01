import { useState } from "react";
import Logo from "./logo";
import Search from "./search";

function NumResults({ numResults }) {
    return (
        <p className="num-results">
            Found <strong>{numResults}</strong> results
        </p>
    )
}

export default function Header({ numMovies }) {
    return (
        <nav className="nav-bar">
            <Logo />
            <Search />
            <NumResults />
            <p className="num-results">
                Found <strong>{numMovies}</strong> results
            </p>
      </nav>
    )
}