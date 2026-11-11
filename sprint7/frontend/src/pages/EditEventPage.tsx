// Ahmad Alrifai — 2121032805
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import EventForm from "../components/forms/EventForm";
import type { EventFormData } from "../utils/validate-event";

export default function EditEventPage() {
    const { id } = useParams();
    const { events, updateEvent } = useEvents();
    const navigate = useNavigate();

    const eventToEdit = events.find((e) => e.id === id);

    if (!eventToEdit) {
        return <Navigate to="/admin" />;
    }

    const handleSubmit = (data: EventFormData) => {
        if (id) updateEvent(id, data);
        navigate("/admin");
    };

    return (
        <>
            <h2>Etkinliği Güncelle</h2>
            <EventForm initialData={eventToEdit} onSubmit={handleSubmit} submitText="Güncelle" />
        </>
    );
}