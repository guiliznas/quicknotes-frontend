import React, { useState } from "react";
import { TextInput, Button, View } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex-direction: row;
  padding: 10px;
  max-width: 600px;
  margin: 0 auto;
`;

interface NoteInputProps {
  onAdd: (text: string) => void;
}

export const NoteInput: React.FC<NoteInputProps> = ({ onAdd }) => {
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (text.trim()) {
      onAdd(text);
      setText("");
    }
  };

  return (
    <Container>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Digite sua nota..."
        maxLength={280}
        style={{ flex: 1, borderWidth: 1, padding: 5 }}
      />
      <Button title="Adicionar" onPress={handleAdd} />
    </Container>
  );
};
