import { Component, OnInit, WritableSignal } from '@angular/core';
import { Booking } from '../booking';
import { BookingService } from '../booking.service';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-bookings-list',
  standalone: true,
  imports: [RouterModule, MatTableModule, MatButtonModule, MatCardModule],
  providers: [DatePipe],
  styles: [
    `
      mat-card {
        margin: 20px;
        border-radius: 10px;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
      }

      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
      }

      th, td {
        padding: 16px;
        text-align: left;
        border-bottom: 1px solid #e0e0e0;
      }

      th {
        background-color: #6200ea;
        color: black;
        font-size: 14px;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 1px;
      }

      td {
        background-color: #f9f9f9;
      }

      tr:hover {
        background-color: #f1f1f1;
      }

      .action-buttons {
        display: flex;
        gap: 8px;
        justify-content: center;
      }

      button {
        min-width: 120px;
        border-radius: 30px;
        transition: all 0.3s ease;
      }

      button:hover {
        transform: scale(1.05);
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
      }

      mat-card-header {
        background-color: #6200ea;
        color: white;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        padding: 16px;
      }

      mat-card-title {
        font-size: 22px;
        font-weight: bold;
      }

      mat-card-actions {
        text-align: center;
      }

      .mat-raised-button {
        text-transform: none;
        font-size: 14px;
        padding: 10px 20px;
      }

      .add-booking-button {
        background-color: #03dac6;
        color: white;
        border-radius: 25px;
        font-size: 16px;
        font-weight: bold;
        padding: 12px 25px;
        margin-top: 15px;
        transition: all 0.3s ease;
      }

      .add-booking-button:hover {
        background-color: #018786;
        transform: scale(1.05);
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
      }

      .table-container {
        overflow-x: auto;
      }

      .no-data {
        text-align: center;
        color: #888;
        font-size: 18px;
      }
    `,
  ],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Bookings List</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <div class="table-container">
          <table mat-table [dataSource]="bookings$()">
            <ng-container matColumnDef="col-customerName">
              <th mat-header-cell *matHeaderCellDef>ชื่อลูกค้า</th>
              <td mat-cell *matCellDef="let element">{{ element.customerName }}</td>
            </ng-container>
            <ng-container matColumnDef="col-roomType">
              <th mat-header-cell *matHeaderCellDef>ประเภทห้อง</th>
              <td mat-cell *matCellDef="let element">{{ element.roomType }}</td>
            </ng-container>
            <ng-container matColumnDef="col-checkinDate">
              <th mat-header-cell *matHeaderCellDef>วันเช็คอิน</th>
              <td mat-cell *matCellDef="let element">{{ transformDate(element.checkinDate) }}</td>
            </ng-container>
            <ng-container matColumnDef="col-checkoutDate">
              <th mat-header-cell *matHeaderCellDef>วันที่เช็คเอ้าท์</th>
              <td mat-cell *matCellDef="let element">{{ transformDate(element.checkoutDate) }}</td>
            </ng-container>
            <ng-container matColumnDef="col-status">
              <th mat-header-cell *matHeaderCellDef>สถานะ</th>
              <td mat-cell *matCellDef="let element">{{ element.status }}</td>
            </ng-container>
            <ng-container matColumnDef="col-action">
              <th mat-header-cell *matHeaderCellDef>เครื่องมือ</th>
              <td mat-cell *matCellDef="let element">
                <div class="action-buttons">
                  <button mat-raised-button color="primary" [routerLink]="['edit/', element._id]">Edit</button>
                  <button mat-raised-button color="warn" (click)="deleteBooking(element._id || '')">Delete</button>
                </div>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
          </table>
        </div>
      </mat-card-content>
      <mat-card-actions>
        <button mat-raised-button class="add-booking-button" [routerLink]="['new']">
          Add a New Booking
        </button>
      </mat-card-actions>
    </mat-card>
  `,
})
export class BookingsListComponent implements OnInit {
  
  bookings$ = {} as WritableSignal<Booking[]>;
  displayedColumns: string[] = [
    'col-customerName',
    'col-roomType',
    'col-checkinDate',
    'col-checkoutDate',
    'col-status',
    'col-action',
  ];

  constructor(private bookingService: BookingService, private datePipe: DatePipe) {}

  ngOnInit() {
    this.fetchBookings();
  }

  deleteBooking(id: string): void {
    this.bookingService.deleteBooking(id).subscribe({
      next: () => this.fetchBookings(),
    });
  }

  private fetchBookings(): void {
    this.bookings$ = this.bookingService.bookings$;
    this.bookingService.getBookings();
  }

  transformDate(date: string): string | null {
    return this.datePipe.transform(date, 'dd-MM-yyyy');
  }
}
