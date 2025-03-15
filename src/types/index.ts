export type Category = "fleeting" | "literature" | "permanent" | "task" | null;

export interface Note {
  _id: string;
  text: string;
  timestamp: string;
  category: Category;
  reference?: string;
  linkedIds?: string[];
  isCompleted?: boolean;
  isPublic: boolean;
  isArchived: boolean;
}
