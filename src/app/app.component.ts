import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MatSelect} from '@angular/material/select';
import {ReplaySubject} from 'rxjs';
import {Departure, Package} from 'src/app/models/trip';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  addTripForm: FormGroup;
  title = 'traverse-admin';
  panelOpenState = false;
  groupList: string[] = ['pre', 'common', 'post'];
  availableLocations = [
    {value: 'Islamabad', viewValue: 'Islamabad'},
    {value: 'Lahore', viewValue: 'Lahore'},
    {value: 'Karachi', viewValue: 'Karachi'}
  ];

  packagesList: Package[] = [];
  departuresList: Departure[] = [];
  isEditMode = false;

  availableAttractions = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];

  selectedAttractions = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
  ];

  allAttractions = [
    {name: 'Bank A (Switzerland)', id: 'A'},
    {name: 'Bank B (Switzerland)', id: 'B'},
    {name: 'Bank C (France)', id: 'C'},
    {name: 'Bank D (France)', id: 'D'},
    {name: 'Bank E (France)', id: 'E'},
    {name: 'Bank F (Italy)', id: 'F'},
    {name: 'Bank G (Italy)', id: 'G'},
    {name: 'Bank H (Italy)', id: 'H'},
    {name: 'Bank I (Italy)', id: 'I'},
    {name: 'Bank J (Italy)', id: 'J'},
    {name: 'Bank Kolombia (United States of America)', id: 'K'},
    {name: 'Bank L (Germany)', id: 'L'},
    {name: 'Bank M (Germany)', id: 'M'},
    {name: 'Bank N (Germany)', id: 'N'},
    {name: 'Bank O (Germany)', id: 'O'},
    {name: 'Bank P (Germany)', id: 'P'},
    {name: 'Bank Q (Germany)', id: 'Q'},
    {name: 'Bank R (Germany)', id: 'R'}];

  bankMultiFilterCtrl: FormControl = new FormControl();
  filteredBanksMulti: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

  @ViewChild('multiSelect', {static: true}) multiSelect: MatSelect;


  ngOnInit() {
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
        itineraryDate: new FormControl(''),
        itineraryGroup: new FormControl(''),
        itineraryDepartures: new FormControl(''),
        itineraryBody: new FormControl(''),
        itineraryServiceType: new FormControl(''),
        itineraryServiceValue: new FormControl(''),
        itineraryPackages: new FormControl(''),
      }
    );
    // load the initial bank list
    this.filteredBanksMulti.next(this.allAttractions.slice());

    // listen for search field value changes
    this.bankMultiFilterCtrl.valueChanges
      .pipe()
      .subscribe(() => {
        this.filterBanksMulti();
      });
  }

  get formControl() {
    return this.addTripForm.controls;
  }

  filterBanksMulti() {
    if (!this.allAttractions) {
      return;
    }
    let search = this.bankMultiFilterCtrl.value;
    if (!search) {
      this.filteredBanksMulti.next(this.allAttractions.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredBanksMulti.next(
      this.allAttractions.filter(bank => bank.name.toLowerCase().indexOf(search) > -1)
    );
  }

  addPackage() {
    this.packagesList.push({
      title: this.formControl.packageTitle.value,
      price_per_person: this.formControl.packagePrice.value,
      is_standard: this.formControl.packageStandard.value
    });
    this.formControl.packageTitle.setValue('');
    this.formControl.packagePrice.setValue('');
    this.formControl.packageStandard.setValue(false);

  }

  updatePackage(packageInfo: Package) {
    this.formControl.packageTitle.setValue(packageInfo.title);
    this.formControl.packagePrice.setValue(packageInfo.price_per_person);
    this.formControl.packageStandard.setValue(packageInfo.is_standard);
  }

  deletePackage(title) {
    const index = this.packagesList.findIndex(obj => obj.title === title);
    if (index > -1) {
      this.packagesList.splice(index, 1);
    }
  }

  addDeparture() {
    this.departuresList.push({
      location: this.formControl.departureLocation.value,
      via: this.formControl.departureVia.value,
      price_per_person: this.formControl.departurePrice.value,
      departure_date: this.formControl.departureDate.value,
      arrival_date: this.formControl.arrivalDate.value,
      is_standard: this.formControl.departureStandard.value
    });
    this.formControl.departureLocation.setValue('');
    this.formControl.departureVia.setValue('');
    this.formControl.departurePrice.setValue('');
    this.formControl.departureDate.setValue('');
    this.formControl.arrivalDate.setValue('');
    this.formControl.departureStandard.setValue(false);
  }

  addTrip() {
    console.log(this.addTripForm.value);
    console.log(this.packagesList);
    console.log(this.departuresList);
  }

}
