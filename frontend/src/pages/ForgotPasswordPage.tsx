// Ahmad Alrifai — 2121032805
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.includes("@")) {
            setError("Geçerli bir e-posta girin.");
            setMessage("");
        } else {
            setError("");
            setMessage("Şifre sıfırlama bağlantısı e-postanıza gönderildi (demo).");
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "0 auto" }}>
            <h2>Şifremi Unuttum</h2>
            <p style={{ marginBottom: "1rem" }}>E-posta adresinizi girin, size şifre sıfırlama bağlantısı gönderelim.</p>

            <form className="form event-form" onSubmit={handleSubmit}>
                <div className="form-field">
                    <label htmlFor="email">E-posta</label>
                    <input
                        id="email" type="email"
                        value={email} onChange={(e) => setEmail(e.target.value)}
                        aria-invalid={Boolean(error)}
                    />
                    {error && <span className="field-error">{error}</span>}
                </div>
                <button type="submit">Gönder</button>
            </form>

            {message && <p className="notice notice-success" style={{ marginTop: "1rem" }}>{message}</p>}

            <p style={{ marginTop: "1rem" }}>
                <Link to="/login" style={{ color: "#1b7f37" }}>← Giriş sayfasına dön</Link>
            </p>
        </div>
    );
}