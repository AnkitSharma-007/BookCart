import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, shareReplay } from "rxjs/operators";
import { Book } from "../models/book";
import { Categories } from "../models/categories";

@Injectable({
  providedIn: "root",
})
export class BookService {
  private readonly http = inject(HttpClient);
  private readonly baseURL = "/api/book/";

  getAllBooks() {
    return this.http.get<Book[]>(this.baseURL);
  }

  addBook(book: FormData) {
    return this.http.post<Book>(this.baseURL, book);
  }

  getSimilarBooks(bookId: number) {
    return this.http.get<Book[]>(`${this.baseURL}/GetSimilarBooks/${bookId}`);
  }

  updateBookDetails(book: FormData) {
    return this.http.put<Book>(this.baseURL, book);
  }

  deleteBook(id: number) {
    return this.http.delete(this.baseURL + id);
  }

  getCategories() {
    return this.http.get<Categories[]>(`${this.baseURL}/GetCategoriesList`);
  }
}
