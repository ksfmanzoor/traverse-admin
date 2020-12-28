import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetAttractionsService {
  attractionsUrl = `${environment.baseUrl}traverse/attraction/?admin=true`;
  constructor(private httpClient: HttpClient) { }

  fetchAttractions(): Observable<any> {
    return this.httpClient.get(this.attractionsUrl);
  }
}
