import { AsyncPipe, LowerCasePipe } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from "@angular/core";
import { MatDivider } from "@angular/material/divider";
import { MatListItem, MatListModule } from "@angular/material/list";
import { RouterLink } from "@angular/router";
import { Store } from "@ngrx/store";
import { EMPTY } from "rxjs";
import { catchError } from "rxjs/operators";
import { loadCategories } from "src/app/state/actions/categories.actions";
import { selectCategories } from "src/app/state/selectors/categories.selectors";

@Component({
  selector: "app-book-filter",
  templateUrl: "./book-filter.component.html",
  styleUrls: ["./book-filter.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatListModule,
    MatListItem,
    RouterLink,
    MatDivider,
    AsyncPipe,
    LowerCasePipe,
  ],
})
export class BookFilterComponent {
  @Input()
  category: string;

  private readonly store = inject(Store);

  categories$ = this.store.select(selectCategories).pipe(
    catchError((error) => {
      console.log("Error ocurred while fetching category List : ", error);
      return EMPTY;
    })
  );

  constructor() {
    this.store.dispatch(loadCategories());
  }
}
