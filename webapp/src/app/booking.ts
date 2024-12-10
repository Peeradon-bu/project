export interface Booking {
    customerName: string;  // Name of the customer making the booking
    roomType: 'single' | 'double' | 'suite';  // Type of room being booked
    checkinDate: string;  // Check-in date as string (e.g., '2024-12-10')
    checkoutDate: string;  // Check-out date as string (e.g., '2024-12-15')
    totalPrice: number;  // Total price for the booking
    status: 'confirmed' | 'pending' | 'canceled';  // Booking status
    _id?: string;  // Optional booking ID (in case of existing bookings)
}
