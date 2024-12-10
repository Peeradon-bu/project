import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookingFormComponent } from '../booking-form/booking-form.component';
import { Booking } from '../booking';
import { BookingService } from '../booking.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-add-booking',
  standalone: true,
  imports: [BookingFormComponent, MatCardModule],
  template: `
    <mat-card class="add-booking-card">
      <mat-card-header>
        <mat-card-title>Add a New Booking</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <app-booking-form (formSubmitted)="addBooking($event)"></app-booking-form>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      .add-booking-card {
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
        .add-booking-card {
          margin: 20px;
          padding: 1rem;
        }
      }
    `,
  ],
})
export class AddBookingComponent {
  constructor(
    private router: Router,
    private bookingService: BookingService
  ) {}

  addBooking(booking: Booking) {
    this.bookingService.createBooking(booking).subscribe({
      next: () => {
        this.router.navigate(['/bookings']);
      },
      error: (error) => {
        alert('Failed to create booking');
        console.error(error);
      },
    });
    this.bookingService.getBookings();
  }
}
