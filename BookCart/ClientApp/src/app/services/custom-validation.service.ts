import { inject, Injectable } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  ValidatorFn,
} from "@angular/forms";
import { debounceTime } from "rxjs";
import { UserService } from "./user.service";

@Injectable({
  providedIn: "root",
})
export class CustomValidationService {
  private userService = inject(UserService);
  private debouncer: any;

  patternValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$");
      const valid = regex.test(control.value);
      return valid ? null : { passwordValidation: true };
    };
  }

  matchPassword(password: string, confirmPassword: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const passwordControl = formGroup.get(password);
      const confirmPasswordControl = formGroup.get(confirmPassword);

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors["passwordMismatch"]
      ) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      } else {
        confirmPasswordControl.setErrors(null);
        return null;
      }
    };
  }

  userNameValidator(userControl: FormControl) {
    clearTimeout(this.debouncer);
    return new Promise((resolve) => {
      this.debouncer = setTimeout(() => {
        this.userService
          .validateUserName(userControl.value)
          .pipe(debounceTime(1000))
          .subscribe((result) => {
            if (result) {
              resolve(null);
            } else {
              resolve({ userNameNotAvailable: true });
            }
          });
      }, 1000);
    });
  }
}
