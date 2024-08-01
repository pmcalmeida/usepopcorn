export default function Header({ numMovies, children }) {
    return (
        <nav className="nav-bar">        <Logo />{children}</nav>
    )
}