import { Routes } from "@angular/router";

export const ADMIN_ROUTES: Routes = [
  {
    path: "",
    children: [
      {
        path: "new",
        loadComponent: () =>
          import("../components/admin/book-form/book-form.component").then(
            (c) => c.BookFormComponent
          ),
        title: "Admin | Add Book",
      },
      {
        path: ":id",
        loadComponent: () =>
          import("../components/admin/book-form/book-form.component").then(
            (c) => c.BookFormComponent
          ),
        title: "Admin | Update Book",
      },
      {
        path: "",
        loadComponent: () =>
          import(
            "../components/admin/manage-books/manage-books.component"
          ).then((c) => c.ManageBooksComponent),
      },
    ],
  },
];
