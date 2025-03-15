import React, { useState, useEffect } from "react";
import {
  Modal,
  TouchableOpacity,
  TextInput,
  View,
  Switch,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import styled from "styled-components/native";
import { Note, Category } from "../types";
import { CategorySelector } from "./CategorySelector";
import { Ionicons } from "@expo/vector-icons";
import { formatDate, formatTime } from "../utils/dateFormatter";

const ModalContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.View`
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 20px;
  padding-bottom: ${Platform.OS === "ios" ? "40px" : "20px"};
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #212121;
`;

const CloseButton = styled.TouchableOpacity`
  padding: 8px;
`;

const FormGroup = styled.View`
  margin-bottom: 16px;
`;

const Label = styled.Text`
  font-size: 14px;
  color: #757575;
  margin-bottom: 8px;
`;

const Input = styled.TextInput`
  font-size: 16px;
  padding: 12px;
  background-color: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 8px;
  min-height: 100px;
`;

const DateTimeContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const DateTimeButton = styled.TouchableOpacity`
  flex: 1;
  padding: 12px;
  background-color: #f5f5f5;
  border-radius: 8px;
  margin-horizontal: 4px;
  align-items: center;
  flex-direction: row;
  justify-content: center;
`;

const DateTimeText = styled.Text`
  font-size: 16px;
  color: #212121;
  margin-left: 8px;
`;

const SwitchContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 8px 0;
`;

const SwitchLabel = styled.Text`
  font-size: 16px;
  color: #212121;
`;

const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
`;

const Button = styled.TouchableOpacity<{ primary?: boolean }>`
  flex: 1;
  padding: 14px;
  background-color: ${(props) => (props.primary ? "#1976d2" : "#f44336")};
  border-radius: 8px;
  margin-horizontal: 4px;
  align-items: center;
`;

const ButtonText = styled.Text<{ primary?: boolean }>`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

const CategoryRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

const CategoryLabel = styled.Text`
  font-size: 16px;
  margin-right: 12px;
  color: #212121;
`;

const Divider = styled.View`
  height: 1px;
  background-color: #e0e0e0;
  margin-vertical: 8px;
`;

interface NoteEditModalProps {
  visible: boolean;
  note: Note;
  onClose: () => void;
  onSave: (updates: Partial<Note>) => void;
  onDelete: () => void;
}

export const NoteEditModal: React.FC<NoteEditModalProps> = ({
  visible,
  note,
  onClose,
  onSave,
  onDelete,
}) => {
  const [text, setText] = useState(note.text);
  const [category, setCategory] = useState<Category>(note.category);
  const [timestamp, setTimestamp] = useState(new Date(note.timestamp));
  const [isCompleted, setIsCompleted] = useState(note.isCompleted || false);
  const [isArchived, setIsArchived] = useState(note.isArchived);
  const [isPublic, setIsPublic] = useState(note.isPublic);

  useEffect(() => {
    if (visible) {
      setText(note.text);
      setCategory(note.category);
      setTimestamp(new Date(note.timestamp));
      setIsCompleted(note.isCompleted || false);
      setIsArchived(note.isArchived);
      setIsPublic(note.isPublic);
    }
  }, [visible, note]);

  const handleSave = () => {
    onSave({
      text,
      category,
      timestamp: timestamp.toISOString(),
      isCompleted,
      isArchived,
      isPublic,
    });
    onClose();
  };

  const openDatePicker = () => {
    // Simplificando para evitar problemas com APIs descontinuadas
    Alert.alert(
      "Selecionar Data",
      "Esta funcionalidade será implementada em breve",
      [{ text: "OK" }]
    );
  };

  const openTimePicker = () => {
    // Simplificando para evitar problemas com APIs descontinuadas
    Alert.alert(
      "Selecionar Hora",
      "Esta funcionalidade será implementada em breve",
      [{ text: "OK" }]
    );
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity activeOpacity={1} style={{ flex: 1 }} onPress={onClose}>
        <ModalContainer>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <TouchableOpacity
              activeOpacity={1}
              onPress={(e) => e.stopPropagation()}
            >
              <ModalContent>
                <Header>
                  <Title>Editar Nota</Title>
                  <CloseButton onPress={onClose}>
                    <Ionicons name="close" size={24} color="#757575" />
                  </CloseButton>
                </Header>

                <FormGroup>
                  <Label>Descrição</Label>
                  <Input
                    value={text}
                    onChangeText={setText}
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                    placeholder="Digite a descrição da tarefa..."
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Categoria</Label>
                  <CategoryRow>
                    <CategoryLabel>Selecione a categoria:</CategoryLabel>
                    <CategorySelector
                      selected={category}
                      onSelect={setCategory}
                      compact
                    />
                  </CategoryRow>
                </FormGroup>

                <FormGroup>
                  <Label>Data e Hora</Label>
                  <DateTimeContainer>
                    <DateTimeButton onPress={openDatePicker}>
                      <Ionicons
                        name="calendar-outline"
                        size={20}
                        color="#1976d2"
                      />
                      <DateTimeText>{formatDate(timestamp)}</DateTimeText>
                    </DateTimeButton>
                    <DateTimeButton onPress={openTimePicker}>
                      <Ionicons name="time-outline" size={20} color="#1976d2" />
                      <DateTimeText>{formatTime(timestamp)}</DateTimeText>
                    </DateTimeButton>
                  </DateTimeContainer>
                </FormGroup>

                <Divider />

                <SwitchContainer>
                  <SwitchLabel>Tarefa concluída</SwitchLabel>
                  <Switch
                    value={isCompleted}
                    onValueChange={setIsCompleted}
                    trackColor={{ false: "#e0e0e0", true: "#bbdefb" }}
                    thumbColor={isCompleted ? "#1976d2" : "#f5f5f5"}
                  />
                </SwitchContainer>

                <SwitchContainer>
                  <SwitchLabel>Arquivar nota</SwitchLabel>
                  <Switch
                    value={isArchived}
                    onValueChange={setIsArchived}
                    trackColor={{ false: "#e0e0e0", true: "#bbdefb" }}
                    thumbColor={isArchived ? "#1976d2" : "#f5f5f5"}
                  />
                </SwitchContainer>

                <ButtonsContainer>
                  <Button onPress={onDelete}>
                    <ButtonText>Excluir</ButtonText>
                  </Button>
                  <Button primary onPress={handleSave}>
                    <ButtonText primary>Salvar</ButtonText>
                  </Button>
                </ButtonsContainer>
              </ModalContent>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ModalContainer>
      </TouchableOpacity>
    </Modal>
  );
};
