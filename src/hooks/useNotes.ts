import { useState, useEffect } from "react";
import { Note } from "../types";

const API_URL = `http://${
  window.location.hostname || "192.168.0.111"
}:3000/notes`;

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [showArchived, setShowArchived] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setIsRefreshing(true);
      const response = await fetch(API_URL);
      const data = await response.json();
      console.log(data);
      setNotes(data);
    } catch (e) {
      console.error("Erro ao carregar notas:", e);
    } finally {
      setIsRefreshing(false);
    }
  };

  const addNote = async (text: string) => {
    const newNote: Note = {
      // _id: Math.random().toString(36).substring(2),
      text,
      timestamp: new Date().toISOString(),
      category: null,
      isPublic: false,
      isCompleted: false,
      isArchived: false,
    };
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNote),
      });
      const savedNote = await response.json();
      setNotes([savedNote, ...notes]);
    } catch (e) {
      console.error("Erro ao adicionar nota:", e);
    }
  };

  const updateNote = async (id: string, updates: Partial<Note>) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });
      const updatedNote = await response.json();
      setNotes(notes.map((note) => (note._id === id ? updatedNote : note)));
    } catch (e) {
      console.error("Erro ao atualizar nota:", e);
    }
  };

  const deleteNote = async (id: string) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      setNotes(notes.filter((note) => note._id !== id));
    } catch (e) {
      console.error("Erro ao excluir nota:", e);
    }
  };

  const linkNote = async (id: string, linkedId: string) => {
    const note = notes.find((n) => n._id === id);
    if (note && note.category === "permanent") {
      const updatedLinks = [...(note.linkedIds || []), linkedId];
      await updateNote(id, { linkedIds: updatedLinks });
    }
  };

  const filteredNotes = showArchived
    ? notes
    : notes.filter((note) => !note.isArchived);

  return {
    notes: filteredNotes,
    allNotes: notes,
    isRefreshing,
    fetchNotes,
    addNote,
    updateNote,
    deleteNote,
    linkNote,
    setShowArchived,
  };
};
