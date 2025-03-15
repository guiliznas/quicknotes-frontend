import React from 'react';
import { View, Switch, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { useTheme } from '../theme/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.background.secondary};
`;

const Header = styled.View`
  padding-top: 20px;
  background-color: ${props => props.theme.background.primary};
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  padding: 16px;
  color: ${props => props.theme.text.primary};
`;

const SettingsSection = styled.View`
  margin: 16px;
  background-color: ${props => props.theme.background.primary};
  border-radius: 12px;
  overflow: hidden;
`;

const SectionHeader = styled.View`
  padding: 12px 16px;
  background-color: ${props => props.theme.background.tertiary};
`;

const SectionTitle = styled.Text`
  font-size: 14px;
  color: ${props => props.theme.text.secondary};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const SettingsItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.theme.divider};
`;

const SettingsItemLeft = styled.View`
  flex-direction: row;
  align-items: center;
`;

const IconContainer = styled.View`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background-color: ${props => props.theme.primaryLight};
  justify-content: center;
  align-items: center;
  margin-right: 12px;
`;

const SettingsLabel = styled.Text`
  font-size: 16px;
  color: ${props => props.theme.text.primary};
`;

const SettingsDescription = styled.Text`
  font-size: 14px;
  color: ${props => props.theme.text.secondary};
  margin-top: 4px;
`;

export const SettingsScreen: React.FC = () => {
  const { theme, isDarkMode, toggleTheme } = useTheme();

  return (
    <Container>
      <Header>
        <Title>Configurações</Title>
      </Header>
      <ScrollView>
        <SettingsSection>
          <SectionHeader>
            <SectionTitle>Aparência</SectionTitle>
          </SectionHeader>

          <SettingsItem>
            <SettingsItemLeft>
              <IconContainer>
                <Ionicons
                  name={isDarkMode ? "moon" : "sunny"}
                  size={20}
                  color={theme.primary}
                />
              </IconContainer>
              <View>
                <SettingsLabel>Tema Escuro</SettingsLabel>
                <SettingsDescription>
                  {isDarkMode ? 'Ativado' : 'Desativado'}
                </SettingsDescription>
              </View>
            </SettingsItemLeft>
            <Switch
              value={isDarkMode}
              onValueChange={toggleTheme}
              trackColor={{
                false: theme.switch.track.off,
                true: theme.switch.track.on
              }}
              thumbColor={
                isDarkMode ? theme.switch.thumb.on : theme.switch.thumb.off
              }
            />
          </SettingsItem>
        </SettingsSection>

        <SettingsSection>
          <SectionHeader>
            <SectionTitle>Sobre</SectionTitle>
          </SectionHeader>

          <SettingsItem style={{ borderBottomWidth: 0 }}>
            <SettingsItemLeft>
              <IconContainer>
                <Ionicons name="information-circle" size={20} color={theme.primary} />
              </IconContainer>
              <View>
                <SettingsLabel>QuickNotes</SettingsLabel>
                <SettingsDescription>
                  Versão 1.0.0
                </SettingsDescription>
              </View>
            </SettingsItemLeft>
          </SettingsItem>
        </SettingsSection>
      </ScrollView>
    </Container>
  );
};