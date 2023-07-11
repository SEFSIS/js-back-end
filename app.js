const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.get('/users', (req, res) => {
    res.json(users)
})

app.get('/users/:id', (req, res) => {
    const {id} = req.params;

    res.status(200).json(users[+id]);
})

app.post('/users',(req,res)=>{
    users.push(req.body);

    res.status(201).json({
        message:"User created."
    });
})



