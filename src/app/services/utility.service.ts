import {Injectable} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Package, TripService, TripServiceValue} from 'src/app/models/trip';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  dateAndTimeCombiner(date, time): Date {
    const t1: any = time.split(' ');
    const t2: any = t1[0].split(':');
    t2[0] = (t1[1] === 'PM' ? (1 * t2[0] + 12) : t2[0]);
    const time24 = (t2[0] < 10 ? '0' + t2[0] : t2[0]) + ':' + t2[1];
    const completeDate = date.replace('00:00', time24.toString());
    return new Date(completeDate);
  }

  propertyRemover<T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> {
    const copy = {} as Pick<T, K>;
    keys.forEach(key => copy[key] = obj[key]);
    return copy;
  }

  packageNameFinder(packageList: Package[], id: string): string {
    return packageList.find(e => e.id === id).title;
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  filterUniqueTripServices(tripServicesList: TripServiceValue[]) {
    const uniqueTripServices: TripServiceValue[] = [];
    tripServicesList.forEach((e) => {
      const index = uniqueTripServices.findIndex(x => x.trip_service.id === e.trip_service.id && x.value === e.value);
      if (index <= -1) {
        uniqueTripServices.push({id: e.id, value: e.value, trip_service: e.trip_service, packages: e.packages});
      }
    });
    return uniqueTripServices;
  }
}
