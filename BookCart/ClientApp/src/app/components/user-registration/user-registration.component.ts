import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import {
  FormControl,
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
import {
  MatError,
  MatFormField,
  MatLabel,
  MatSuffix,
} from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatInput } from "@angular/material/input";
import { MatRadioButton, MatRadioGroup } from "@angular/material/radio";
import { RouterLink } from "@angular/router";
import { Store } from "@ngrx/store";
import { UserRegistration } from "src/app/models/userRegistration";
import { UserRegistrationForm } from "src/app/models/userRegistrationForm";
import { CustomValidationService } from "src/app/services/custom-validation.service";
import { register } from "src/app/state/actions/auth.actions";

@Component({
    selector: "app-user-registration",
    templateUrl: "./user-registration.component.html",
    styleUrls: ["./user-registration.component.scss"],
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
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserRegistrationComponent {
  private readonly customValidation = inject(CustomValidationService);
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly store = inject(Store);

  showPassword = true;
  showConfirmPassword = true;

  registrationForm: FormGroup<UserRegistrationForm> = this.formBuilder.group(
    {
      firstName: new FormControl("", Validators.required),
      lastName: new FormControl("", Validators.required),
      userName: new FormControl(
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

  registerUser(): void {
    if (this.registrationForm.valid) {
      this.store.dispatch(
        register({
          userdetails: this.registrationForm.value as UserRegistration,
        })
      );
    }
  }
}
