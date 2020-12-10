import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetTripServicesService {
  tripServiceUrl = 'https://api.traversepakistan.com/api/traverse/service/trip/';

  constructor(private httpClient: HttpClient) { }

  getTripServices(): Observable<any> {
    return this.httpClient.get(this.tripServiceUrl);
  }
}
