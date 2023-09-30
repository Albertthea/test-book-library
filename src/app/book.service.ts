import { Injectable } from '@angular/core';
import { Book } from './book.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'http://localhost:3000/book';

  public authors: Observable<string[]>;
  public genres: Observable<string[]>;
  public languages: Observable<string[]>;

  constructor(private http: HttpClient) {
    this.authors = this.getUniqueValues('author');
    this.genres = this.getUniqueValues('genre');
    this.languages = this.getUniqueValues('language');
  }

  private getUniqueValues(property: keyof Book): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/${property}`);
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  getAuthors(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/authors`);
  }

  getGenres(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/genres`);
  }

  getLanguages(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/languages`);
  }

  getBookById(id: string): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${id}`);
  }

  updateBook(id: string, updatedBook: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/${id}`, updatedBook);
  }

  addBook(newBook: Book): Observable<Book> {
    return this.http.post<Book>(`${this.apiUrl}`, newBook);
  }

  updateAuthors(authors: string[]): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/authors`, authors);
  }

  addAuthor(newAuthor: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/authors`, { newAuthor });
  }
}
