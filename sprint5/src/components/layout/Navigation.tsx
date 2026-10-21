// Ahmad Alrifai — 2121032805
import type { PageName } from "../../types/page";

interface NavigationProps {
    current: PageName;
    onNavigate: (page: PageName) => void;
}

const menuItems: { name: PageName; label: string }[] = [
    { name: "home", label: "Ana Sayfa" },
    { name: "events", label: "Etkinlikler" },
    { name: "add", label: "Ekle" },
];

function Navigation({ current, onNavigate }: NavigationProps) {
    return (
        <nav aria-label="Ana menü" className="container">
            {menuItems.map((item) => {
                const isActive = current === item.name;
                return (
                    <a
                        key={item.name}
                        href={`#${item.name}`}
                        aria-current={isActive ? "page" : undefined}
                        className={isActive ? "aktif" : undefined}
                        style={{
                            color: isActive ? "#ffffff" : "#183d72",
                            backgroundColor: isActive ? "#183d72" : "transparent",
                        }}
                        onClick={(e) => {
                            e.preventDefault();
                            onNavigate(item.name);
                        }}
                    >
                        {item.label}
                    </a>
                );
            })}
        </nav>
    );
}

export default Navigation;