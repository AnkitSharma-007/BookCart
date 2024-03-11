import { Component, OnDestroy } from "@angular/core";
import { Validators, FormBuilder } from "@angular/forms";
import { UserService } from "src/app/services/user.service";
import { CustomValidationService } from "src/app/services/custom-validation.service";
import { Router } from "@angular/router";
import { SnackbarService } from "src/app/services/snackbar.service";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-user-registration",
  templateUrl: "./user-registration.component.html",
  styleUrls: ["./user-registration.component.scss"],
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
