import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Trip} from 'src/app/models/trip';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TripsService {
  tripUrl = `${environment.baseUrl}traverse/trip/`;
  servicesUrl = `${environment.baseUrl}traverse/service/value/trip/?trip=`;
  deleteGalleyImageUrl = `${environment.baseUrl}traverse/gallery/image/`;

  constructor(private httpClient: HttpClient) { }

  postTrip(trip: Trip) {
    return this.httpClient.post(this.tripUrl, trip);
  }

  getTrip(slug: string) {
    return this.httpClient.get(this.tripUrl + slug);
  }

  getTripBasedServices(id) {
    return this.httpClient.get(this.servicesUrl + id);
  }

  updateTrip(slug: string, updatedTrip: Trip) {
    return this.httpClient.patch(this.tripUrl + slug + '/', updatedTrip);
  }

  deleteTrip(slug) {
    return this.httpClient.delete(this.tripUrl);
  }

  deleteGalleryImage(id) {
    return this.httpClient.delete(this.deleteGalleyImageUrl + id);
  }
}
