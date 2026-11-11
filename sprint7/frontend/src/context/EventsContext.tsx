// Ahmad Alrifai — 2121032805
import { createContext, useContext, useState, ReactNode } from "react";
import { events as initialEvents } from "../data/events";
import type { CampusEvent } from "../types/campus-event";

interface EventsContextType {
    events: CampusEvent[];
    addEvent: (data: Omit<CampusEvent, "id">) => void;
    updateEvent: (id: string, data: Omit<CampusEvent, "id">) => void;
    deleteEvent: (id: string) => void;
}

const EventsContext = createContext<EventsContextType | null>(null);

export function EventsProvider({ children }: { children: ReactNode }) {
    const [events, setEvents] = useState<CampusEvent[]>(initialEvents);

    const addEvent = (data: Omit<CampusEvent, "id">) => {
        const newEvent: CampusEvent = {
            ...data,
            id: Date.now().toString(),
        };
        setEvents([newEvent, ...events]);
    };

    const updateEvent = (id: string, data: Omit<CampusEvent, "id">) => {
        setEvents(events.map((e) => (e.id === id ? { ...data, id } : e)));
    };

    const deleteEvent = (id: string) => {
        setEvents(events.filter((e) => e.id !== id));
    };

    return (
        <EventsContext.Provider value={{ events, addEvent, updateEvent, deleteEvent }}>
            {children}
        </EventsContext.Provider>
    );
}

// Custom hook for easier access
export function useEvents() {
    const context = useContext(EventsContext);
    if (!context) {
        throw new Error("useEvents must be used within an EventsProvider");
    }
    return context;
}