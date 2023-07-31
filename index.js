const express=require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

//const router = express.Router();
const Donor=require("./module/Donor");

app.set('view engine','ejs');

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

//connect to MongoDB
const mongoose=require('mongoose');
const { log, error } = require('console');
const { prototype } = require('module');
mongoose.connect('mongodb://localhost:27017/BloodBank',{useNewUrlParser:true});
const db=mongoose.connection;

db.on('error',(error)=>{
    console.error('MongoDB connection error:',error);
});

db.once('open',()=>{
    console.log('Connected to MongoDB !');
});
app.get("/index",(req,res)=>{
    //console.log("Yo whats up guys");
    res.redirect('/');
});

app.get("/",(req,res)=>{
    //console.log("Yo whats up guys");
    res.sendFile(path.join(__dirname,'index.html'));
});

app.post('/',(req,res)=>{
   var Name=String(req.body.name); var Age=Number(req.body.age);
   var number=Number(req.body.number);var blood=String(req.body.bloodType);
   //let user=new User({Username:name,rollNumber:rollnumber});
   let donor=new Donor({
    Donorname:Name,
    Donorage:Age,
    Donorblood:blood,
    Donorcontact:number,
   });
   console.log(req.body);
   donor.save();
   res.redirect("/");
});
app.get("/search",(req,res)=>{
    res.sendFile(path.join(__dirname,'search.html'));
});

app.post('/search',(req,res)=>{

    var blood=String(req.body.bloodType);
    console.log("Query for blood group:"+ blood);

    Donor.find({}).then((found)=>{
        
        
        res.render('donors', {donorname:found,found:found,blood:blood});
        

    }).catch((error)=>{
        console.error(error);

    });

});
const port = process.env.PORT || 3000;
app.listen(port,()=>(console.log("Server started on port 3000")));
