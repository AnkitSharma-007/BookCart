import { FormControl } from "@angular/forms";

export interface UserRegistrationForm {
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  userName: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
  gender: FormControl<string>;
}
