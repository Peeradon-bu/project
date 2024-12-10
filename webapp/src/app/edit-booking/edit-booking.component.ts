import { Component, OnInit, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingFormComponent } from '../booking-form/booking-form.component';
import { Booking } from '../booking';
import { BookingService } from '../booking.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-edit-booking',
  standalone: true,
  imports: [BookingFormComponent, MatCardModule],
  template: `
    <mat-card class="edit-booking-card">
      <mat-card-header>
        <mat-card-title>Edit Booking</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <app-booking-form
            [initialState]="booking()"
            (formSubmitted)="editBooking($event)"
        ></app-booking-form>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      .edit-booking-card {
        width: 100%;
        max-width: 600px;
        margin: 30px auto;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        background-color: #f9f9f9;
      }

      mat-card-header {
        background-color: #6200ea;
        color: white;
        padding: 16px;
        border-top-left-radius: 12px;
        border-top-right-radius: 12px;
      }

      mat-card-title {
        font-size: 24px;
        font-weight: bold;
        text-align: center;
      }

      mat-card-content {
        padding: 20px;
      }

      .mat-card-content {
        background-color: #ffffff;
        border-radius: 8px;
      }

      mat-card {
        transition: all 0.3s ease;
      }

      mat-card:hover {
        box-shadow: 0 12px 36px rgba(0, 0, 0, 0.2);
        transform: translateY(-4px);
      }

      @media (max-width: 600px) {
        .edit-booking-card {
          margin: 20px;
          padding: 1rem;
        }
      }
    `,
  ],
})
export class EditBookingComponent implements OnInit {
  booking = {} as WritableSignal<Booking>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bookingService: BookingService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      alert('No id provided');
    }

    this.bookingService.getBooking(id!);
    this.booking = this.bookingService.booking$;
  }

  editBooking(booking: Booking) {
    this.bookingService
      .updateBooking(this.booking()._id || '', booking)
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          alert('Failed to update booking');
          console.error(error);
        },
      });
  }
}
