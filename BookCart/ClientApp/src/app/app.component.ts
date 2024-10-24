import { Component } from "@angular/core";
import { AuthenticationService } from "./services/authentication.service";
import { RouterOutlet } from "@angular/router";
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: true,
  imports: [NavBarComponent, RouterOutlet],
})
export class AppComponent {
  constructor(private authService: AuthenticationService) {
    if (!localStorage.getItem("authToken")) {
      this.authService.setTempUserId();
    }
    this.authService.setUserDetails();
  }
}
