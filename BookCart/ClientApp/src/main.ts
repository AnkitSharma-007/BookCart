import { enableProdMode, importProvidersFrom, isDevMode } from "@angular/core";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { BrowserModule, bootstrapApplication } from "@angular/platform-browser";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter, withInMemoryScrolling } from "@angular/router";
import { AppComponent } from "./app/app.component";
import { APP_ROUTES } from "./app/app.routes";
import { ErrorInterceptorService } from "./app/interceptors/error-interceptor.service";
import { HttpInterceptorService } from "./app/interceptors/http-interceptor.service";
import { environment } from "./environments/environment";
import { provideState, provideStore } from "@ngrx/store";
import { provideEffects } from "@ngrx/effects";
import { provideRouterStore } from "@ngrx/router-store";
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { CategoriesEffects } from "./app/state/effects/categories.effects";
import {
  CATEGORIES_FEATURE_KEY,
  categoryReducer,
} from "./app/state/reducers/categories.reducers";

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
    provideStore(),
    provideEffects(CategoriesEffects),
    provideState({ name: CATEGORIES_FEATURE_KEY, reducer: categoryReducer }),
    provideRouterStore(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
}).catch((err) => console.error(err));
