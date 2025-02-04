// node packages
import express from "express";
import bodyParser from "body-parser";

// express application initilization and the port for the localhost server
const app = express();
const port = 3000;

// middleware for accessing static project files and parsing the request body
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// render home page
app.get("/", (req, res) => {
    res.render("home.ejs");
})

// server setup
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});