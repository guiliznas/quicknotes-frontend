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
import Auth0 from 'react-native-auth0';
import {Auth0Provider} from '@auth0/auth0-react';

// Crie um contexto para compartilhar o estado de autenticação
export const AuthContext = React.createContext<{
  isAuthenticated: boolean;
  isLoading: boolean;
  userInfo: any;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}>({
  isAuthenticated: false,
  isLoading: false,
  userInfo: null,
  login: async () => {},
  logout: async () => {},
});

// Provedor de autenticação personalizado
export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<any>(null);

  const auth0 = new Auth0({
    domain: 'dev-a5xb3b1qq5srkyam.us.auth0.com',
    clientId: 'QTAvPk2VY1IJXrlU4YNJLQzl9K41Xrnc'
  });

  // Verificar se o usuário já está autenticado ao iniciar o app
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        console.log('Verificando status')
        const credentials = await auth0.credentialsManager.getCredentials();
        if (credentials && credentials.accessToken) {
          const userInfo = await auth0.auth.userInfo({ token: credentials.accessToken });
          setUserInfo(userInfo);
          setIsAuthenticated(true);
        }
        console.log(credentials)
      } catch (error) {
        console.log('Não há sessão ativa:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
    console.log('Verificar se está logado')
  }, []);

  const login = async () => {
    try {
      setIsLoading(true);
      const credentials = await auth0.webAuth.authorize({
        scope: 'openid profile email'
      });

      const userInfo = await auth0.auth.userInfo({ token: credentials.accessToken });
      setUserInfo(userInfo);
      setIsAuthenticated(true);
    } catch (error) {
      console.log('Erro de login:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await auth0.webAuth.clearSession();
      setUserInfo(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.log('Erro de logout:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, userInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar o contexto de autenticação
export const useAuth = () => React.useContext(AuthContext);

const Tab = createBottomTabNavigator();

function MainApp() {
  const { theme, isDarkMode } = useTheme();
  const { isAuthenticated, isLoading } = useAuth();

  console.log('Auth status:', { isAuthenticated, isLoading });

  return (
    <>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      {console.log('Auth status:', { isAuthenticated, isLoading })}

      {!isAuthenticated && !isLoading && <LoginScreen />}

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
    <Auth0Provider
      domain="dev-a5xb3b1qq5srkyam.us.auth0.com"
      clientId="QTAvPk2VY1IJXrlU4YNJLQzl9K41Xrnc"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <ThemeProvider>
        <MainApp />
      </ThemeProvider>
    </Auth0Provider>
  );
}
