const express = require("express")
const {v4: uuidv4} = require("uuid")
const methodOverride = require('method-override')

const app = express();
app.use(methodOverride("_method"));
const path = require("path")
const port = 8080;

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


let posts = [
    {
        id: uuidv4(),
        username: "chodu",
        content: "always high on drugs"
    },{
        id: uuidv4(),
        username: "cristiano",
        content: "i think im the greatest, lol"
    },{
        id: uuidv4(),
        username: "leomessi", 
        content : "passionate footballer, the goat!"
    }
]

app.get("/posts", (req, res)=>{
    res.render("index.ejs", {posts})
})
app.get("/posts/new", (req, res)=>{
    res.render("new.ejs");  
})

//add new posts
app.post("/posts", (req, res)=>{
    let {username, content} = req.body
    posts.push({
        id: uuidv4(), 
        username, 
        content})
    res.redirect("/posts")
})

//show  a particular post in detail using the ids
app.get("/posts/:id", (req, res)=>{
    let {id} = req.params
    let post = posts.find(
        (p) => id===p.id 
    )
    res.render("show.ejs", {post})
})

//to update the content
app.patch("/posts/:id", (req, res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find(
        (p) => id===p.id 
    )
    post.content = newContent
    res.redirect("/posts")
})

//to edit posts
app.get("/posts/:id/edit", (req, res)=>{
    let {id} = req.params;
    let post = posts.find(
        (p) => id===p.id 
    )
    res.render("edit.ejs", {post})
})

//to delete posts
app.delete("/posts/:id", (req, res)=>{
    let {id} = req.params
     posts = posts.filter(
        (p)=> id !== p.id
    )
    res.redirect("/posts")
    
})

app.listen(port, ()=>{
    console.log ("port running on 8080")
}) 