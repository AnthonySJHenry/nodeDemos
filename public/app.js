const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");
let mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/tasks', {useNewUrlParser: true, useUnifiedTopology: true});
let taskObject = {
    name: {
        type: String,
        required: true
    }
}
let Task = mongoose.model("Task", taskObject)
// let task = new Task ({
//     name: "Clean face, hair , and mouth"
// })
// let task2 = new Task ({
//     name: "Go for a run"
// })
// let task3 = new Task ({
//     name: "Meditate for 10 minutes"
// })
// let tasks = [task, task2, task3];
// Task.insertMany(tasks, function(err){
//     if(err){console.log(err);}
//     else{console.log("Successfully updated tasks")}
// })


//var item = [];
var work = [];
app.use(express.static("/Users/ah/Desktop/Web Development/mock-todo/public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));


app.get('/', function(req, res){
    var greeting= "";
    var today = new Date();
    if(today.getHours() >= 12){greeting = "Good Afternoon, Anthony";}
    else{greeting = "Good Morning, Anthony";}
    var options = {weekday: "long", month: "short", day: "numeric", year: "numeric"};
    Task.find(function(err, tasks){
        // tasks.forEach(task => {
        //     console.log(task.name);
        // });
        
        if(err){
            console.log("Error:", err);
        }
        res.render("index", {today:today.toLocaleDateString("en-US", options), tasks:tasks, greeting:greeting});
    });
    //res.send();
})

app.post('/', function(req,res){
    let task = new Task ({
        name: req.body.task
    })

    task.save(function(){
        res.redirect('/'); // redirects to the home route
    })
    
    
})

app.post('/delete', function(req, res){
    let id = req.body.checkbox;
    Task.findByIdAndRemove(id, function(err){
        if(err){console.log(err);}
        else{console.log("Successfully deleted.")}
    })
    res.redirect('/');
})

app.get('/about', function(req,res){
    res.render("about");
})

app.get('/contact', function(req,res){
    res.render("contact");
})

app.listen(3000, function(){
    console.log("Server started(Port 3000)")
})

