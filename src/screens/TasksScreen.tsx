import React from "react";
import { SectionList, Text } from "react-native";
import styled from "styled-components/native";
import { useNotes } from "../hooks/useNotes";
import { NoteCard } from "../components/NoteCard";
import { Note } from "../types";
import { CATEGORY_TASK } from "../constants/Text";
import { formatDate } from "../utils/dateFormatter";

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

const SectionHeader = styled.View`
  padding: 12px 16px;
  background-color: #e3f2fd;
  border-bottom-width: 1px;
  border-bottom-color: #bbdefb;
`;

const SectionTitle = styled.Text`
  font-size: 14px;
  color: #1976d2;
  font-weight: 600;
`;

const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const EmptyText = styled.Text`
  font-size: 16px;
  color: #9e9e9e;
  text-align: center;
`;

interface Section {
  title: string;
  data: Note[];
}

export const TasksScreen: React.FC = () => {
  const { notes, allNotes, updateNote, linkNote, deleteNote } = useNotes();

  // Filtrar apenas tarefas não arquivadas
  const tasks = notes.filter(
    (note) => note.category === CATEGORY_TASK && !note.isArchived
  );

  // Agrupar tarefas por data
  const groupTasksByDate = (tasks: Note[]): Section[] => {
    const groups: Record<string, Note[]> = {};

    tasks.forEach((task) => {
      const date = new Date(task.timestamp);
      const dateStr = formatDate(date);

      if (!groups[dateStr]) {
        groups[dateStr] = [];
      }

      groups[dateStr].push(task);
    });

    // Ordenar as datas (mais recentes primeiro)
    return Object.entries(groups)
      .map(([dateStr, tasks]) => ({
        title: formatDateHeader(dateStr),
        data: tasks.sort((a, b) =>
          // Tarefas não concluídas primeiro, depois por timestamp
          a.isCompleted === b.isCompleted
            ? new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
            : a.isCompleted
            ? 1
            : -1
        ),
      }))
      .sort((a, b) => {
        // Ordenar seções por data (mais recentes primeiro)
        const dateA = new Date(a.data[0].timestamp);
        const dateB = new Date(b.data[0].timestamp);
        return dateB.getTime() - dateA.getTime();
      });
  };

  const formatDateHeader = (dateStr: string): string => {
    const today = formatDate(new Date());
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = formatDate(yesterday);

    if (dateStr === today) {
      return "Hoje";
    } else if (dateStr === yesterdayStr) {
      return "Ontem";
    } else {
      return dateStr;
    }
  };

  const sections = groupTasksByDate(tasks);

  return (
    <Container>
      <Header>
        <Title>Minhas Tarefas</Title>
      </Header>
      <ListContainer>
        {tasks.length > 0 ? (
          <SectionList
            sections={sections}
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
            renderSectionHeader={({ section: { title } }) => (
              <SectionHeader>
                <SectionTitle>{title}</SectionTitle>
              </SectionHeader>
            )}
            stickySectionHeadersEnabled={true}
          />
        ) : (
          <EmptyContainer>
            <EmptyText>Nenhuma tarefa encontrada.</EmptyText>
            <EmptyText>Adicione tarefas na tela inicial.</EmptyText>
          </EmptyContainer>
        )}
      </ListContainer>
    </Container>
  );
};
