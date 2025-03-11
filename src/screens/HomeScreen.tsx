import React from "react";
import { FlatList, Button } from "react-native";
import { useNotes } from "../hooks/useNotes";
import { NoteInput } from "../components/NoteInput";
import { NoteCard } from "../components/NoteCard";

export const HomeScreen: React.FC = () => {
  const { notes, allNotes, addNote, updateNote, linkNote, setShowArchived } =
    useNotes();

  return (
    <>
      <NoteInput onAdd={addNote} />
      <Button
        title={
          notes.length === allNotes.length
            ? "Ocultar Arquivadas"
            : "Mostrar Arquivadas"
        }
        onPress={() => setShowArchived((prev) => !prev)}
      />
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NoteCard
            note={item}
            onUpdate={(updates) => updateNote(item.id, updates)}
            onLink={(linkedId) => linkNote(item.id, linkedId)}
            allNotes={allNotes}
          />
        )}
      />
    </>
  );
};
