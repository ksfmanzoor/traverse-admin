import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddTripComponent} from 'src/app/add-trip/add-trip.component';
import {HomepageComponent} from 'src/app/homepage/homepage.component';
import {GetAllTripsResolverService} from 'src/app/services/get-all-trips-resolver.service';
import {GetAttractionsResolverService} from 'src/app/services/get-attractions-resolver.service';
import {GetTripServicesResolverService} from 'src/app/services/get-trip-services-resolver.service';
import {AuthGuard} from 'src/app/services/guards/auth.guard';
import {SignInComponent} from 'src/app/sign-in/sign-in.component';
import {TripsComponent} from 'src/app/trips/trips.component';


const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'login', component: SignInComponent
  },
  {
    path: 'home', component: HomepageComponent, canActivate: [AuthGuard]
  },
  {
    path: 'trips', component: TripsComponent, canActivate: [AuthGuard], resolve: {trips: GetAllTripsResolverService}
  },
  {
    path: 'add-trip',
    component: AddTripComponent,
    resolve: {attractions: GetAttractionsResolverService, tripServices: GetTripServicesResolverService},
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
