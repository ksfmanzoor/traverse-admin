import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {TripsService} from 'src/app/services/trips.service';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss']
})
export class AlertDialogComponent implements OnInit {

  constructor(private tripsService: TripsService, private router: Router, @Inject(MAT_DIALOG_DATA) private delInfo: { slug: string },
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  removeTrip() {
    this.tripsService.deleteTrip(this.delInfo.slug).subscribe(() => {
      this.snackBar.open('Trip deleted successfully');
      this.router.navigateByUrl('/trips').then();
    }, error => {
      this.snackBar.open(error);
    });
  }


}
