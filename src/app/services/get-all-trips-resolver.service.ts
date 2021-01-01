import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {MinifiedTrip} from 'src/app/models/minified-trip';
import {GetAllTripsService} from 'src/app/services/get-all-trips.service';

@Injectable({
  providedIn: 'root'
})
export class GetAllTripsResolverService implements Resolve<MinifiedTrip> {

  constructor(private getAllTripsService: GetAllTripsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MinifiedTrip> | Promise<MinifiedTrip> | MinifiedTrip {
    return this.getAllTripsService.fetchAllTrips();
  }

}
