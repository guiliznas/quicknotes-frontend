import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Note } from "../types";
import { CategorySelector } from "./CategorySelector";
import { Ionicons } from "@expo/vector-icons";
import { formatTime } from "../utils/dateFormatter";
import { NoteEditModal } from "./NoteEditModal";
import { useTheme } from "../theme/ThemeContext";

const Card = styled.View`
  padding: 16px;
  background-color: ${(props) => props.theme.background.primary};
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.border};
  flex-direction: row;
  align-items: center;
`;

const CheckboxContainer = styled.TouchableOpacity`
  width: 20px;
  height: 20px;
  border-width: 2px;
  border-color: ${(props) =>
    props.checked ? props.theme.success : props.theme.border};
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
  background-color: ${(props) =>
    props.checked ? props.theme.success : "transparent"};
`;

const ContentContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const TextContainer = styled.View`
  flex: 1;
`;

const NoteText = styled.Text<{ completed: boolean }>`
  font-size: 16px;
  color: ${(props) =>
    props.completed ? props.theme.text.disabled : props.theme.text.primary};
  text-decoration-line: ${(props) =>
    props.completed ? "line-through" : "none"};
`;

const TimeText = styled.Text`
  font-size: 12px;
  color: ${(props) => props.theme.text.disabled};
  margin-top: 4px;
`;

const ActionsContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ArchiveButton = styled.TouchableOpacity`
  padding: 8px;
  margin-left: 8px;
`;

interface NoteCardProps {
  note: Note;
  onUpdate: (updates: Partial<Note>) => void;
  onLink?: (linkedId: string) => void;
  onDelete?: () => void;
  allNotes?: Note[];
}

export const NoteCard: React.FC<NoteCardProps> = ({
  note,
  onUpdate,
  onLink,
  onDelete,
  allNotes,
}) => {
  const [isCompleted, setIsCompleted] = useState(note.isCompleted || false);
  const [isPublic, setIsPublic] = useState(note.isPublic);
  const [isArchived, setIsArchived] = useState(note.isArchived);
  const [modalVisible, setModalVisible] = useState(false);
  const [reference, setReference] = useState(note.reference || "");
  const [linkId, setLinkId] = useState("");

  const { theme, isDarkMode } = useTheme();

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

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Card>
          <CheckboxContainer checked={isCompleted} onPress={toggleCompleted}>
            {isCompleted && (
              <Ionicons name="checkmark" size={14} color="#ffffff" />
            )}
          </CheckboxContainer>

          <ContentContainer>
            <TextContainer>
              <NoteText completed={isCompleted}>{note.text}</NoteText>
              <TimeText>{formatTime(new Date(note.timestamp))}</TimeText>
            </TextContainer>

            <ActionsContainer>
              <CategorySelector
                selected={note.category}
                onSelect={(category) => onUpdate({ category })}
                compact
              />
              <ArchiveButton onPress={toggleArchived}>
                <Ionicons
                  name={isArchived ? "archive" : "archive-outline"}
                  size={20}
                  color={
                    isArchived ? theme.text.disabled : theme.text.secondary
                  }
                />
              </ArchiveButton>
            </ActionsContainer>
          </ContentContainer>
        </Card>
      </TouchableOpacity>

      <NoteEditModal
        visible={modalVisible}
        note={note}
        onClose={() => setModalVisible(false)}
        onSave={onUpdate}
        onDelete={handleDelete}
      />
    </>
  );
};
