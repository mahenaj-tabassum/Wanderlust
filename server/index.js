import express from "express";
import cors from "cors";
import "dotenv/config";
import { MongoClient, ObjectId } from "mongodb";
import { createRemoteJWKSet, jwtVerify } from "jose";

const app = express();
const PORT = process.env.PORT || 5000;

const client = new MongoClient(process.env.MONGODB_DATABASE);

app.use(cors());
app.use(express.json());

// Connect to MongoDB
async function connectToMongoDB() {
  await client.connect();
  console.log("Successfully connected to MongoDB!");

  return client.db("wanderlust-travel-booking");
}

const db = await connectToMongoDB();
const destinationCollection = db.collection("destination");
const bookingCollection = db.collection("bookings");

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ message: "Unauthorized!" });
  }
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send({ message: "Unauthorized!" });
  }
  const JWKS = createRemoteJWKSet(
    new URL(`${process.env.BASE_URL}/api/auth/jwks`),
  );
  try {
    // Payload : User Information
    const { payload } = await jwtVerify(token, JWKS);
    next();
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error!" });
  }
};

// Home route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is running",
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

// Add a destination
app.post("/add-destination", async (req, res) => {
  try {
    const data = req.body;
    const result = await destinationCollection.insertOne(data);

    res.status(201).json({
      message: "success",
      data: { ...data, _id: result.insertedId },
    });
  } catch (error) {
    console.error("Error adding destination:", error);

    res.status(500).json({
      message: "Failed to add destination",
    });
  }
});

// Get all destinations
app.get("/all-destinations", async (req, res) => {
  try {
    const destinations = await destinationCollection.find().toArray();

    res.status(200).json({
      message: "success",
      data: destinations,
    });
  } catch (error) {
    console.error("Error fetching destinations:", error);

    res.status(500).json({
      message: "Failed to fetch destinations",
    });
  }
});

// Get a destination by ID
app.get("/all-destinations/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid destination ID",
      });
    }

    const destination = await destinationCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!destination) {
      return res.status(404).json({
        message: "Destination not found",
      });
    }

    res.status(200).json({
      message: "success",
      data: destination,
    });
  } catch (error) {
    console.error("Error fetching destination:", error);

    res.status(500).json({
      message: "Failed to fetch destination",
    });
  }
});

// Update a destination
app.patch("/all-destinations/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid destination ID",
      });
    }

    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({
        message: "Update data is required",
      });
    }

    const result = await destinationCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: data },
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: "Destination not found",
      });
    }

    res.status(200).json({
      message: "Destination updated successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error updating destination:", error);

    res.status(500).json({
      message: "Failed to update destination",
    });
  }
});

// Delete a destination
app.delete("/all-destinations/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid destination ID",
      });
    }

    const result = await destinationCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Destination not found",
      });
    }

    res.status(200).json({
      message: "Destination deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting destination:", error);

    res.status(500).json({
      message: "Failed to delete destination",
    });
  }
});

// Post the booking data to the Booking Collection
app.post("/booking", verifyToken, async (req, res) => {
  try {
    const bookingData = await req.body;

    const { userId, destinationId } = bookingData;
    if (!userId || !destinationId) {
      return res.status(400).json({
        message: "Missing required booking information",
      });
    }

    // Check whether this booking already exists
    const existingBooking = await bookingCollection.findOne({
      userId,
      destinationId,
    });
    if (existingBooking) {
      return res.status(409).json({
        message: "You have already booked this trip",
      });
    }
    // No duplicate found, so create the booking.
    const result = await bookingCollection.insertOne(bookingData);

    return res.status(201).json({
      message: "Booking created successfully",
      data: result,
    });
  } catch (error) {
    console.error("Booking error:", error);

    return res.status(500).json({
      message: "Failed to create booking",
    });
  }
});

// Get Booking Data
// GET http://localhost:5000/bookings?userId=123
app.get("/bookings", verifyToken, async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) {
      return res.status(400).json({
        message: "User ID is required",
      });
    }
    const bookings = await bookingCollection.find({ userId: userId }).toArray();
    res.status(200).json({
      message: "success",
      data: bookings,
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);

    res.status(500).json({
      message: "Failed to load bookings",
    });
  }
});

// Cancel a booking
app.delete("/booking/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.query.userId;

    // Validate booking ID
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid booking ID",
      });
    }
    if (!userId) {
      return res.status(400).json({
        message: "User ID is required",
      });
    }
    // Delete the booking belonging to this user
    const result = await bookingCollection.deleteOne({
      _id: new ObjectId(id),
      userId: userId,
    });
    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }
    return res.status(200).json({
      message: "Booking cancelled successfully",
    });
  } catch (error) {
    console.error("Error cancelling booking:", error);

    return res.status(500).json({
      message: "Failed to cancel booking",
    });
  }
});

// API URL : http://localhost:5000/featured-destination
app.get("/featured-destination", async (req, res) => {
  const result = await destinationCollection.find().limit(5).toArray();
  res.send({ data: result });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
