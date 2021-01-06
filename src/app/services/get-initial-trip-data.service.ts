import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {forkJoin} from 'rxjs';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetInitialTripDataService {
  allTripServicesUrl = `${environment.baseUrl}traverse/service/trip/`;
  attractionsUrl = `${environment.baseUrl}traverse/attraction/?admin=true`;

  constructor(private httpClient: HttpClient) { }

  fetchInitialTripData() {
    const allAttractions = this.httpClient.get(this.attractionsUrl);
    const allTripServices = this.httpClient.get(this.allTripServicesUrl);
    return forkJoin([allAttractions, allTripServices]);
  }
}
