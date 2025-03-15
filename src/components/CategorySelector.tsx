import React, { useState } from "react";
import { Modal, TouchableOpacity, View, Text } from "react-native";
import styled from "styled-components/native";
import { Category } from "../types";
import { Ionicons } from "@expo/vector-icons";
import {
  CATEGORY_TASK,
  CATEGORY_FLEETING,
  CATEGORY_LITERATURE,
  CATEGORY_PERMANENT,
} from "../constants/Text";

const TagButton = styled.TouchableOpacity<{ selected: boolean }>`
  width: 28px;
  height: 28px;
  border-radius: 14px;
  border-width: 2px;
  border-color: ${(props) => (props.selected ? "#1976d2" : "#e0e0e0")};
  justify-content: center;
  align-items: center;
  margin-left: 8px;
`;

const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.View`
  background-color: white;
  border-radius: 12px;
  padding: 16px;
  width: 80%;
  max-width: 300px;
`;

const CategoryOption = styled.TouchableOpacity<{ isSelected: boolean }>`
  flex-direction: row;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
  background-color: ${(props) =>
    props.isSelected ? "#e3f2fd" : "transparent"};
`;

const CategoryText = styled.Text<{ isSelected: boolean }>`
  font-size: 16px;
  color: ${(props) => (props.isSelected ? "#1976d2" : "#000000")};
  margin-left: 8px;
`;

const categoryLabels: Record<Category, { label: string; emoji: string }> = {
  [CATEGORY_TASK]: { label: "Tarefa", emoji: "📝" },
  [CATEGORY_FLEETING]: { label: "Rápida", emoji: "🕒" },
  [CATEGORY_LITERATURE]: { label: "Literatura", emoji: "📖" },
  [CATEGORY_PERMANENT]: { label: "Permanente", emoji: "🔒" },
  null: { label: "Sem categoria", emoji: "📝" },
};

interface CategorySelectorProps {
  selected: Category;
  onSelect: (category: Category) => void;
  compact?: boolean;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  selected,
  onSelect,
  compact,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (category: Category) => {
    onSelect(category);
    setModalVisible(false);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  return (
    <>
      <TagButton selected={!!selected} onPress={() => setModalVisible(true)}>
        {selected ? (
          <Text>{categoryLabels[selected].emoji}</Text>
        ) : (
          <Ionicons name="pricetag-outline" size={16} color="#757575" />
        )}
      </TagButton>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={handleModalClose}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={handleModalClose}
          style={{ flex: 1 }}
        >
          <ModalContainer>
            <ModalContent>
              {(
                [
                  CATEGORY_TASK,
                  CATEGORY_FLEETING,
                  CATEGORY_LITERATURE,
                  CATEGORY_PERMANENT,
                  null,
                ] as Category[]
              ).map((category) => (
                <CategoryOption
                  key={category || "null"}
                  isSelected={category === selected}
                  onPress={() => handleSelect(category)}
                >
                  <Text>
                    {category ? categoryLabels[category].emoji : "📝"}
                  </Text>
                  <CategoryText isSelected={category === selected}>
                    {category
                      ? categoryLabels[category].label
                      : "Sem categoria"}
                  </CategoryText>
                </CategoryOption>
              ))}
            </ModalContent>
          </ModalContainer>
        </TouchableOpacity>
      </Modal>
    </>
  );
};
