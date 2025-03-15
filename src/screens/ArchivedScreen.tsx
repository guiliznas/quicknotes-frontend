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

export const ArchivedScreen: React.FC = () => {
  const { notes, allNotes, updateNote, linkNote } = useNotes();

  // Filtrar apenas notas arquivadas
  const archivedNotes = allNotes.filter((note) => note.isArchived);

  return (
    <Container>
      <Header>
        <Title>Notas Arquivadas</Title>
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
              allNotes={allNotes}
            />
          )}
        />
      </ListContainer>
    </Container>
  );
};
