// node packages
import express from "express";
import bodyParser from "body-parser";

// express application initilization and the port for the localhost server
const app = express();
const port = 3000;

// temporary storage of posts
const posts =[]

// middleware for accessing static project files and parsing the request body
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// class for post objects
class Post {
    constructor(title, date, body) {
        this.title = title;
        this.date = date
        this.body = body;
    }
}

// render home page
app.get("/", (req, res) => {
    res.render("home.ejs", {posts: posts});
})

// render login/signup page
app.get("/loginPage", (req, res) => {
    res.render("login.ejs");
})

// add post route
app.post("/addPost", (req, res) => {
    const title = req.body.postTitle;
    const date = new Date().toLocaleString();
    const body = req.body.postBody;
    const newPost = new Post(title, date, body);
    console.log(newPost)
    posts.push(newPost);
    res.redirect("/")
})

// edit post route
app.post("/editPost", (req, res) => {
    const index = req.body.postIndex
    const currentPost = posts[index];
    console.log(currentPost);
    res.render("edit.ejs", {
        posts: posts,
        post: currentPost
    });
});

// update post route
app.post("/updatePost", (req, res) => {
    const title = req.body.postTitle;
    const date = new Date().toLocaleString();
    const body = req.body.postBody;
    const newPost = new Post(title, date, body);
    console.log(newPost)
    const index = req.body.postIndex;
    posts[index] = newPost;
    res.redirect("/")
})

// delete post route
app.post("/deletePost", (req, res) => {
    const index = req.body.postIndex;
    console.log(index)
    console.log(posts[index])
    posts.splice(index, 1);
    res.redirect("/")
});

// server setup
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});