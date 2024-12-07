import { FormControl } from "@angular/forms";

export interface LoginForm {
  username: FormControl<string>;
  password: FormControl<string>;
}
