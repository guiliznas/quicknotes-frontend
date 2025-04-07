import React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, Dimensions, Modal, TouchableOpacity } from 'react-native';
import LoginButton from '../components/LoginButton';
import { useTheme } from '../theme/ThemeContext';
import { useAuth } from '../../App';

const { width, height } = Dimensions.get('window');

const LoginScreen: React.FC = () => {
  const { theme } = useTheme();
  const { isAuthenticated } = useAuth();
  const [modalVisible, setModalVisible] = React.useState(true);

  // Se o usuário já estiver autenticado, não mostra a tela de login
  if (isAuthenticated) {
    return null;
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background.primary }]}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={[styles.closeButtonText, { color: theme.text.primary }]}>×</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/icon.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={[styles.appName, { color: theme.text.primary }]}>
              QuickNotes
            </Text>
            <Text style={[styles.tagline, { color: theme.text.secondary }]}>
              Suas anotações rápidas em um só lugar
            </Text>
          </View>

          <View style={styles.loginContainer}>
            <LoginButton />
          </View>

          <Text style={[styles.footer, { color: theme.text.secondary }]}>
            2025 QuickNotes. Todos os direitos reservados.
          </Text>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: height * 0.05,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    textAlign: 'center',
  },
  loginContainer: {
    width: '100%',
    maxWidth: 320,
    marginVertical: 40,
  },
  footer: {
    fontSize: 12,
    marginBottom: 16,
  }
});

export default LoginScreen;
