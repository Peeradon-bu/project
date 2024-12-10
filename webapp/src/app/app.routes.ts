import { Routes } from '@angular/router';
import { BookingsListComponent } from './booking-list/booking-list.component'; // <-- change to BookingsListComponent
import { AddBookingComponent } from './add-booking/add-booking.component'; // <-- change to AddBookingComponent
import { EditBookingComponent } from './edit-booking/edit-booking.component'; // <-- change to EditBookingComponent

export const routes: Routes = [
    { path: '', component: BookingsListComponent, title: 'Bookings List' },  // <-- update path and component
    { path: 'new', component: AddBookingComponent }, // <-- update path and component
    { path: 'edit/:id', component: EditBookingComponent }, // <-- update path and component
];
