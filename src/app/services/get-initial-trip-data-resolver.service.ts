import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {GetInitialTripDataService} from 'src/app/services/get-initial-trip-data.service';

@Injectable({
  providedIn: 'root'
})
export class GetInitialTripDataResolverService implements Resolve<any> {

  constructor(private getInitialTripDataResolverService: GetInitialTripDataService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.getInitialTripDataResolverService.fetchInitialTripData();
  }

}
