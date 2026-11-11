// Ahmad Alrifai — 2121032805
import { NavLink } from "react-router-dom";

const menuItems = [
    { to: "/", label: "Ana Sayfa" },
    { to: "/events", label: "Etkinlikler" },
    { to: "/admin", label: "Yönetim" },
    { to: "/login", label: "Giriş" },
];

export default function Navigation() {
    return (
        <div className="site-header" style={{ paddingTop: 0 }}>
            <nav aria-label="Ana menü" className="container">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        end={item.to === "/"}
                    >
                        {item.label}
                    </NavLink>
                ))}
            </nav>
        </div>
    );
}