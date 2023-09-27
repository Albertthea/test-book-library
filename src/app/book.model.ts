export interface Book {
  id?: string;
  title: string;
  author: string;
  genre: string;
  language: string;
  pageCount?: number | 0;
  description?: string | null | undefined; 
}
