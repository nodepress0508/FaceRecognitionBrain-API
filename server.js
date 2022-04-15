const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");
const db = require("knex")({
  client: "pg",
  connection: {
    host: "127.0.0.1", //localhost
    user: "postgres", //add your user name for the database here
    password: "1116", //add your correct password in here
    database: "smart-brain", //add your database name you created here
  },
});
db.select("*")
  .from("users")
  .then((data) => {
    console.log(data);
  });
const app = express();

app.use(bodyParser.json());
app.use(cors());

//sign in API
app.post("/signin", (req, res) => {
  signin.handlesignin(req, res, db, bcrypt);
});

//register API

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
}); // dependency injection

//get user profile API

app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});

app.listen(3000, () => {
  console.log("app is running on port 3000");
});

//updating user entries API. SO put request is a way to go
app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});
/* api's that we need to developed 
/ --> this is working 
/signin --> POST = success/fail
/register --> POST = user object will be return 
/profile/:userId --> GET = user
/image --> PUT --> user
*/
