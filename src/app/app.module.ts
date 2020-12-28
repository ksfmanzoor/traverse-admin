import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoadingBarHttpClientModule} from '@ngx-loading-bar/http-client';
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {AppRoutingModule} from 'src/app/app-routing.module';
import {AuthenticationInterceptorService} from 'src/app/services/authentication-interceptor.service';

import {AppComponent} from './app.component';
import {AddTripComponent} from './add-trip/add-trip.component';
import {HomepageComponent} from './homepage/homepage.component';
import {DatePipe} from '@angular/common';
import {SignInComponent} from './sign-in/sign-in.component';
import {TripsComponent} from './trips/trips.component';

@NgModule({
  declarations: [
    AppComponent,
    AddTripComponent,
    HomepageComponent,
    SignInComponent,
    TripsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    AppRoutingModule,
    HttpClientModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    NgxMatSelectSearchModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    NgxMaterialTimepickerModule,
    MatExpansionModule,
    ReactiveFormsModule,
    FormsModule,
    LoadingBarHttpClientModule
  ],
  providers: [DatePipe, {
    provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptorService, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
