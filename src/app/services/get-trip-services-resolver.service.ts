import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {TripService} from 'src/app/models/trip';
import {GetTripServicesService} from 'src/app/services/get-trip-services.service';

@Injectable({
  providedIn: 'root'
})
export class GetTripServicesResolverService implements Resolve<TripService> {

  constructor(private getTripServices: GetTripServicesService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TripService> | Promise<TripService> | TripService {
    return this.getTripServices.getTripServices();
  }
}
