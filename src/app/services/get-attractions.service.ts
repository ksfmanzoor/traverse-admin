import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Attraction} from 'src/app/models/attraction';

@Injectable({
  providedIn: 'root'
})
export class GetAttractionsService {
  attractionsUrl = 'https://api.traversepakistan.com/api/traverse/attraction/?admin=true';
  constructor(private httpClient: HttpClient) { }

  fetchAttractions(): Observable<any> {
    return this.httpClient.get(this.attractionsUrl);
  }
}
