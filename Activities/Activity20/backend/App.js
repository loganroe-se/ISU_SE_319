// Logan Roe
// lroe@iastate.edu
// Nov 22, 2024

var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var path = require("path");

// MySQL
const mysql = require("mysql2");
const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "Mo72N0p*6",
    database: "secoms3190",
});

const multer = require("multer");
// Set up multer for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Save images in the 'uploads' folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});
const upload = multer({ storage: storage });

// Create "uploads" folder if it doesn't exist
const fs = require("fs");
if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
}

// Server
var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static("public"));
app.use("/uploads", express.static("uploads")); // Serve images statically

// endpoint to get all posts
app.get("/contact", (req, res) => {
    try {
        db.query("SELECT * FROM contact", (err, result) => {
            if (err) {
                console.error({error:"Error reading all posts:"+err});
                return res.status(500).send({ error: "Error reading all contacts"+err});
            }
            res.status(200).send(result);
        });
    } catch (err) {
        console.error({ error: "An unexpected error occurred"+err });
        res.status(500).send({ error: "An unexpected error occurred"+err });
    }
});

// Request Method to search contacts by contact_name or Partial
app.get("/contact/name", (req, res) => {
    try {
        const { contact_name } = req.query;

        // Validate if contact_name is provided
        if (!contact_name) {
            return res.status(400).send({ error: "contact_name is required" });
        }

        // Query to search for exact or partial matches, case sensitive
        const query = "SELECT * FROM contact WHERE LOWER(contact_name) LIKE LOWER(?)";

        const searchValue = `%${contact_name}%`; // Add wildcards for partial match

        db.query(query, [searchValue], (err, result) => {
            if (err) {
                console.error("Error fetching contacts:", err);
                return res.status(500).send({ error: "Error fetching contacts" });
            }
            res.status(200).send(result);
        });
    } catch (err) {
        console.error({ error: "An unexpected error occurred in GET by name"+err });
        res.status(500).send({ error: "An unexpected error occurred in GET by name"+err });
    }
});

// Request Method to log in
app.post("/contact/login", (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).send({ error: "Username and password are required." });
        }

        // Query MySQL
        const query = "SELECT role FROM user WHERE user = ? AND password = ?";

        // Query MySQL
        db.query(query, [username, password], (err, results) => {
            if (err) {
                console.error("Database error during login:", err);
                return res.status(500).send({ error: "An error occurred in Query. Please try again." });
            }

            if (results.length === 0) {
                return res.status(401).send({ error: "Invalid username or password." });
            }

            // If there is not any error, respond with code and role
            const { role } = results[0];
            res.status(200).send({ role });
        });

    } catch (err) {
        // Handle synchronous errors
        console.error("Error in GET /contact/login", err);
        res.status(500).send({ error: "An unexpected error occurred in Login: " + err.message });
    }
});

// Request Method to add new messages given a Contact
app.post('/contact/messages', (req, res) => {
    try {
        // Read data from Body
        const { contactId, message } = req.body;

        // Query MySQL
        const query = "INSERT INTO message (contact_id, message, message_timestamp) VALUES (?, ?, NOW())";

        db.query(query, [contactId, message], (err, results)=>{
            if (err){
                // In case of an error occurs
                console.log("Error in /contact/messages "+ err);
                res.status(409).send({error:"Error adding Messages "+err});
            } else {
                // If it was successful
                res.status(201).send("Message added successfully");
            }
        });
    } catch (err) {
        console.err("Error in /contact/messages "+err);
        res.status(500).send({ error: 'Error sending message'+ err });
    }
});

// Request method to read all messages from given Id contact
app.get('/contact/messages/:contactId', (req, res) => {
    try {
        // Read Id from params
        const { contactId } = req.params;

        // MySQL Query
        const query = "SELECT * FROM message WHERE contact_id = ? ORDER BY message_timestamp DESC";

        // Database query
        db.query(query,[contactId],(err,results)=>{
            if (err){
                console.error("Error fetching Messages:", err);
                return res.status(500).send({ error: "Error fetching Messages"+err });
            }
            console.log(results);
            res.status(200).json(results);
        });
    } catch (err) {
        res.status(500).send({ error: 'Error fetching messages', err });
    }
});

// Request method to read the picture user
app.get('/contact/profile_picture/:contact_name', (req, res) => {
    try {
        // Read contact_name from route parameter
        const contact_name = req.params.contact_name;

        // MySQL Query
        const query = "SELECT image_url FROM contact WHERE contact_name = ?";

        db.query(query, [contact_name], (err, result)=>{
            if (err) {
                console.log({error:"Error in Profile Picture"});
                return res.status(500).send({ error: "Error fetching Profile Picture :"+err });
            } else if (result.length) {
                console.log(result);
                res.json({ picture: result[0].image_url }); // return local url
            } else {
                res.status(404).send({ error: 'Profile picture not found' });
            }
        });
    } catch (err) {
        console.error("Error fetching profile picture:", err);
        res.status(500).send({ error: 'Error fetching profile picture :'+ err });
    }
});

// Request Method to add new contact with image
app.post("/contact", upload.single("image"), (req, res) => {
    try {
        const { contact_name, phone_number, message } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

        // Step 1: Check if contact_name already exists
        const checkQuery = "SELECT * FROM contact WHERE contact_name = ?";

        db.query(checkQuery, [contact_name], (checkErr, checkResult) => {
            if (checkErr) {
                console.error("Database error during validation:", checkErr);
                return res.status(500).send({ error: "Error checking contact name: " + checkErr.message });
            }
            if (checkResult.length > 0) {
                // If contact_name exists, send a conflict response
                return res.status(409).send({ error: "Contact name already exists." });
            }
        });

        const query = "INSERT INTO contact (contact_name, phone_number, message, image_url) VALUES (?, ?, ?, ?)";
        db.query(query, [contact_name, phone_number, message, imageUrl], (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send({error:"Error adding contact"+err});
            } else {
                res.status(201).send("Contact added successfully");
            }
        });
    } catch (err) {
        // Handle synchronous errors
        console.error("Error in POST /contact:", err);
        res.status(500).send({ error: "An unexpected error occurred: " + err.message });
    }
});

// Request Method to delete a contact by ID
app.delete("/contact/:id", (req, res) => {
    try {
        const id = req.params.id;
    
        const query = "DELETE FROM contact WHERE id = ?";
        db.query(query, [id], (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send({err:"Error deleting contact"});
            } else if (result.affectedRows === 0) {
                res.status(404).send({err:"Contact not found"});
            } else {
                res.status(200).send("Contact deleted successfully");
            }
        });
    } catch (err) {
        // Handle synchronous errors
        console.error("Error in DELETE /contact:", err);
        res.status(500).send({ error: "An unexpected error occurred in DELETE: " + err.message });
    }
});

// Request Method to update a contact's information
app.put("/contact/:id", (req, res) => {
    try {
        const id = req.params.id;

        const query = `
            UPDATE contact
            SET contact_name = ?, phone_number = ?, message = ?
            WHERE id = ?
            `;

        db.query(query, [contact_name, phone_number, message, id], (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send({err:"Error updating contact"});
            } else if (result.affectedRows === 0) {
                res.status(404).send({err:"Contact not found"});
            } else {
                res.status(200).send("Contact updated successfully");
            }
        });
    } catch (err) {
        // Handle synchronous errors
        console.error("Error in UPDATE /contact:", err);
        res.status(500).send({ error: "An unexpected error occurred in UPDATE: " + err.message });
    }
});

const PORT = 8081;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});