import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { HomeScreen } from "./src/screens/HomeScreen";
import { ArchivedScreen } from "./src/screens/ArchivedScreen";
import { TasksScreen } from "./src/screens/TasksScreen";
import { BottomNavigation, Screen } from "./src/components/BottomNavigation";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
`;

const ScreenContainer = styled.View`
  flex: 1;
`;

export default function App() {
  const [activeScreen, setActiveScreen] = useState<Screen>("home");

  const renderScreen = () => {
    switch (activeScreen) {
      case "home":
        return <HomeScreen />;
      case "tasks":
        return <TasksScreen />;
      case "archived":
        return <ArchivedScreen />;
      case "settings":
        // Podemos adicionar uma tela de configurações no futuro
        return <HomeScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <Container>
      <StatusBar style="auto" />
      <ScreenContainer>{renderScreen()}</ScreenContainer>
      <BottomNavigation
        activeScreen={activeScreen}
        onScreenChange={setActiveScreen}
      />
    </Container>
  );
}
