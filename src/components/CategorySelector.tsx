import React from "react";
import { Button, View } from "react-native";
import styled from "styled-components/native";
import { Category } from "../types";

const Container = styled.View`
  flex-direction: row;
  margin-top: 5px;
`;

interface CategorySelectorProps {
  selected: Category;
  onSelect: (category: Category) => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  selected,
  onSelect,
}) => {
  return (
    <Container>
      <Button
        title="🕒"
        onPress={() => onSelect("fleeting")}
        disabled={selected === "fleeting"}
      />
      <Button
        title="📖"
        onPress={() => onSelect("literature")}
        disabled={selected === "literature"}
      />
      <Button
        title="🔒"
        onPress={() => onSelect("permanent")}
        disabled={selected === "permanent"}
      />
    </Container>
  );
};
