const express = require('express');
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')



const app = express();
let db = null;
const {MongoClient, ObjectId} = mongodb;
const secretKey = "sQfv9RKIn7JamNXOY3gkXOuLz6MOiYYHOpjoMW1wwRzBdU15Ah";
const options = {
  expires:new Date (Date.now() + 1000 * 1000),
  httpOnly: true,
  sameSite: "strict",
  secure: true,
};

app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({extended: true})); // to support URL-encoded bodies
app.use(cors({"origin": "http://localhost:3000",
"methods": "GET,HEAD,PUT,PATCH,POST,DELETE", "credentials": true}))
app.use(cookieParser());


// respond with "hello world" when a GET request is made to the homepage
mongoose.connect('mongodb://localhost:27017/Database', {useNewUrlParser: true}).then(() => console.log("MongoDb started")).catch(() => console.log("MongoDb not started"));
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  hash: {
    type: String,
    required: true
  },
})
const Users = mongoose.model("users", UserSchema);

const ItemSchema = new Schema({
  product: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "users"
  },
})
const Items = mongoose.model("items", ItemSchema);

const checkToken = async (req, res, next) => {
  const token = req.cookies["tokenCookie"];
  if (token == "null") {
    res.status(401).json({ msg: "User is not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    const {email} = decoded;
    const user = await Users.findOne({email});
    req.user = {id: user._id, email: user.email};
    next();
  } catch (e) {
    console.log(e);
    if (e.name === 'TokenExpiredError') {
      res.status(401).json({ msg: "Authentication token expired" });
    } else {
      res.status(401).json({ msg: "Invalid authentication" });
    } 
  } 
} 

app.get('/get-items', checkToken, async function (req, res) {
  try {
    console.log(req.user);
    const items = await Items.find().select("product price").populate('user', "email -_id");
    res.status(200).json(items);
  } catch (e) {
    console.log(e);
    res.status(500).json({msg: e});
  }
})
app.post("/create-item", checkToken, async function (req, res) {
  try {
    const user = req.user;
    const result = await Items.create({...req.body, user: user.id})
    console.log(result);
    res.status(201).json(result);
  } catch (e) {
    console.log(e);
    res.status(500).json({msg: e});
  }
})
app.delete("/delete-item/:itemId", checkToken, async function (req, res) {
  try {
    console.log(req.params);
    const {itemId} = req.params;
    const result = await Items.deleteOne({_id: ObjectId(itemId)});
    console.log(result);
    if (result.deletedCount) {
      res.status(200).json({_id: itemId});
    } else {
      res.status(404).json({});
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({msg: e});
  }
})

app.post('/register', async(req, res) => {
  try {
    const {email, password} = req.body;
    const found = await Users.findOne({email});
    // if (found)
    //   res.status(409).send({msg: 'User already exists'});
    // else {
    //   const hash = await bcrypt.hash(password, 10);
    //   await Users.create({email, hash});
    //   const token = jwt.sign({email}, secretKey, {expiresIn: 1000000});
    //   res.cookie("tokenCookie", token, options);
    //   res.status(200).send({token});
    // }
    console.log("lol");
  } catch(e) {
    console.log(e);
    res.status(500).send({msg: "Naspa!"});
  }
})

app.post('/login', async(req, res) => {
  try {
    console.log("body: ", req.body, await Users.find());
    const {email, password} = req.body;
    const result = await Users.findOne({email});
    const token = jwt.sign({email}, secretKey, {expiresIn: 1000000});
    console.log(token);
    console.log(result);
    if (result == null)
      res.status(404).send('User not found');
    else {
      const match = await bcrypt.compare(password, result.hash);
      if (match) {
        res.cookie("tokenCookie", token, options);
        res.status(200).json({email});
      }
      else
        res.status(403).send('Wrong password');
    }
  } catch(e) {
    console.log(e);
    res.status(500).send("Naspa!");
  }
})

app.put("/update-item/:itemId", async function (req, res){
  try {
    console.log(req.params);
    const {itemId} = req.params;
    const result = await Items.updateOne(
      {_id: ObjectId(itemId)},
      {$set: req.body},
    );
    if (result.modifiedCount) {
      res.status(200).json({_id: itemId});
    }
    else
      res.status(400).json({});

  } catch(e) {
    console.log(e);
    res.status(500).json({msg: e});
  }
})

app.get("/get-item/:itemId", async function (req, res) {
  try {
    const {itemId} = req.params;
    const found = await Items.findOne({_id: itemId});
    if (!found)
      return res.status(404).json({});
    res.status(200).json(found);
  } catch(e) {
    res.status(500).json({msg: e});
  }
})

app.post('/logout', function (req, res) {
  res.clearCookie("tokenCookie");
  res.status(200).json({});
})


app.listen(8800, () => {console.log("Server has started")})
