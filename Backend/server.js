const express = require("express");
const { v4: uuidv4 } = require("uuid"); // Import UUID generator
const pool = require("./db"); // Import DB connection
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;


// Enable CORS for all routes
app.use(cors());

// Middleware for JSON parsing
app.use(express.json());

/* 🟢 Route to Insert Data into accommodation_details */
app.post("/add-accommodation", async (req, res) => {
  try {
    let { username, accommodation_dates, gender, email_id, mobile_number, college_name } = req.body;

    // Ensure accommodation_dates is an array
    if (!Array.isArray(accommodation_dates) || accommodation_dates.length === 0) {
      return res.status(400).json({ error: "Invalid accommodation_dates. It should be a non-empty array of dates." });
    }

    // 🏷️ Calculate price: ₹300 per day
    const accommodation_price = accommodation_dates.length * 300;

    // Insert query
    const result = await pool.query(
      `INSERT INTO accommodation_details (username, accommodation_dates, gender, accommodation_price, email_id, mobile_number, college_name) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [username, accommodation_dates, gender, accommodation_price, email_id, mobile_number, college_name]
    );

    res.status(201).json({
      message: "Accommodation added successfully!",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("❌ Error inserting data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/* 🟢 Route to Fetch All Accommodation Details */
app.get("/accommodations", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT username, email_id, mobile_number, gender, accommodation_dates, accommodation_price FROM accommodation_details`
    );

    res.status(200).json({
      message: "Fetched accommodation details successfully!",
      data: result.rows,
    });
  } catch (error) {
    console.error("❌ Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/* 🟢 Route to Insert Data into contact_details */
app.post("/add-contact", async (req, res) => {
  try {
    let { username, email_id, mobile_number, message } = req.body;

    // Validate required fields
    if (!username || !email_id || !mobile_number || !message) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    // Generate UUID for user_id
    const user_id = uuidv4();

    // Insert query
    const result = await pool.query(
      `INSERT INTO contact_details (user_id, username, email_id, mobile_number, message, created_at) 
       VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *`,
      [user_id, username, email_id, mobile_number, message]
    );

    res.status(201).json({
      message: "Contact details added successfully!",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("❌ Error inserting contact details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/contacts", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT username, email_id, mobile_number, message FROM contact_details`
    );

    res.status(200).json({
      message: "Fetched contact details successfully!",
      data: result.rows,
    });
  } catch (error) {
    console.error("❌ Error fetching contact details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
