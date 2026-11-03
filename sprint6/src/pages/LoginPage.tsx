// Ahmad Alrifai — 2121032805
import { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const [message, setMessage] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: { email?: string; password?: string } = {};

        if (!email.includes("@")) {
            newErrors.email = "Geçerli bir e-posta girin.";
        }
        if (password.length < 6) {
            newErrors.password = "Şifre en az 6 karakter olmalı.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setMessage("");
        } else {
            setErrors({});
            setMessage("Giriş başarılı! (Bu bir demo, gerçek giriş yapılmadı)");
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "0 auto" }}>
            <h2>Giriş Yap</h2>
            <form className="form event-form" onSubmit={handleSubmit}>
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
                <button type="submit">Giriş Yap</button>
            </form>

            {message && <p className="notice notice-success" style={{ marginTop: "1rem" }}>{message}</p>}

            <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <Link to="/register" style={{ color: "#1b7f37" }}>Hesabınız yok mu? Kayıt olun</Link>
                <Link to="/forgot-password" style={{ color: "#1b7f37" }}>Şifremi unuttum</Link>
            </div>
        </div>
    );
}