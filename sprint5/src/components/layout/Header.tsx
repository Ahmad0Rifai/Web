// Ahmad Alrifai — 2121032805
interface HeaderProps {
    title: string;
    text?: string;
}

function Header({ title, text }: HeaderProps) {
    return (
        <header className="site-baslik site-header">
            <div className="container">
                <h1>{title}</h1>
                {text && <p>{text}</p>}
            </div>
        </header>
    );
}

export default Header;