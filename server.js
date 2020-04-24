const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "bananenzijngeel741",
    database: "smart-brain",
  },
});

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {res.send(database.users)});

//SIGNIN POST
app.post("/signin", (req, res) => { signin.handleSignin(req, res, db, bcrypt) });

//REGISTER POST
app.post("/register", (req, res) => { register.handleRegister(req, res, db, bcrypt) });

//GET profile/user on ID
app.get("/profile/:id", (req, res) => {profile.handleProfileGet(req, res, db)});

//IMAGE posting
app.put("/image", (req, res) => {image.handleImage(req, res, db)});

app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("app is running on port", PORT);
});
