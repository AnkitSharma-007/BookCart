import { enableProdMode, importProvidersFrom } from "@angular/core";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { BrowserModule, bootstrapApplication } from "@angular/platform-browser";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter, withInMemoryScrolling } from "@angular/router";
import { AppComponent } from "./app/app.component";
import { APP_ROUTES } from "./app/app.routes";
import { ErrorInterceptorService } from "./app/interceptors/error-interceptor.service";
import { HttpInterceptorService } from "./app/interceptors/http-interceptor.service";
import { environment } from "./environments/environment";

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule),
    provideHttpClient(
      withInterceptors([HttpInterceptorService, ErrorInterceptorService])
    ),
    provideAnimations(),
    provideRouter(
      APP_ROUTES,
      withInMemoryScrolling({
        scrollPositionRestoration: "top",
      })
    ),
  ],
}).catch((err) => console.error(err));
