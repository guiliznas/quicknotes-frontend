export type Category = "fleeting" | "literature" | "permanent" | null;

export interface Note {
  id: string;
  text: string;
  timestamp: string;
  category: Category;
  reference?: string;
  linkedIds?: string[];
  isCompleted?: boolean;
  isPublic: boolean;
  isArchived: boolean;
}
