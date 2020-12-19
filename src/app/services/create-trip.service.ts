import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Trip} from 'src/app/models/trip';

@Injectable({
  providedIn: 'root'
})
export class CreateTripService {
  addTripUrl = 'https://api.traversepakistan.com/api/traverse/trip/';

  constructor(private httpClient: HttpClient) { }

  postTrip(trip: Trip) {
    return this.httpClient.post(this.addTripUrl, trip);
  }
}
