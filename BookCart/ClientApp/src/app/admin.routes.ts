import { Routes } from "@angular/router";
import { BookFormComponent } from "./components/admin/book-form/book-form.component";
import { ManageBooksComponent } from "./components/admin/manage-books/manage-books.component";

export const ADMIN_ROUTES: Routes = [
  {
    path: "",
    children: [
      { path: "new", component: BookFormComponent },
      { path: ":id", component: BookFormComponent },
      { path: "", component: ManageBooksComponent },
    ],
  },
];
