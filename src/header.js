import Logo from "./logo";

export default function Header({ children }) {
    return (
        <nav className="nav-bar">
        <Logo />{children}
    </nav>
    )
}