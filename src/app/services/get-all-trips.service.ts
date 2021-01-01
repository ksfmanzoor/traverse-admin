import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {MinifiedTrip} from 'src/app/models/minified-trip';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetAllTripsService {
  allTripsUrl = `${environment.baseUrl}traverse/trip/`;

  constructor(private httpClient: HttpClient) { }

  fetchAllTrips(): Observable<MinifiedTrip> {
    return this.httpClient.get<MinifiedTrip>(this.allTripsUrl);
  }
}
