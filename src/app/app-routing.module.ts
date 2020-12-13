import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddTripComponent} from 'src/app/add-trip/add-trip.component';
import {HomepageComponent} from 'src/app/homepage/homepage.component';
import {GetAttractionsResolverService} from 'src/app/services/get-attractions-resolver.service';
import {GetTripServicesResolverService} from 'src/app/services/get-trip-services-resolver.service';


const routes: Routes = [
  {
    path: '', component: HomepageComponent,
  },
  {
    path: 'add-trip',
    component: AddTripComponent,
    resolve: {attractions: GetAttractionsResolverService, tripServices: GetTripServicesResolverService}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
