const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/database");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Set up routes
app.use("/api/brands", require("./routes/brandRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

const PORT = 8081;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));