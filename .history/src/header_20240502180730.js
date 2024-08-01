import Logo from "./logo";
import Search from "./search";

function NumResults({ results }) {
    return (
        <p className="num-results">
            Found <strong>{results}</strong> results
        </p>
    )
}

export default function Header({ numMovies }) {
    return (
        <nav className="nav-bar">
            <Logo />
            <Search />
            <NumResults results={numMovies} />
      </nav>
    )
}