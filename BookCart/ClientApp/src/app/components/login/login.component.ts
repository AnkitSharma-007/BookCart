import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from "@angular/core";
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import {
  MatError,
  MatFormField,
  MatLabel,
  MatSuffix,
} from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatInput } from "@angular/material/input";
import { RouterLink } from "@angular/router";
import { map } from "rxjs/operators";
import { AsyncPipe } from "@angular/common";
import { MatButton } from "@angular/material/button";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from "@angular/material/card";
import { Store } from "@ngrx/store";
import { LoginForm } from "src/app/models/loginForm";
import { UserLogin } from "src/app/models/userLogin";
import { login, resetLoginFormError } from "src/app/state/actions/auth.actions";
import { selectLoginError } from "src/app/state/selectors/auth.selectors";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
    imports: [
        MatCard,
        MatCardHeader,
        MatCardTitle,
        MatButton,
        RouterLink,
        MatCardSubtitle,
        MatError,
        MatCardContent,
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatInput,
        MatIcon,
        MatSuffix,
        MatCardActions,
        AsyncPipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly formBuilder = inject(NonNullableFormBuilder);

  protected loginForm: FormGroup<LoginForm> = this.formBuilder.group({
    username: this.formBuilder.control("", Validators.required),
    password: this.formBuilder.control("", Validators.required),
  });
  showPassword = false;

  error$ = this.store.select(selectLoginError).pipe(
    map((error) => {
      if (error?.includes("Unauthorized")) {
        this.loginForm.reset();
        this.loginForm.setErrors({ invalidCredentials: true });
      }
      return error;
    })
  );

  ngOnInit(): void {
    this.store.dispatch(resetLoginFormError());
  }

  protected get loginFormControl() {
    return this.loginForm.controls;
  }

  login() {
    if (this.loginForm.valid) {
      this.store.dispatch(
        login({
          loginCredentials: this.loginForm.value as UserLogin,
        })
      );
    }
  }
}
