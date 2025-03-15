import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { HomeScreen } from "./src/screens/HomeScreen";
import { TasksScreen } from "./src/screens/TasksScreen";
import { ArchivedScreen } from "./src/screens/ArchivedScreen";
import { SettingsScreen } from "./src/screens/SettingsScreen";
import { ThemeProvider, useTheme } from "./src/theme/ThemeContext";
import { StatusBar } from "expo-status-bar";

const Tab = createBottomTabNavigator();

function MainApp() {
  const { theme, isDarkMode } = useTheme();

  return (
    <>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      <NavigationContainer
        theme={{
          dark: isDarkMode,
          colors: {
            primary: theme.primary,
            background: theme.background.primary,
            card: theme.background.primary,
            text: theme.text.primary,
            border: theme.border,
            notification: theme.error,
          },
        }}
      >
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = focused ? "home" : "home-outline";
              } else if (route.name === "Tasks") {
                iconName = focused ? "checkbox" : "checkbox-outline";
              } else if (route.name === "Archived") {
                iconName = focused ? "archive" : "archive-outline";
              } else if (route.name === "Settings") {
                iconName = focused ? "settings" : "settings-outline";
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: theme.primary,
            tabBarInactiveTintColor: theme.text.secondary,
            tabBarStyle: {
              backgroundColor: theme.background.primary,
              borderTopColor: theme.border,
            },
            headerShown: false,
          })}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "Início" }}
          />
          <Tab.Screen
            name="Tasks"
            component={TasksScreen}
            options={{ title: "Tarefas" }}
          />
          <Tab.Screen
            name="Archived"
            component={ArchivedScreen}
            options={{ title: "Arquivados" }}
          />
          <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ title: "Configurações" }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}
