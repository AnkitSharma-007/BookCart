import { Component, OnDestroy } from "@angular/core";
import { Validators, FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { UserService } from "src/app/services/user.service";
import { CustomValidationService } from "src/app/services/custom-validation.service";
import { Router, RouterLink } from "@angular/router";
import { SnackbarService } from "src/app/services/snackbar.service";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { MatRadioGroup, MatRadioButton } from "@angular/material/radio";
import { MatIcon } from "@angular/material/icon";
import { NgIf } from "@angular/common";
import { MatInput } from "@angular/material/input";
import { MatFormField, MatLabel, MatError, MatSuffix } from "@angular/material/form-field";
import { MatButton } from "@angular/material/button";
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardActions } from "@angular/material/card";

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
        NgIf,
        MatError,
        MatIcon,
        MatSuffix,
        MatRadioGroup,
        MatRadioButton,
        MatCardActions,
    ],
})
export class UserRegistrationComponent implements OnDestroy {
  showPassword = true;
  showConfirmPassword = true;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
    private snackBarService: SnackbarService,
    private customValidation: CustomValidationService
  ) {}

  registrationForm = this.fb.group(
    {
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      username: [
        "",
        [Validators.required],
        this.customValidation.userNameValidator.bind(this.customValidation),
      ],
      password: [
        "",
        Validators.compose([
          Validators.required,
          this.customValidation.patternValidator(),
        ]),
      ],
      confirmPassword: ["", [Validators.required]],
      gender: ["", Validators.required],
    },
    {
      validator: this.customValidation.confirmPasswordValidator,
    }
  );

  protected get registrationFormControl() {
    return this.registrationForm.controls;
  }

  registerUser() {
    if (this.registrationForm.valid) {
      this.userService
        .registerUser(this.registrationForm.value)
        .pipe(takeUntil(this.unsubscribe$))
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
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
