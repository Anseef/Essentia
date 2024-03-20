const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { ObjectId } = require('mongodb');

const app = express();
app.use(cors());
app.use(express.json());

const { userDetailsCollection } = require('./mongoDB');

const secret = crypto.randomBytes(32).toString('hex');
const JWT_SECRET = secret;

app.post("/register", async (req, res) => {
    const { name, password, email } = req.body;
    const encryptPassword = await bcrypt.hash(password, 10);

    const existUser = await userDetailsCollection.findOne({ email: email });
    if (existUser) {
        return res.send({ data: "User already exist" });
    }
    try {
        // Insert user data into the database
        await userDetailsCollection.insertOne({
        name,
        email,
        password: encryptPassword,
        });
        console.log("user created: "+name)
        res.send({ status: "ok", data: "User created" });
    } catch (e) {
        res.send({ status: "error", data: e });
    }
});


app.post("/login-user", async( req, res) => {
    const { email, password } = req.body;
    const existUser = await userDetailsCollection.findOne({ email: email});
    if(!existUser){
        return res.send({data: "User doesn't exist"});
    }

    if(await bcrypt.compare( password, existUser.password )){
        const token = jwt.sign({ email: existUser.email }, JWT_SECRET);
        if(res.status(201)){
            return res.send({status: "ok", data: token});
        }else {
            return res.send({error: "Error"});
        }
    }
})

app.post("/user-data", async(req, res) => {
    const token = req.body.token;
    try {
        const validUser = jwt.verify( token, JWT_SECRET );
        const userEmail = validUser.email;
        console.log(userEmail)
        await userDetailsCollection.findOne({email: userEmail})
        .then((data) => {
            return res.send({status: 'ok', data: data})
        })
    }catch(e) {
        return res.send({error: e});
    }
})

app.post("/updateUserData", async(req, res) => {
    const userData = req.body?.userData;
    try {
        const result = await userDetailsCollection.updateOne(
            { email: userData.email },
            { $set: userData }
        );

        if (result.modifiedCount > 0) {
            return res.status(200).send({ status: 'ok', data: result });
        } else {
            return res.status(404).send({ error: 'User data not found or not modified' });
        }
    }catch(e) {
        return res.send({error: e});
    }
})

console.log("Hello")
app.listen(8888, ()=> {
    console.log("Connected to port 8888");
})