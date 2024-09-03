import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
var bandName = "";
//to parse uncoded data
app.use(bodyParser.urlencoded({extended: true})); // to create a body for URL-encoded requests like in this case form submission

function nameGenerator(req, res, next){
  console.log(req.body);
  bandName = req.body["street"]+req.body["pet"];
  next();
}

app.use(nameGenerator);

// app.get on root route will send the file (index.html) inside the public folder
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit", (req, res)=>{
  // console.log(req.body);
  res.send(`<h1>Your band name is :</h1><h2>${bandName}✨</h2>`);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
