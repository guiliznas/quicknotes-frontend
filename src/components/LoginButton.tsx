import React, { useState } from 'react';
import { TouchableOpacity, View, Text, ActivityIndicator, StyleSheet, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton: React.FC = () => {
  const { theme } = useTheme();
  const { isAuthenticated, isLoading, user, logout, loginWithRedirect } = useAuth0();
  const [error, setError] = useState<string | null>(null);
  const [localLoading, setLocalLoading] = useState(false);

  const handleLogin = async () => {
    try {
      await loginWithRedirect();
    } catch (e: any) {
      console.log('Erro de login:', e);
      setError(e.message || 'Ocorreu um erro durante o login');
    }
  };

  const handleLogout = async () => {
    try {
      setLocalLoading(true);
      setError(null);
      await logout();
    } catch (e: any) {
      console.log('Erro de logout:', e);
      setError(e.message || 'Ocorreu um erro durante o logout');
    } finally {
      setLocalLoading(false);
    }
  };

  // if (isLoading) {
  //   return (
  //     <View style={styles.container}>
  //       <ActivityIndicator size="large" color={theme.primary} />
  //       <Text style={[styles.loadingText, { color: theme.text.secondary }]}>
  //         Carregando...
  //       </Text>
  //     </View>
  //   );
  // }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={[styles.errorText, { color: theme.error }]}>
          Erro: {error}
        </Text>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.primary }]}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (isAuthenticated && user) {
    return (
      <View style={styles.container}>
        <View style={styles.userInfoContainer}>
          {user.picture ? (
            <Image source={{ uri: user.picture }} style={styles.userAvatar} />
          ) : (
            <View style={[styles.userAvatarPlaceholder, { backgroundColor: theme.primaryLight }]}>
              <Ionicons name="person" size={24} color={theme.primary} />
            </View>
          )}
          <View style={styles.userTextContainer}>
            <Text style={[styles.userName, { color: theme.text.primary }]}>
              {user.name || user.email || 'Usuário'}
            </Text>
            {user.email && (
              <Text style={[styles.userEmail, { color: theme.text.secondary }]}>
                {user.email}
              </Text>
            )}
          </View>
        </View>

        <TouchableOpacity
          style={[styles.button, styles.logoutButton, { backgroundColor: theme.error }]}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={18} color="#FFFFFF" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.primary }]}
        onPress={handleLogin}
      >
        <Ionicons name="log-in-outline" size={18} color="#FFFFFF" style={styles.buttonIcon} />
        <Text style={styles.buttonText}>Entrar com Auth0</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 16,
    alignItems: 'center',
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userAvatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 14,
    marginTop: 4,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
  },
  logoutButton: {
    marginTop: 8,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
  },
  errorText: {
    marginBottom: 16,
    fontSize: 14,
    textAlign: 'center',
  },
});

export default LoginButton;