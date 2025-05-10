// Logan Roe
// lroe@iastate.edu
// Nov 13, 2024

var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");

var app = express();
app.use(cors());
app.use(bodyParser.json());

const port = "8081";
const host = "localhost";

// MongoDB
const url = "mongodb://127.0.0.1:27017";
const dbName = "secoms3190";
const client = new MongoClient(url);
const db = client.db(dbName);

app.listen(port, () => {
    console.log("App listening at http://%s:%s", host, port);
});

app.get("/robot", async (req, res) => {
    await client.connect();
    console.log("Node connected successfully to GET MongoDB");

    const query = {};
    const results = await db
        .collection("robot")
        .find(query)
        .limit(100)
        .toArray();
    console.log(results);

    res.status(200);
    res.send(results);
});    

app.get("/robot/:id", async (req, res) => {
    const id = Number(req.params.id);
    console.log("Robot to find :", id);   

    await client.connect();
    console.log("Node connected successfully to GET-id MongoDB");

    const query = {id: id};
    const results = await db.collection("robot")
        .findOne(query);
    console.log("Results :", results);

    if (!results)
        res.send("Not Found").status(404);
    else
        res.send(results).status(200);
});

app.post("/robot", async (req, res) => {
    // The body exists
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).send({ error: 'Bad request: No data provided.' });
    }

    try {
        await client.connect();
    
        const newDocument = {
            "id": req.body.id,
            "name": req.body.name,
            "price": req.body.price,
            "description": req.body.description,
            "imageUrl": req.body.imageUrl
        };

        // Assuming 'id' should be unique
        const existingDoc = await db
            .collection("robot")
            .findOne({ id: newDocument.id });

        if (existingDoc) {
            return res
                .status(409)
                .send({ error: "Conflict: A robot with this ID already exists." });
        }
    
        console.log(newDocument);
    
        const results = await db
            .collection("robot")
            .insertOne(newDocument);
    
        res.status(200);
        res.send(results);
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).send({ error: 'An internal server error occurred'});
    }
});

app.delete("/robot/:id", async (req, res) => {
    try {
        // Read parameter id
        const id = Number(req.params.id);
        console.log("Robot to delete :",id);

        // Connect Mongodb
        await client.connect();

        // Delete by its id
        const query = { id: id };

        // read data from robot to delete to send it to frontend
        const robotDeleted = await db.collection("robot").findOne(query);

        // Delete
        const results = await db.collection("robot").deleteOne(query);

        // Response to Client
        res.status(200);
        res.send(robotDeleted);
    }
    catch (error){
        console.error("Error deleting robot:", error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
}); 

app.put("/robot/:id", async (req, res) => {
    const id = Number(req.params.id); // Read parameter id
    console.log("Robot to Update :",id);

    await client.connect(); // Connect Mongodb
    const query = { id: id }; // Update by its id

    const updateData = { $set: {} };

    // Only update fields that are present in the request body
    if (req.body.name !== undefined) updateData.$set.name = req.body.name;
    if (req.body.price !== undefined) updateData.$set.price = req.body.price;
    if (req.body.description !== undefined) updateData.$set.description = req.body.description;
    if (req.body.imageUrl !== undefined) updateData.$set.imageUrl = req.body.imageUrl;

    // Add options if needed, for example { upsert: true } to create a document if it doesn't exist
    const options = { };
    const results = await db.collection("robot").updateOne(query, updateData, options);

    // read data from updated robot to send to frontend
    const robotUpdated = await db.collection("robot").findOne(query);

    res.status(200); // Response to Client
    res.send(robotUpdated);
});