import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MinifiedTrip} from 'src/app/models/minified-trip';
import {TripsService} from 'src/app/services/trips.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss']
})
export class TripsComponent implements OnInit {
  minifiedTrips: MinifiedTrip[];

  constructor(private route: ActivatedRoute, private tripsService: TripsService, private router: Router) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.minifiedTrips = data.trips;
    });
  }

  updateTrip(slug: string, id) {
    this.tripsService.getTrip(slug).subscribe(tripData => {
      this.tripsService.getTripBasedServices(id).subscribe(tripServices => {
        this.router.navigate(['/add-trip'], {state: {tripData, tripServices}}).then();
      });
    });
  }

  removeTrip(slug: string) {
    this.tripsService.deleteTrip(slug).subscribe();
  }
}
