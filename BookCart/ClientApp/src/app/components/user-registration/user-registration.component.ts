import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
} from "@angular/core";
import {
  FormControl,
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
import {
  MatError,
  MatFormField,
  MatLabel,
  MatSuffix,
} from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatInput } from "@angular/material/input";
import { MatRadioButton, MatRadioGroup } from "@angular/material/radio";
import { Router, RouterLink } from "@angular/router";
import { ReplaySubject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { CustomValidationService } from "src/app/services/custom-validation.service";
import { SnackbarService } from "src/app/services/snackbar.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-user-registration",
  templateUrl: "./user-registration.component.html",
  styleUrls: ["./user-registration.component.scss"],
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatButton,
    RouterLink,
    MatCardContent,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatError,
    MatIcon,
    MatSuffix,
    MatRadioGroup,
    MatRadioButton,
    MatCardActions,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserRegistrationComponent implements OnDestroy {
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);
  private readonly snackBarService = inject(SnackbarService);
  private readonly customValidation = inject(CustomValidationService);
  private readonly formBuilder = inject(NonNullableFormBuilder);

  showPassword = true;
  showConfirmPassword = true;
  private destroyed$ = new ReplaySubject<void>(1);

  registrationForm = this.formBuilder.group(
    {
      firstname: new FormControl("", Validators.required),
      lastname: new FormControl("", Validators.required),
      username: new FormControl(
        "",
        [Validators.required],
        this.customValidation.userNameValidator.bind(this.customValidation)
      ),
      password: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          this.customValidation.patternValidator(),
        ])
      ),
      confirmPassword: new FormControl("", [Validators.required]),
      gender: new FormControl("", Validators.required),
    },
    {
      validators: [
        this.customValidation.matchPassword("password", "confirmPassword"),
      ],
    }
  );

  protected get registrationFormControl() {
    return this.registrationForm.controls;
  }

  registerUser() {
    if (this.registrationForm.valid) {
      this.userService
        .registerUser(this.registrationForm.value)
        .pipe(takeUntil(this.destroyed$))
        .subscribe({
          next: () => {
            this.router.navigate(["/login"]);
          },
          error: (error) => {
            this.snackBarService.showSnackBar("Error occurred!! Try again");
            console.log("Error ocurred while adding book data : ", error);
          },
        });
    }
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
