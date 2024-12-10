import * as mongodb from "mongodb";
import { Booking } from "./booking";  // Assuming HotelBooking is defined in a separate file.

export const collections: {
    bookings?: mongodb.Collection<Booking>;
} = {};

export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();

    const db = client.db("hotelBookingSystem");
    await applyBookingSchemaValidation(db);

    const bookingsCollection = db.collection<Booking>("bookings");
    collections.bookings = bookingsCollection;
}

// Update the collection with JSON schema validation to ensure documents match the shape of the HotelBooking model
// Define the schema validation for bookings
async function applyBookingSchemaValidation(db: mongodb.Db) {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["customerName", "roomType", "checkInDate", "checkOutDate", "bookingStatus"],
            additionalProperties: false,
            properties: {
                _id: {},
                customerName: {
                    bsonType: "string",
                    description: "'customerName' is required and is a string",
                },
                roomType: {
                    bsonType: "string",
                    description: "'roomType' is required and is a string",
                },
                checkInDate: {
                    bsonType: "date",
                    description: "'checkInDate' is required and must be a date",
                },
                checkOutDate: {
                    bsonType: "date",
                    description: "'checkOutDate' is required and must be a date",
                },
                bookingStatus: {
                    bsonType: "string",
                    enum: ["confirmed", "pending", "canceled"],
                    description: "'bookingStatus' is required and must be one of 'confirmed', 'pending', or 'canceled'",
                },
            },
        },
    };

    // Apply schema validation when creating or modifying the collection
    await db.command({
        collMod: "bookings",  // Name of the collection
        validator: jsonSchema,  // Apply the new schema
        validationAction: "warn",  // Use "error" to block invalid documents
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === "NamespaceNotFound") {
            // If the collection doesn't exist, create it with the validator
            await db.createCollection("bookings", { validator: jsonSchema });
        }
    });
}