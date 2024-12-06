import { CurrencyPipe } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  Input,
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
import { SubscriptionService } from "src/app/services/subscription.service";

@Component({
  selector: "app-price-filter",
  templateUrl: "./price-filter.component.html",
  styleUrls: ["./price-filter.component.scss"],
  standalone: true,
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
  ],
})
export class PriceFilterComponent implements OnDestroy {
  private readonly subscriptionService = inject(SubscriptionService);

  @Input({ required: true }) minFilterValue: number;
  @Input({ required: true }) maxFilterValue: number;

  value = Number.MAX_SAFE_INTEGER;

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
    this.subscriptionService.priceFilterValue$.next(this.maxFilterValue);
  }
}
