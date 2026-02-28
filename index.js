import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

// Here we're importing important dictionaries to use later 

const app = express()
const port = 3000
const API = "https://v2.jokeapi.dev/joke";

// Here we're assigning some values/url/ and functions to some variables,
// it's not necessary but way easier to use this way

app.use(express.static("public"));

// Here we're adding public files as static for ejs module to read
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req,res) => {
    res.render("index.ejs")
});

// This Get request is what the user will see when they open the website

app.post("/joke" , async (req,res) => {
  try {
  const result = await axios.get(API + "/Any?lang=en")
  const Fname = req.body.Fname
  const Lname = req.body.Lname
  res.render("joke.ejs", {
    joke1: JSON.stringify(result.data.setup),
    joke2: JSON.stringify(result.data.delivery),
    Fname : Fname,
    Lname : Lname
  })
  } catch(error) {
    res.status(500)
    console.log("There is an error")
  }
});

// Here we're taking some inputs from the user and sending a request to a public id
// Then we're sending these inputs as outputs back to user inside another ejs page.
// Also we're adding error handling options just in case anything unexpected occurs.

app.listen(port,() => {
  console.log(`Server listening on port ${port}`)
})
 // Here we're checking if the website is accessible in the mentioned port which is 3000
