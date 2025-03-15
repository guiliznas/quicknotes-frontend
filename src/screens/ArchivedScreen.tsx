import React from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import { useNotes } from "../hooks/useNotes";
import { NoteCard } from "../components/NoteCard";

const Container = styled.View`
  flex: 1;
  background-color: #f5f5f5;
`;

const Header = styled.View`
  padding-top: 20px;
  background-color: #ffffff;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  padding: 16px;
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
  color: #757575;
`;

export const ArchivedScreen: React.FC = () => {
  const { notes, allNotes, updateNote, linkNote, deleteNote } = useNotes();

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
        />
      </ListContainer>
    </Container>
  );
};
