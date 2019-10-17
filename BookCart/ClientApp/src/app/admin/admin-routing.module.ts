import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookFormComponent } from '../components/admin/book-form/book-form.component';
import { ManageBooksComponent } from '../components/admin/manage-books/manage-books.component';

const adminRoutes: Routes = [
  {
    path: '',
    children: [
      { path: 'new', component: BookFormComponent },
      { path: ':id', component: BookFormComponent },
      { path: '', component: ManageBooksComponent },
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
