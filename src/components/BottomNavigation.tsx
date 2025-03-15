import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

const NavContainer = styled.View`
  flex-direction: row;
  height: 60px;
  background-color: #ffffff;
  border-top-width: 1px;
  border-top-color: #e0e0e0;
`;

const NavButton = styled.TouchableOpacity<{ active: boolean }>`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.active ? "#f0f0f0" : "transparent")};
`;

const NavLabel = styled.Text<{ active: boolean }>`
  font-size: 12px;
  margin-top: 4px;
  color: ${(props) => (props.active ? "#1976d2" : "#757575")};
`;

export type Screen = "home" | "archived" | "tasks" | "settings";

interface BottomNavigationProps {
  activeScreen: Screen;
  onScreenChange: (screen: Screen) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeScreen,
  onScreenChange,
}) => {
  return (
    <NavContainer>
      <NavButton
        active={activeScreen === "home"}
        onPress={() => onScreenChange("home")}
      >
        <Ionicons
          name={activeScreen === "home" ? "home" : "home-outline"}
          size={24}
          color={activeScreen === "home" ? "#1976d2" : "#757575"}
        />
        <NavLabel active={activeScreen === "home"}>Início</NavLabel>
      </NavButton>

      <NavButton
        active={activeScreen === "tasks"}
        onPress={() => onScreenChange("tasks")}
      >
        <Ionicons
          name={activeScreen === "tasks" ? "checkbox" : "checkbox-outline"}
          size={24}
          color={activeScreen === "tasks" ? "#1976d2" : "#757575"}
        />
        <NavLabel active={activeScreen === "tasks"}>Tarefas</NavLabel>
      </NavButton>

      <NavButton
        active={activeScreen === "archived"}
        onPress={() => onScreenChange("archived")}
      >
        <Ionicons
          name={activeScreen === "archived" ? "archive" : "archive-outline"}
          size={24}
          color={activeScreen === "archived" ? "#1976d2" : "#757575"}
        />
        <NavLabel active={activeScreen === "archived"}>Arquivados</NavLabel>
      </NavButton>

      <NavButton
        active={activeScreen === "settings"}
        onPress={() => onScreenChange("settings")}
      >
        <Ionicons
          name={activeScreen === "settings" ? "settings" : "settings-outline"}
          size={24}
          color={activeScreen === "settings" ? "#1976d2" : "#757575"}
        />
        <NavLabel active={activeScreen === "settings"}>Configurações</NavLabel>
      </NavButton>
    </NavContainer>
  );
};
