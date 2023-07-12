const express = require('express');
const fileService = require('./file.service')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.get('/users', async (req, res) => {
   const users = await fileService.readDB();
    res.json(users);
})

// app.get('/users/:id', (req, res) => {
//     const {id} = req.params;
//
//     res.status(200).json(users[+id]); // status(code:200) повертається по дефолту, його можна не писати
// })

app.get('/users/:id',async (req,res)=>{ //оновлюємо користувача
    const {id} = req.params;

    const users = await fileService.readDB();

    const user = users.find((user)=> user.id === +id );
    if(!user){
        return res.status(422).json('user not found');
    }

    res.json(user);
})

const PORT = 5001;

app.listen(PORT, () => { // listen запускає нашу аплікацію
    console.log(`Server has started on PORT ${PORT}`)
});

app.post('/users', async (req, res) => { //стоворюємо нового користувача
    const {name, age} = req.body;
    if (!name & name.length < 5) {
        return res.status(400).json('name is wrong');
    }
    if (!age || age < 10 || age > 100) {
        return res.status(400).json('age is wrong');
    }

    const users = await fileService.readDB();

    const newUser = {
        id: users.length ? users[users.length - 1].id + 1 : 1,
        name,
        age
    }

    users.push(newUser);

    await fileService.writeDB(users);

    res.status(201).json(newUser);
})

app.patch('/users/:id', async (req, res) => {
    const {id} = req.params;
    const {name, age} = req.body;

    if (name && name.length < 5) {
        return res.status(400).json('name is wrong');
    }
    if (age && (age < 10 || age > 100)) {
        return res.status(400).json('age is wrong');
    }

    const users = await fileService.readDB();
    const user = users.find((user) => user.id === +id);

    if (!user) {
        return res.status(422).json('user not found');
    }
    if (name) user.name = name;
    if (age) user.age = age;

    await fileService.writeDB(users);

    res.status(201).json(user);
})


app.delete('/users/:id', async (req, res) => { //видаляємо користувача
    const {id} = req.params;

    const users = await fileService.readDB();
    const index = users.findIndex((user) => user.id === +id);

    if (index === -1) {
        return res.status(422).json('user not found');
    }
    users.splice(index, 1);
    await fileService.writeDB(users);

    res.sendStatus(204);
})




