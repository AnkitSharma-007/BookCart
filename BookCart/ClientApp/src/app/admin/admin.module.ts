import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { BookFormComponent } from '../components/admin/book-form/book-form.component';
import { ManageBooksComponent } from '../components/admin/manage-books/manage-books.component';

import { DeleteBookComponent } from '../components/admin/delete-book/delete-book.component';

@NgModule({
    imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    BookFormComponent,
    ManageBooksComponent,
    DeleteBookComponent
],
})
export class AdminModule { }
