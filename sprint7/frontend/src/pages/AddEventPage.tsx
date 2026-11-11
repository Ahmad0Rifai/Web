// Ahmad Alrifai — 2121032805
import { useNavigate } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import EventForm from "../components/forms/EventForm";
import type { EventFormData } from "../utils/validate-event";

export default function AddEventPage() {
    const { addEvent } = useEvents();
    const navigate = useNavigate();

    const handleSubmit = (data: EventFormData) => {
        addEvent(data);
        navigate("/admin");
    };

    return (
        <>
            <h2>Yeni Etkinlik Ekle</h2>
            <EventForm onSubmit={handleSubmit} submitText="Kaydet" />
        </>
    );
}