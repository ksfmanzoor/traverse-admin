import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Trip} from 'src/app/models/trip';

@Injectable({
  providedIn: 'root'
})
export class CreateTripService {
  addTripUrl = 'http://127.0.0.1:8000/api/traverse/trip/';

  constructor(private httpClient: HttpClient) { }

  postTrip(trip: Trip) {
    return this.httpClient.post(this.addTripUrl, trip);
  }
}
