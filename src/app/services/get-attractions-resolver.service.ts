import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Attraction} from 'src/app/models/attraction';
import {GetAttractionsService} from 'src/app/services/get-attractions.service';

@Injectable({
  providedIn: 'root'
})
export class GetAttractionsResolverService implements Resolve<Attraction> {

  constructor(private getAttractionsService: GetAttractionsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Attraction> | Promise<Attraction> | Attraction {
    return this.getAttractionsService.fetchAttractions();
  }
}
