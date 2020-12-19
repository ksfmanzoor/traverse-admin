import {formatDate} from '@angular/common';
import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MatSelect} from '@angular/material/select';
import {ActivatedRoute} from '@angular/router';
import {ReplaySubject} from 'rxjs';
import {Attraction} from 'src/app/models/attraction';
import {Departure, ItineraryDay, Package, Trip, TripService, TripServiceValue} from 'src/app/models/trip';
import {CreateTripService} from 'src/app/services/create-trip.service';
import { v4 as uuid4 } from 'uuid';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.scss']
})
export class AddTripComponent implements OnInit {
  addTripForm: FormGroup;
  title = 'traverse-admin';
  panelOpenState = false;
  groupList: string[] = ['pre', 'common', 'post'];
  availableLocations = [
    {value: 'Islamabad', viewValue: 'Islamabad'},
    {value: 'Lahore', viewValue: 'Lahore'},
    {value: 'Karachi', viewValue: 'Karachi'}
  ];
  allAttractions: Attraction[] = [];
  allTripServices: TripService[] = [];

  packagesList: Package[] = [];
  departuresList: Departure[] = [];
  tripServicesList: TripServiceValue[] = [];
  itineraryDaysList: ItineraryDay[] = [];

  packageIndex: number;
  departureIndex: number;
  serviceIndex: number;
  itineraryIndex: number;

  isPackageEditMode = false;
  isDepartureEditMode = false;
  isServiceEditMode = false;
  isItineraryEditMode = false;


  attractionsMultiFilterCtrl: FormControl = new FormControl();
  filteredAttractions: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

  @ViewChild('multiSelect', {static: true}) multiSelect: MatSelect;
  private images = [];

  constructor(private route: ActivatedRoute, private createTripService: CreateTripService, private datePipe: DatePipe) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.allAttractions = data.attractions;
      this.allTripServices = data.tripServices;
    });
    this.addTripForm = new FormGroup({
        tripTitle: new FormControl(''),
        slug: new FormControl(''),
        overview: new FormControl(''),
        attractions: new FormControl(),
        packageTitle: new FormControl(''),
        packagePrice: new FormControl(''),
        packageStandard: new FormControl(false),
        departureLocation: new FormControl(''),
        departureVia: new FormControl(''),
        departurePrice: new FormControl(''),
        departureDate: new FormControl(''),
        departureTime: new FormControl(''),
        arrivalDate: new FormControl(''),
        arrivalTime: new FormControl(''),
        departureStandard: new FormControl(false),
        serviceType: new FormControl(''),
        serviceValue: new FormControl(''),
        servicePackages: new FormControl(''),
        itineraryDate: new FormControl(''),
        itineraryGroup: new FormControl(''),
        itineraryDepartures: new FormControl(''),
        itineraryBody: new FormControl(''),
        itineraryServices: new FormControl(''),
        galleryImages: new FormControl(''),
      }
    );

    this.filteredAttractions.next(this.allAttractions.slice());

    this.attractionsMultiFilterCtrl.valueChanges
      .pipe()
      .subscribe(() => {
        this.filterAttractions();
      });
  }

  get formControl() {
    return this.addTripForm.controls;
  }

  filterAttractions() {
    if (!this.allAttractions) {
      return;
    }
    let search = this.attractionsMultiFilterCtrl.value;
    if (!search) {
      this.filteredAttractions.next(this.allAttractions.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredAttractions.next(
      this.allAttractions.filter(attraction => attraction.title.toLowerCase().indexOf(search) > -1)
    );
  }

  addPackage() {
    const pack: Package = {
      id: uuid4(),
      title: this.formControl.packageTitle.value,
      price_per_person: this.formControl.packagePrice.value,
      is_standard: this.formControl.packageStandard.value
    };
    if (this.isPackageEditMode) {
      this.packagesList[this.packageIndex] = pack;
      this.isPackageEditMode = !this.isPackageEditMode;
    } else {
      this.packagesList.push(pack);
    }
    this.formControl.packageTitle.setValue('');
    this.formControl.packagePrice.setValue('');
    this.formControl.packageStandard.setValue(false);
  }

  updatePackage(packageInfo: Package, index: number) {
    this.formControl.packageTitle.setValue(packageInfo.title);
    this.formControl.packagePrice.setValue(packageInfo.price_per_person);
    this.formControl.packageStandard.setValue(packageInfo.is_standard);
    this.packageIndex = index;
    this.isPackageEditMode = !this.isPackageEditMode;
  }

  deletePackage(index: number) {
    this.packagesList.splice(index, 1);
  }

  addDeparture() {
    const departure: Departure = {
      id: uuid4(),
      location: this.formControl.departureLocation.value,
      via: this.formControl.departureVia.value,
      price_per_person: this.formControl.departurePrice.value,
      departure_date: this.dateAndTimeCombiner(this.formControl.departureDate.value.toString(),
        this.formControl.departureTime.value).toISOString(),
      arrival_date: this.dateAndTimeCombiner(this.formControl.arrivalDate.value.toString(),
        this.formControl.arrivalTime.value).toISOString(),
      is_standard: this.formControl.departureStandard.value
    };
    if (this.isDepartureEditMode) {
      this.departuresList[this.departureIndex] = departure;
      this.isDepartureEditMode = !this.isDepartureEditMode;
    } else {
      this.departuresList.push(departure);
    }
    this.formControl.departureLocation.setValue('');
    this.formControl.departureVia.setValue('');
    this.formControl.departurePrice.setValue('');
    this.formControl.departureDate.setValue('');
    this.formControl.departureTime.setValue('');
    this.formControl.arrivalDate.setValue('');
    this.formControl.arrivalTime.setValue('');
    this.formControl.departureStandard.setValue(false);
  }

  updateDeparture(departure: Departure, index: number) {
    this.formControl.departureLocation.setValue(departure.location);
    this.formControl.departureVia.setValue(departure.via);
    this.formControl.departurePrice.setValue(departure.price_per_person);
    this.formControl.departureDate.setValue(new Date(departure.departure_date));
    this.formControl.departureTime.setValue(formatDate(departure.departure_date, 'hh:mm a', 'en'));
    this.formControl.arrivalDate.setValue(new Date(departure.arrival_date));
    this.formControl.arrivalTime.setValue(formatDate(departure.arrival_date, 'hh:mm a', 'en'));
    this.formControl.departureStandard.setValue(departure.is_standard);
    this.departureIndex = index;
    this.isDepartureEditMode = !this.isDepartureEditMode;
  }

  deleteDeparture(index: number) {
    this.departuresList.splice(index, 1);

  }

  addTripService() {
    const service: TripServiceValue = {
      trip_service: this.formControl.serviceType.value,
      value: this.formControl.serviceValue.value,
      packages: this.formControl.servicePackages.value.map((ele: Package) => (ele.id)),
    };
    if (this.isServiceEditMode) {
      this.tripServicesList[this.serviceIndex] = service;
      this.isServiceEditMode = !this.isServiceEditMode;
    } else {
      this.tripServicesList.push(service);
    }
    this.formControl.serviceType.setValue('');
    this.formControl.serviceValue.setValue('');
    this.formControl.servicePackages.setValue('');
  }

  deleteServiceValue(index: number) {
    this.tripServicesList.splice(index, 1);
  }

  updateTripService(service: TripServiceValue, index: number) {
    this.formControl.serviceType.setValue(service.trip_service);
    this.formControl.serviceValue.setValue(service.value);
    this.formControl.servicePackages.setValue(service.packages);
    this.serviceIndex = index;
    this.isServiceEditMode = !this.isServiceEditMode;
  }

  addItineraryDay() {
    const itineraryDay: ItineraryDay = {
      date: this.datePipe.transform(this.formControl.itineraryDate.value, 'yyyy-MM-dd'),
      group: this.formControl.itineraryGroup.value,
      body: this.formControl.itineraryBody.value,
      departures: this.formControl.itineraryDepartures.value.map((ele: Departure) => (ele.id)),
      trip_service_values: this.formControl.itineraryServices.value,
    };
    if (this.isItineraryEditMode) {
      this.itineraryDaysList[this.itineraryIndex] = itineraryDay;
      this.isItineraryEditMode = !this.isItineraryEditMode;
    } else {
      this.itineraryDaysList.push(itineraryDay);
    }
    this.formControl.itineraryDate.setValue('');
    this.formControl.itineraryGroup.setValue('');
    this.formControl.itineraryBody.setValue('');
    this.formControl.itineraryDepartures.setValue('');
    this.formControl.itineraryServices.setValue('');
  }

  updateItineraryDay(itineraryDay: ItineraryDay, index: number) {
    this.formControl.itineraryDate.setValue(itineraryDay.date);
    this.formControl.itineraryGroup.setValue(itineraryDay.group);
    this.formControl.itineraryBody.setValue(itineraryDay.body);
    this.formControl.itineraryDepartures.setValue(itineraryDay.departures);
    this.formControl.itineraryServices.setValue(itineraryDay.trip_service_values);
    this.itineraryIndex = index;
    this.isItineraryEditMode = !this.isItineraryEditMode;
  }

  deleteItineraryDay(index: number) {
    this.itineraryDaysList.splice(index, 1);
  }


  onFileChange(event) {
    for  (let i =  0; i <  event.target.files.length; i++)  {
      this.images.push(event.target.files[i]);
    }
    console.log(this.images);
    const formData =  new  FormData();
    for  (let i =  0; i <  this.images.length; i++)  {
      formData.append('image',  this.images[i]);
    }
    this.addTripForm.patchValue({
      galleryImages: formData
    });
  }

  dateAndTimeCombiner(date, time): Date {
    const t1: any = time.split(' ');
    const t2: any = t1[0].split(':');
    t2[0] = (t1[1] === 'PM' ? (1 * t2[0] + 12) : t2[0]);
    const time24 = (t2[0] < 10 ? '0' + t2[0] : t2[0]) + ':' + t2[1];
    const completeDate = date.replace('00:00', time24.toString());
    return new Date(completeDate);
  }

  addTrip() {
    const trip: Trip = {
      title: this.formControl.tripTitle.value,
      slug: this.formControl.slug.value,
      overview: this.formControl.overview.value,
      attractions: this.formControl.attractions.value,
      packages: this.packagesList,
      departures: this.departuresList,
      itinerary_days: this.itineraryDaysList,
      gallery_images: this.formControl.galleryImages.value
    };
    this.createTripService.postTrip(trip).subscribe(data => {
      console.log(data);
    });
  }
}
