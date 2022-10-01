export interface CardProps {
  id: string;
  text: string;
  date: Date;
  handleDeleteNote: (id: string) => void;
}

export interface Note {
    id: string;
    text: string;
    date: Date;
}