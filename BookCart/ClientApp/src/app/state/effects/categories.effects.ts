import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of } from "rxjs";
import { Categories } from "src/app/models/categories";
import { BookService } from "src/app/services/book.service";
import * as CategoriesActions from "../actions/categories.actions";

@Injectable()
export class CategoriesEffects {
  private readonly bookService = inject(BookService);
  private readonly actions$ = inject(Actions);

  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.loadCategories),
      exhaustMap(() =>
        this.bookService.getCategories().pipe(
          map((categories: Categories[]) =>
            CategoriesActions.loadCategoriesSuccess({ genres: categories })
          ),
          catchError((error: string) =>
            of(CategoriesActions.loadCategoriesFailure({ error }))
          )
        )
      )
    )
  );
}
