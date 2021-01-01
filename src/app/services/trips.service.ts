import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Trip} from 'src/app/models/trip';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TripsService {
  tripUrl = `${environment.baseUrl}traverse/trip/`;

  constructor(private httpClient: HttpClient) { }

  postTrip(trip: Trip) {
    return this.httpClient.post(this.tripUrl, trip);
  }

  getTrip(slug: string) {
    return this.httpClient.get(this.tripUrl + slug);
  }

  deleteTrip(slug) {
    return this.httpClient.delete(this.tripUrl);
  }
}
