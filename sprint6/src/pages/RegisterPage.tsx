// Ahmad Alrifai — 2121032805
import { useState } from "react";
import { Link } from "react-router-dom";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [message, setMessage] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: Record<string, string> = {};

        if (name.trim().length < 2) newErrors.name = "Ad Soyad en az 2 karakter olmalı.";
        if (!email.includes("@")) newErrors.email = "Geçerli bir e-posta girin.";
        if (password.length < 6) newErrors.password = "Şifre en az 6 karakter olmalı.";
        if (password !== passwordConfirm) newErrors.passwordConfirm = "Şifreler birbiriyle eşleşmiyor.";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setMessage("");
        } else {
            setErrors({});
            setMessage("Kayıt işlemi başarılı! (Demo)");
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "0 auto" }}>
            <h2>Kayıt Ol</h2>
            <form className="form event-form" onSubmit={handleSubmit}>
                <div className="form-field">
                    <label htmlFor="name">Ad Soyad</label>
                    <input
                        id="name" type="text"
                        value={name} onChange={(e) => setName(e.target.value)}
                        aria-invalid={Boolean(errors.name)}
                    />
                    {errors.name && <span className="field-error">{errors.name}</span>}
                </div>
                <div className="form-field">
                    <label htmlFor="email">E-posta</label>
                    <input
                        id="email" type="email"
                        value={email} onChange={(e) => setEmail(e.target.value)}
                        aria-invalid={Boolean(errors.email)}
                    />
                    {errors.email && <span className="field-error">{errors.email}</span>}
                </div>
                <div className="form-field">
                    <label htmlFor="password">Şifre</label>
                    <input
                        id="password" type="password"
                        value={password} onChange={(e) => setPassword(e.target.value)}
                        aria-invalid={Boolean(errors.password)}
                    />
                    {errors.password && <span className="field-error">{errors.password}</span>}
                </div>
                <div className="form-field">
                    <label htmlFor="passwordConfirm">Şifre Tekrar</label>
                    <input
                        id="passwordConfirm" type="password"
                        value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)}
                        aria-invalid={Boolean(errors.passwordConfirm)}
                    />
                    {errors.passwordConfirm && <span className="field-error">{errors.passwordConfirm}</span>}
                </div>
                <button type="submit">Kayıt Ol</button>
            </form>

            {message && <p className="notice notice-success" style={{ marginTop: "1rem" }}>{message}</p>}

            <p style={{ marginTop: "1rem" }}>
                <Link to="/login" style={{ color: "#1b7f37" }}>Zaten hesabınız var mı? Giriş yapın</Link>
            </p>
        </div>
    );
}