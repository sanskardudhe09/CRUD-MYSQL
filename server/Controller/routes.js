const express = require("express");
var conn = require("../connection.js");
const router = express.Router();

//Api to get a particular user data
router.get("/getdata/:id", (req,res) => {
    var id = req.params.id;
    conn.query("SELECT * FROM user WHERE id = ?", id, (err, result)=>{
        if(err || result.length == 0){
            //req.flash("Invalid ID or Some Error in Processing!!");
            res.status(422).json("Invalid ID!!!..User not Found");
        }else{
            res.status(200).json(result);
        }
    })
})

//Api to get all Users data
router.get("/getallusers", (req,res) => {
    conn.query("SELECT * from user", (err, row)=>{
        if(err){
            req.flash("Some Error Occured!!");
        }else{
            res.status(200).json(row);
        }
    });
})
//Api to create a user with POST request.
router.post("/createuser", (req,res)=>{
    const data = {
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        role: req.body.role
    }
    let error = 0;
    if(data.id == "" || data.name == "" || data.age == "" || data.email == "" || data.role == ""){
        error = 1;
    }
    if(data.name.length > 45 || data.age.length > 3 || data.email.length > 45 ||
        data.role.length > 45 || !data.email.includes("@")){
        error = 1;
    }
    if(error){
        res.status(422).json("Invalid Data or Some error in processing!!");
    }else{
        conn.query("SELECT * FROM user WHERE id = ?", data.id, (err,ans) =>{
            if(ans.length > 0){
                error = 1;
                console.log(error);
                console.log(typeof(error));
                console.log(ans);
                console.log("User with the same ID already exists..Cannot Create New User with same id!!");
                res.status(422).json("User with the same ID already exists!!");
            }
        });
        if(error == 0 && error !== 1){
            conn.query("INSERT INTO user SET ?", data, (err,result)=>{
                if(err) {
                    //console.log(err);
                }else {
                    console.log("Data Inserted Successfully!!");
                    res.status(201).json("Successfully Inserted Data!!");
                }
            });
        }
    }
});

//Api to update a user data
router.patch("/updateuser/:id", (req,res)=>{
    const id = req.params.id;
    var notpresent = 0;
    var data = {
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        role: req.body.role
    };
    if(id != data.id){
        res.status(422).json("Id doesn't match with Data Id!!");
    }else{
        conn.query("SELECT * FROM user WHERE id = ?", id, (err, ans)=>{
            if(err){
                notpresent = 1;
                res.status(422).json("User with Given id not Found!!");
            }
        });
        if(notpresent == 0){
            conn.query("UPDATE user SET ? WHERE id = ?" ,[data,id], (err,result)=>{
                if(err){
                    res.status(422).json("Some Error Occured while Updation!!");
                }else{
                    res.status(200).json(result);
                }
            });
        }
    }
})

//Api to delete a user
router.delete("/deleteuser/:id", (req,res)=>{
    const id = req.params.id;
    conn.query("DELETE FROM user WHERE id = ?", id, (err,ans)=>{
        if(err){
            res.status(500).json(err);
        }else if(ans.affectedRows == 0){
            res.status(404).json("User with Given ID not found!!");
        }
        else{
            console.log(`User with id ${id} deleted successfully!!`);
            console.log(ans);
            res.status(200).json(ans);
        }
    })
})
module.exports =router;