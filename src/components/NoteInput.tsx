import React, { useState } from "react";
import { TextInput, View } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  padding: 16px;
  background-color: ${(props) => props.theme.background.primary};
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.border};
`;

const StyledInput = styled.TextInput`
  font-size: 16px;
  padding: 12px;
  background-color: ${(props) => props.theme.background.secondary};
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
        placeholder="Adicionar nota..."
        maxLength={280}
        onSubmitEditing={handleSubmit}
        returnKeyType="done"
      />
    </Container>
  );
};
