import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app/app-routing.module';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ErrorInterceptorService } from './app/interceptors/error-interceptor.service';
import { HttpInterceptorService } from './app/interceptors/http-interceptor.service';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(CommonModule, BrowserModule, ReactiveFormsModule, FormsModule, AppRoutingModule),
        provideHttpClient(withInterceptors([HttpInterceptorService, ErrorInterceptorService])),
        provideAnimations(),
    ]
})
  .catch(err => console.error(err));
