const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;
const login = require('./controllers/login');

let collection;

const uri = "mongodb+srv://admin:HxUXevZHpYILeKAM@production.gmyen.mongodb.net/Bright-Progress-Track?authSource=admin&replicaSet=atlas-cmxoo1-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  collection = client.db("Bright-Progress-Track").collection("Bright-Progress-Track");
  console.log("connected!!!!!!!!!!!!!");
  // perform actions on the collection object
});


app.get('/login', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.json(await login(collection, req.query.email, req.query.password))
})

app.listen(port, () => {
  console.log(`Email Server listening at http://localhost:${port}`)
})

client.close();