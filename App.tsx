import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { HomeScreen } from "./src/screens/HomeScreen";
import { TasksScreen } from "./src/screens/TasksScreen";
import { ArchivedScreen } from "./src/screens/ArchivedScreen";
import { SettingsScreen } from "./src/screens/SettingsScreen";
import { ThemeProvider, useTheme } from "./src/theme/ThemeContext";
import { StatusBar } from "expo-status-bar";
import LoginScreen from "./src/screens/LoginScreen";
// Removed Auth0 imports
import { AuthProvider as GoogleAuthProvider } from "./src/context/AuthContext"; // Renamed to avoid conflict for now
import { useAuth } from "./src/context/AuthContext"; // Import useAuth from new context

// Old AuthContext, AuthProvider, and useAuth related to Auth0 are removed.

const Tab = createBottomTabNavigator();

function MainApp() {
  const { theme, isDarkMode } = useTheme();
  // useAuth now refers to the one from ./src/context/AuthContext
  const { user, loading } = useAuth();

  // console.log('Auth status:', { user, loading }); // Updated logging

  return (
    <>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      {/* {console.log('Auth status:', { user, loading })} */}

      {/* Show LoginScreen if user is not logged in and not loading */}
      {!user && !loading && <LoginScreen />}

      {/* Optionally, only render NavigationContainer if user is logged in or loading is finished */}
      {/* This depends on desired UX, for now, it will always render */}
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
              let iconName: keyof typeof Ionicons.glyphMap = 'home';

              if (route.name === "Home") {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === "Tasks") {
                iconName = focused ? 'checkbox' : 'checkbox-outline';
              } else if (route.name === "Archived") {
                iconName = focused ? 'archive' : 'archive-outline';
              } else if (route.name === "Settings") {
                iconName = focused ? 'settings' : 'settings-outline';
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
    // Wrap with the new AuthProvider from ./src/context/AuthContext
    <GoogleAuthProvider>
      <ThemeProvider>
        <MainApp />
      </ThemeProvider>
    </GoogleAuthProvider>
  );
}
