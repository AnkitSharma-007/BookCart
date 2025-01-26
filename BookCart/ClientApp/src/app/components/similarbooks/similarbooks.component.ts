import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from "@angular/material/card";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { ActivatedRoute } from "@angular/router";
import { switchMap } from "rxjs";
import { BookService } from "src/app/services/book.service";
import { BookCardComponent } from "../book-card/book-card.component";
import { Store } from "@ngrx/store";
import { loadSimilarBooks } from "src/app/state/actions/similar-books.actions";
import { selectSimilarBooks } from "src/app/state/selectors/similar-books.selectors";

@Component({
    selector: "app-similarbooks",
    templateUrl: "./similarbooks.component.html",
    styleUrls: ["./similarbooks.component.scss"],
    imports: [
        MatCard,
        MatCardHeader,
        MatCardTitle,
        MatCardContent,
        BookCardComponent,
        MatProgressSpinner,
        AsyncPipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimilarbooksComponent {
  private readonly store = inject(Store);
  protected readonly similarBooks$ = this.store.select(selectSimilarBooks);

  constructor() {
    this.store.dispatch(loadSimilarBooks());
  }
}
