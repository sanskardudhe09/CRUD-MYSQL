const express = require("express");
var conn = require("./connection.js");
const router = require("./Controller/routes.js");
const app = express();
const port = 8000;
app.use(express.json());
app.use(router);
conn.connect(function(err) {
    if(err) {
        console.log("Some Error Occured!!", err);
    }else {
        console.log("Connected to Database Successfully!!");
    }
});
app.listen(port, (req,res)=>{
    console.log(`Server is listening on port no ${port}!`);
});



