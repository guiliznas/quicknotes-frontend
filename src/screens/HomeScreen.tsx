import React from "react";
import { FlatList, View, SectionList } from "react-native";
import styled from "styled-components/native";
import { useNotes } from "../hooks/useNotes";
import { NoteInput } from "../components/NoteInput";
import { NoteCard } from "../components/NoteCard";
import { Note } from "../types";

const Container = styled.View`
  flex: 1;
  background-color: #f5f5f5;
`;

const ListContainer = styled.View`
  flex: 1;
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

const SectionHeader = styled.View`
  padding: 8px 16px;
  background-color: #f5f5f5;
`;

const SectionTitle = styled.Text`
  font-size: 12px;
  color: #757575;
  font-weight: 500;
  letter-spacing: 0.5px;
`;

interface Section {
  title: string;
  data: Note[];
}

export const HomeScreen: React.FC = () => {
  const { notes, allNotes, addNote, updateNote, linkNote } = useNotes();

  const sections: Section[] = [
    {
      title: "ACTIVE TASKS",
      data: notes.filter((note) => !note.isCompleted && !note.isArchived),
    },
    {
      title: "COMPLETED",
      data: notes.filter((note) => note.isCompleted && !note.isArchived),
    },
  ];

  return (
    <Container>
      <Header>
        <Title>QuickNotes</Title>
        <NoteInput onAdd={addNote} />
      </Header>
      <ListContainer>
        <SectionList
          sections={sections}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <NoteCard
              note={item}
              onUpdate={(updates) => updateNote(item._id, updates)}
              onLink={(linkedId) => linkNote(item._id, linkedId)}
              allNotes={allNotes}
            />
          )}
          renderSectionHeader={({ section: { title } }) => (
            <SectionHeader>
              <SectionTitle>{title}</SectionTitle>
            </SectionHeader>
          )}
          stickySectionHeadersEnabled={false}
        />
      </ListContainer>
    </Container>
  );
};
