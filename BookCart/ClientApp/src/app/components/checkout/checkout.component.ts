import { AsyncPipe, CurrencyPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButton } from "@angular/material/button";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from "@angular/material/card";
import { MatError, MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { RouterLink } from "@angular/router";
import { Store } from "@ngrx/store";
import { combineLatest } from "rxjs";
import { map } from "rxjs/operators";
import { CheckOutForm } from "src/app/models/checkoutForm";
import { LoadingState } from "src/app/shared/call-state";
import { placeOrder } from "src/app/state/actions/checkout.actions";
import {
  selectCartCallState,
  selectCartItems,
} from "src/app/state/selectors/cart.selectors";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatError,
    MatCardActions,
    MatButton,
    RouterLink,
    MatProgressSpinner,
    CurrencyPipe,
    AsyncPipe,
  ],
})
export class CheckoutComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly store = inject(Store);
  protected readonly loadingState = LoadingState;

  totalPrice = 0;

  checkOutForm: FormGroup<CheckOutForm> = this.fb.group({
    name: ["", Validators.required],
    addressLine1: ["", Validators.required],
    addressLine2: ["", Validators.required],
    pincode: [
      "",
      Validators.compose([
        Validators.required,
        Validators.pattern("^[1-9][0-9]{5}$"),
      ]),
    ],
    state: ["", [Validators.required]],
  });

  get checkoutFormControl() {
    return this.checkOutForm.controls;
  }

  protected readonly checkOutItems$ = combineLatest([
    this.store.select(selectCartItems),
    this.store.select(selectCartCallState),
  ]).pipe(
    map(([items, callState]) => {
      if (items.length > 0) {
        this.totalPrice = items.reduce(
          (total, item) => total + item.book.price * item.quantity,
          0
        );
      } else if (items.length === 0 && callState === LoadingState.LOADED) {
        this.checkOutForm.disable();
      }
      return { items, callState };
    })
  );

  placeOrder() {
    if (this.checkOutForm.valid) {
      this.store.dispatch(placeOrder({ totalPrice: this.totalPrice }));
    }
  }
}
