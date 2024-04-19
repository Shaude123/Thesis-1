const express = require('express');
const mysql = require('mysql');
const path = require('path');
const cors = require('cors')
// const http = require('http'); //? May not need
require('dotenv').config()

const contactsRoute = require('./routes/Contacts');
const messageRoute = require('./routes/Message');





const app = express();
const port = process.env.PORT || 3000;


let publicPath = path.join(__dirname, 'public');

/**
 * Database connection with mysql
 */

const client = mysql.createConnection({
  host: process.env.HOST || "localhost",
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

client.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});



/**
 * Middleware
 */

app.set("view engine", "ejs");
app.use(cors()); //Allow request form any IP
app.use('/contacts', contactsRoute);
app.use('/message', messageRoute);






app.use(express.static(publicPath));

const middle = express.urlencoded({
    extended: false,
    parameterLimit: 12
})




app.get("/", (req, res) => {
    res.end()
})

app.get("/location", (req, res) => {
    fetch('http://ip-api.com/json/?fields=61439')
    .then((res) => res.json())
    .then((res) => {
        let latitude = res.lat;
        let longitude = res.lon;
        let zip = res.zip;

    });




})
/**
 * Custom error handling page
 */
app.get("*", (req, res) => {
    res.render("404", {title: 404});
})

app.post("/submit", middle, (req, res) => {
    let removeUnexpected = (formdata) => {
        let data = formdata.replace(/[^a-zA-Z0-9 .]/g, '');
        return data;
    }

    const userData = req.body;
    /**
     * Do something with the @userData
    */

    //? Testing needs to take place
    Object.keys(userData).forEach((key, index) => {
        if (userData[key] /* Potential Condition */) {
            userData[key] = removeUnexpected(userData[key]);
        }
    });

    //Varibles to Seperate Values

    const query = async () => {
        await client.connect();
        //TODO: Checking Condition
        // const check = await client.query(`SELECT * FROM user_data WHERE first_name=$1 AND last_name=$2 AND email=$3`, [firstName, lastName, email]);

        // if(/*? Checking condition === 0*/) {
        //     //Manipulate Data
        // }

        // if(check.rowCount === 0) {
        //     const result = await client.query(`insert into user_data(first_name, last_name, email, res_state, res_zip, institution, ins_state, ins_zip, msi_type, sec_msi_type, classification, major, prin_investigator, msipp_prog, msipp_year_parti, national_lab)
        //     values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)`, [firstName, lastName, email, resState, resZip, institution, insState, insZip, msiType, msiType2, classification, major, prinInvest, msipp, msippYear, lab]);
        //     // console.log(result.rowCount + '<= results');
        // }

        client.end();
    }

    query(); //! This starts the functions above
});


client.on("connect", () => {
    console.log("Database connection"); 
})

client.on("end", () => {
    console.log("Connection end");
})


app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`);
})