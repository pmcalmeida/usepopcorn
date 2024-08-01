import Logo from "./logo";
import Search from "./search";

export default function Header({ numMovies, children }) {
    return (
        <nav className="nav-bar">
            <Logo />
            <Search />
            { children }
      </nav>
    )
}