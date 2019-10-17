import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  baseURL: string;

  constructor(private http: HttpClient) {
    this.baseURL = '/api/book/';
  }

  getAllBooks() {
    return this.http.get(this.baseURL)
      .pipe(map(response => {
        return response;
      }));
  }

  getCategories() {
    return this.http.get(this.baseURL + 'GetCategoriesList')
      .pipe(map(response => {
        return response;
      }));
  }

  addBook(book) {
    return this.http.post(this.baseURL, book)
      .pipe(map(response => {
        return response;
      }));
  }

  getBookById(id: number) {
    return this.http.get(this.baseURL + id)
      .pipe(map(response => {
        return response;
      }));
  }

  getsimilarBooks(bookId: number) {
    return this.http.get(this.baseURL + 'GetSimilarBooks/' + bookId)
      .pipe(map(response => {
        return response;
      }));
  }

  updateBookDetails(book) {
    return this.http.put(this.baseURL, book)
      .pipe(map(response => {
        return response;
      }));
  }

  deleteBook(id) {
    return this.http.delete(this.baseURL + id)
      .pipe(map(response => {
        return response;
      }));
  }
}
