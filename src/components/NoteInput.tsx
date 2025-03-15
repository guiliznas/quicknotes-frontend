import React, { useState } from "react";
import { TextInput, View } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  padding: 16px;
  background-color: #ffffff;
  border-bottom-width: 1px;
  border-bottom-color: #e0e0e0;
`;

const StyledInput = styled.TextInput`
  font-size: 16px;
  padding: 12px;
  background-color: #f5f5f5;
  border-radius: 8px;
`;

interface NoteInputProps {
  onAdd: (text: string) => void;
}

export const NoteInput: React.FC<NoteInputProps> = ({ onAdd }) => {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (text.trim()) {
      onAdd(text);
      setText("");
    }
  };

  return (
    <Container>
      <StyledInput
        value={text}
        onChangeText={setText}
        placeholder="Adicionar tarefa..."
        maxLength={280}
        onSubmitEditing={handleSubmit}
        returnKeyType="done"
      />
    </Container>
  );
};
