import React from "react";
import { FlatList, RefreshControl } from "react-native";
import styled from "styled-components/native";
import { useNotes } from "../hooks/useNotes";
import { NoteCard } from "../components/NoteCard";
import { useTheme } from "../theme/ThemeContext";

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.background.secondary};
`;

const Header = styled.View`
  padding-top: 20px;
  background-color: ${(props) => props.theme.background.primary};
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  padding: 16px;
  color: ${(props) => props.theme.text.primary};
`;

const ListContainer = styled.View`
  flex: 1;
`;

const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const EmptyText = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.text.secondary};
`;

export const ArchivedScreen: React.FC = () => {
  const {
    allNotes,
    updateNote,
    linkNote,
    deleteNote,
    isRefreshing,
    fetchNotes,
  } = useNotes();
  const { theme } = useTheme();

  // Filtrar apenas notas arquivadas
  const archivedNotes = allNotes.filter((note) => note.isArchived);

  return (
    <Container>
      <Header>
        <Title>Arquivados</Title>
      </Header>
      <ListContainer>
        <FlatList
          data={archivedNotes}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <NoteCard
              note={item}
              onUpdate={(updates) => updateNote(item._id, updates)}
              onLink={(linkedId) => linkNote(item._id, linkedId)}
              onDelete={() => deleteNote(item._id)}
              allNotes={allNotes}
            />
          )}
          ListEmptyComponent={
            <EmptyContainer>
              <EmptyText>Nenhuma nota arquivada.</EmptyText>
            </EmptyContainer>
          }
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={fetchNotes}
              colors={[theme.primary]}
              tintColor={theme.primary}
            />
          }
        />
      </ListContainer>
    </Container>
  );
};
