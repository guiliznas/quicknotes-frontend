import React, { useState } from "react";
import { Text, View, TextInput, Button, Switch } from "react-native";
import styled from "styled-components/native";
import { Note } from "../types";
import { CategorySelector } from "./CategorySelector";

const Card = styled.View`
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
  max-width: 600px;
  margin: 0 auto;
`;

interface NoteCardProps {
  note: Note;
  onUpdate: (updates: Partial<Note>) => void;
  onLink?: (linkedId: string) => void;
  allNotes: Note[];
}

export const NoteCard: React.FC<NoteCardProps> = ({
  note,
  onUpdate,
  onLink,
  allNotes,
}) => {
  const [reference, setReference] = useState(note.reference || "");
  const [linkId, setLinkId] = useState("");
  const [isCompleted, setIsCompleted] = useState(note.isCompleted || false);
  const [isPublic, setIsPublic] = useState(note.isPublic);
  const [isArchived, setIsArchived] = useState(note.isArchived);

  const handleReferenceSave = () => {
    if (note.category === "literature") {
      onUpdate({ reference });
    }
  };

  const handleLink = () => {
    if (note.category === "permanent" && onLink && linkId) {
      onLink(linkId);
      setLinkId("");
    }
  };

  const toggleCompleted = () => {
    const newValue = !isCompleted;
    setIsCompleted(newValue);
    onUpdate({ isCompleted: newValue });
  };

  const togglePublic = () => {
    const newValue = !isPublic;
    setIsPublic(newValue);
    onUpdate({ isPublic: newValue });
  };

  const toggleArchived = () => {
    const newValue = !isArchived;
    setIsArchived(newValue);
    onUpdate({ isArchived: newValue });
  };

  return (
    <Card>
      <Text
        style={{ textDecorationLine: isCompleted ? "line-through" : "none" }}
      >
        {note.text}
      </Text>
      <Text style={{ fontSize: 12, color: "#666" }}>
        {new Date(note.timestamp).toLocaleTimeString()}
      </Text>
      <CategorySelector
        selected={note.category}
        onSelect={(category) => onUpdate({ category })}
      />
      {note.category === "literature" && (
        <View>
          <TextInput
            value={reference}
            onChangeText={setReference}
            placeholder="Referência (ex.: Livro X, p. 23)"
            style={{ borderWidth: 1, padding: 5, marginTop: 5 }}
          />
          <Button title="Salvar Referência" onPress={handleReferenceSave} />
        </View>
      )}
      {note.category === "permanent" && onLink && (
        <View>
          <TextInput
            value={linkId}
            onChangeText={setLinkId}
            placeholder="ID da nota para vincular"
            style={{ borderWidth: 1, padding: 5, marginTop: 5 }}
          />
          <Button title="Vincular" onPress={handleLink} />
          {note.linkedIds?.length > 0 && (
            <Text>Vinculada a: {note.linkedIds.join(", ")}</Text>
          )}
        </View>
      )}
      <View style={{ flexDirection: "row", marginTop: 5 }}>
        {note.category === "fleeting" && (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text>Concluída: </Text>
            <Switch value={isCompleted} onValueChange={toggleCompleted} />
          </View>
        )}
        <View
          style={{ flexDirection: "row", alignItems: "center", marginLeft: 10 }}
        >
          <Text>Pública: </Text>
          <Switch value={isPublic} onValueChange={togglePublic} />
        </View>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginLeft: 10 }}
        >
          <Text>Arquivada: </Text>
          <Switch value={isArchived} onValueChange={toggleArchived} />
        </View>
      </View>
    </Card>
  );
};
