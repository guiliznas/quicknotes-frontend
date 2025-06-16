import React from 'react';
import { TouchableOpacity, View, Text, ActivityIndicator, StyleSheet, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { useAuth } from '../context/AuthContext'; // Import useAuth

const LoginButton: React.FC = () => {
  const { theme } = useTheme();
  // Use useAuth hook
  const { user, loading, signInWithGoogle, signOut } = useAuth();

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (e: any) {
      console.log('Erro de login com Google:', e);
      Alert.alert('Erro de Login', e.message || 'Ocorreu um erro durante o login com Google.');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (e: any) {
      console.log('Erro de logout:', e);
      Alert.alert('Erro de Logout', e.message || 'Ocorreu um erro durante o logout.');
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={theme.primary} />
        <Text style={[styles.loadingText, { color: theme.text.secondary }]}>
          Carregando...
        </Text>
      </View>
    );
  }

  // Removed Auth0-specific error block, basic error handling is in handleLogin/handleLogout

  if (user) { // Check for user object from useAuth
    return (
      <View style={styles.container}>
        <View style={styles.userInfoContainer}>
          {user.photoUrl ? ( // Use user.photoUrl
            <Image source={{ uri: user.photoUrl }} style={styles.userAvatar} />
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
          onPress={handleLogout} // Use updated handleLogout
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
        onPress={handleLogin} // Use updated handleLogin
      >
        <Ionicons name="logo-google" size={18} color="#FFFFFF" style={styles.buttonIcon} />
        <Text style={styles.buttonText}>Entrar com Google</Text>
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