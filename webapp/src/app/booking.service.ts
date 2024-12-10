import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Booking } from './booking'; // <-- Assuming you have a Booking model

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private url = 'http://localhost:5200';
  bookings$ = signal<Booking[]>([]);
  booking$ = signal<Booking>({} as Booking);

  constructor(private httpClient: HttpClient) { }

  private refreshBookings() {
    this.httpClient.get<Booking[]>(`${this.url}/bookings`)
        .subscribe(bookings => {
          this.bookings$.set(bookings);
        });
  }

  getBookings() {
    this.refreshBookings();
    return this.bookings$();
  }

  getBooking(id: string) {
    this.httpClient.get<Booking>(`${this.url}/bookings/${id}`) // Update endpoint to bookings
        .subscribe(booking => {
          this.booking$.set(booking);
          return this.booking$();
        });
  }

  createBooking(booking: Booking) {
    return this.httpClient.post(`${this.url}/bookings`, booking, { responseType: 'text' }); // Update endpoint
  }

  updateBooking(id: string, booking: Booking) {
    return this.httpClient.put(`${this.url}/bookings/${id}`, booking, { responseType: 'text' }); // Update endpoint
  }

  deleteBooking(id: string) {
    return this.httpClient.delete(`${this.url}/bookings/${id}`, { responseType: 'text' }); // Update endpoint
  }
}
