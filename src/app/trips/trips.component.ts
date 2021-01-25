import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {forkJoin} from 'rxjs';
import {AlertDialogComponent} from 'src/app/alert-dialog/alert-dialog.component';
import {MinifiedTrip} from 'src/app/models/minified-trip';
import {TripsService} from 'src/app/services/trips.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss']
})
export class TripsComponent implements OnInit {
  minifiedTrips: MinifiedTrip[];

  constructor(private route: ActivatedRoute, private tripsService: TripsService,
              private router: Router, private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.minifiedTrips = data.trips;
    });
  }

  fetchTrip(slug: string, id: string, isEditMode: boolean) {
    this.tripsService.getTrip(slug).subscribe(tripData => {
      this.tripsService.getTripBasedServices(id).subscribe(tripServices => {
        this.router.navigate(['/add-trip'], {state: {isEdit: isEditMode, tripData, tripServices}}).then();
      });
    });
  }

  openDeleteDialog(slug: string) {
    this.matDialog.open(AlertDialogComponent, {data: {slug}});
  }
}
