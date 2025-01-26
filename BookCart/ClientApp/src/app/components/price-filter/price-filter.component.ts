import { AsyncPipe, CurrencyPipe } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  inject,
} from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from "@angular/material/card";
import { MatSlider, MatSliderThumb } from "@angular/material/slider";
import { Store } from "@ngrx/store";
import { combineLatest, map } from "rxjs";
import { SubscriptionService } from "src/app/services/subscription.service";
import {
  selectMaxBookPrice,
  selectMinBookPrice,
} from "src/app/state/selectors/book.selectors";

@Component({
    selector: "app-price-filter",
    templateUrl: "./price-filter.component.html",
    styleUrls: ["./price-filter.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatCard,
        MatCardHeader,
        MatCardTitle,
        MatCardContent,
        MatSlider,
        MatSliderThumb,
        ReactiveFormsModule,
        FormsModule,
        CurrencyPipe,
        AsyncPipe,
    ]
})
export class PriceFilterComponent implements OnDestroy {
  private readonly subscriptionService = inject(SubscriptionService);
  private readonly store = inject(Store);

  bookPriceRange$ = combineLatest([
    this.store.select(selectMinBookPrice),
    this.store.select(selectMaxBookPrice),
  ]).pipe(
    map(([minPrice, maxPrice]) => {
      return { minPrice, maxPrice };
    })
  );

  formatLabel(labelValue: number): string {
    if (labelValue >= 1000) {
      return Math.round(labelValue / 1000) + "k";
    }
    return `${labelValue}`;
  }

  onChange(event) {
    this.subscriptionService.priceFilterValue$.next(event.target.value);
  }

  ngOnDestroy(): void {
    this.subscriptionService.priceFilterValue$.next(Number.MAX_SAFE_INTEGER);
  }
}
