const express = require('express');
const cors = require('cors')
const mysql = require('mysql');

const app = express();

app.use(express.json());
app.use(cors())

const con = mysql.createConnection({
    host: "localhost",
    password: "",
    database: "zomato",
    user: "root"
})

con.connect((err) => {
    if(err){
    console.log(err)
    }else{
        console.log("Connected")
    }
})

app.post("/hotelregistration", (req, res) => {
        
        const data = {
            hid: req.body.hid,
            h_name: req.body.h_name,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            pin: req.body.pin,
            h_owner: req.body.h_owner,
            contact: req.body.contact,
            type: req.body.type
        }

        const q1 = "insert into hotel SET ?";
        con.query(q1, data, (err, result) => {
                    if(err){
                        console.log(err.sqlMessage)
                    }else{
                        res.send(result)
                    }
        })
        
})

app.get("/hotellist", (req, res) => {
   
    const q1 = "select * from hotel";
    con.query(q1, (err, result) => {
                if(err){
                    console.log(err.sqlMessage)
                }else{
                    res.send(result)
                }
    })

})

app.post("/menuitem", (req, res) => {
    const data = {
        item: req.body.item,
        price: req.body.price,
        type: req.body.type,
        avl_option: req.body.avl_option,
        h_name: req.body.h_name,
    }

    const q1 = "insert into menu SET ?";
    con.query(q1, data, (err, result) => {
                if(err){
                    console.log(err.sqlMessage)
                }else{
                    res.send(result)
                }
    })

})

app.get("/menulist", (req, res) => {
        
    const q1 = "select * from menu";
    con.query(q1, (err, result) => {
                if(err){
                    console.log(err.sqlMessage)
                }else{
                    res.send(result)
                }
    })
})


app.delete("/hotellist/:hid", (req, res) => {
   
    const del = req.params.hid;
    const q1 = "delete from hotel where hid = ?";
    con.query(q1, del, (err, result) => {
                if(err){
                    console.log(err.sqlMessage)
                }else{
                    res.send(result)
                }
    })

})


app.delete("/menulist/:mid", (req, res) => {
   
    const del = req.params.mid;
    const q1 = "delete from menu where mid = ?";
    con.query(q1, del, (err, result) => {
                if(err){
                    console.log(err.sqlMessage)
                }else{
                    res.send(result)
                }
    })

})


app.patch("/menulist/:mid", (req, res) => {
   
    const data = {
        mid: req.body.mid,
        item: req.body.item,
        price: req.body.price,
        tag: req.body.tag,
        avl_option: req.body.avl_option,
        hid: req.body.hid
    }

    const q1 = "update menu SET ? where mid = ?";
    con.query(q1, [data, req.params.mid], (err, result) => {
                if(err){
                    console.log(err.sqlMessage)
                }else{
                    res.send(result)
                }
    })

})



app.patch("/hotellist/:hid", (req, res) => {
   
    const data = {
        hid: req.body.hid,
        h_name: req.body.h_name,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        pin: req.body.pin,
        h_owner: req.body.h_owner,
        contact: req.body.contact,
        type: req.body.type
    }

    const q1 = "update hotel SET ? where hid = ?";
    con.query(q1, [data, req.params.hid], (err, result) => {
                if(err){
                    console.log(err.sqlMessage)
                }else{
                    res.send(result)
                }
    })

})



app.listen(4100, (err) => {
    if(err){
        console.log(err)
    }else{
        console.log("Connected re baba")
    }
});