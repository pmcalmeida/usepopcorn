import { useState } from "react";
import Logo from "./logo";

export default function Header({ numMovies }) {
    return (
        <nav className="nav-bar">
            <Logo />
            <Search />
            <p className="num-results">
                Found <strong>{numMovies}</strong> results
            </p>
      </nav>
    )
}