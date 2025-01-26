import { Component, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Store } from "@ngrx/store";
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { loginSuccess } from "./state/actions/auth.actions";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
    imports: [NavBarComponent, RouterOutlet]
})
export class AppComponent {
  private readonly store = inject(Store);

  constructor() {
    this.store.dispatch(loginSuccess());
  }
}
