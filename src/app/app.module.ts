import { LoggedInGuard, NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [LoggedInGuard] },
  { path: 'login', component: LoginComponent },
];
@NgModule({
  declarations: [AppComponent, LoginComponent, HomeComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'fr-FR',
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) =>
          new TranslateHttpLoader(http, '/assets/i18n/', '.json'),
        deps: [HttpClient],
      },
    }),
    RouterModule.forRoot(routes),
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    NgxAuthFirebaseUIModule.forRoot(
      environment.firebaseConfig,
      () => undefined,
      {
        toastMessageOnAuthSuccess: false,
        authGuardFallbackURL: 'login',
        authGuardLoggedInURL: 'login',
        enableFirestoreSync: true,
        enableEmailVerification: true,
        guardProtectedRoutesUntilEmailIsVerified: true,
      }
    ),
    FlexLayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
