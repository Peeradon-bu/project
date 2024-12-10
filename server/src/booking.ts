import * as mongodb from "mongodb";

export interface Booking {
    customerName: string;
    roomType: string;  // Room type for booking
    checkinDate: Date;  // Check-in date for the booking
    checkoutDate: Date;  // Check-out date for the booking
    totalPrice: number;  // Total price for the booking
    status: string;  // Booking status
    _id?: mongodb.ObjectId;
}