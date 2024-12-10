import * as express from "express";
import { ObjectId } from "mongodb";
import { collections } from "./database";
import { Booking } from "./booking";  // Import Booking model

export const bookingRouter = express.Router();
bookingRouter.use(express.json());

// Get all bookings
bookingRouter.get("/", async (_req, res) => {
    try {
        const bookings = await collections?.bookings?.find({}).toArray();
        res.status(200).send(bookings);
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : "Unknown error");
    }
});

// Get booking by ID
bookingRouter.get("/:id", async (req, res) => {
    try {
        console.log("Booking data:", req.body);
        const bookingId = new ObjectId(req.params.id);  // Convert to ObjectId
        const booking = await collections?.bookings?.findOne({ _id: bookingId });

        if (booking) {
            res.status(200).send(booking);
        } else {
            res.status(404).send("Booking not found");
        }
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : "Unknown error");
    }
});

// Create a new booking
bookingRouter.post("/", async (req, res) => {
    console.log("Received POST request for /bookings", req.body);

    try {
        const booking: Booking = req.body;

        // Ensure dates are correct
        booking.checkinDate = new Date(booking.checkinDate);
        booking.checkoutDate = new Date(booking.checkoutDate);

        const result = await collections?.bookings?.insertOne(booking);

        if (result?.acknowledged) {
            res.status(201).send(`Created a new booking: ID ${result.insertedId}`);
        } else {
            res.status(500).send("Failed to create a new booking.");
        }
    } catch (error) {
        console.error("Validation error:", error);
        res.status(400).send(error instanceof Error ? error.message : "Unknown error");
    }

});

// Update a booking
bookingRouter.post("/", async (req, res) => {
    console.log("Received POST request for /bookings", req.body);
    try {
        const booking: Booking = req.body;
        const result = await collections?.bookings?.insertOne(booking);

        if (result?.acknowledged) {
            res.status(201).send(`Created a new booking: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create a new booking.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error instanceof Error ? error.message : "Unknown error");
    }
});


// Delete a booking
bookingRouter.delete("/:id", async (req, res) => {
    try {
        const bookingId = new ObjectId(req.params.id);  // Convert to ObjectId
        const result = await collections?.bookings?.deleteOne({ _id: bookingId });

        if (result?.deletedCount === 1) {
            res.status(200).send("Booking deleted successfully");
        } else {
            res.status(404).send("Booking not found");
        }
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : "Unknown error");
    }
});

