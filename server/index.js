import express from "express";
import cors from "cors";
import { MongoClient, ObjectId } from "mongodb";
import "dotenv/config";

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

// Home route
app.get("/", (req, res) => {
  res.send("HOME");
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
app.get("/all-destinations/:id", async (req, res) => {
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

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
