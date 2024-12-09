import { FormControl } from "@angular/forms";

export interface CheckOutForm {
  name: FormControl<string>;
  addressLine1: FormControl<string>;
  addressLine2: FormControl<string>;
  pincode: FormControl<string>;
  state: FormControl<string>;
}
