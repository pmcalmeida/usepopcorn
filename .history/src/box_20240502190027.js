export default function Box({ isOpen, toggleOpen }) {
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