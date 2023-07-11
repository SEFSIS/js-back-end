// //EVENTS
// const events = require('node:events');
//
// const eventEmitter = new events();
//
// //івенти, які задекларовані через метод on можна викликати безліч разів
//
// eventEmitter.on('click', (data) => { //декларуємо івент з назвою click
//     console.log(data);
//     console.log('click click click');
// })
//
// eventEmitter.emit('click', {data: "Hello"});//викликаємо івент з нашою  назвою click
// eventEmitter.emit('click');
// eventEmitter.emit('click');
// eventEmitter.emit('click');
//
// //івенти, які задекларовані через метод оnce можна викликати лише один раз
//
// eventEmitter.once('clickAndDie', () => {
//     console.log('Clicked and died')
// })
// console.log(eventEmitter.eventNames());//метод,який вертає масив з усіма нами задекларованими івентами
// // в консолі виведеться [ 'click', 'clickAndDie' ]
//
// eventEmitter.emit('clickAndDie');
//
// console.log(eventEmitter.eventNames());//метод,який вертає масив з усіма нами задекларованими івентами
// // в консолі виведеться [ 'click' ]

//STREAMS
//
// const fs = require('node:fs');
//
//
// // readStream - дитина від модулю event
// const readStream = fs.createReadStream('text3.txt');
// const writeStream = fs.createWriteStream('text2.txt');//створюємо новий файл
//
// readStream.on('data', (chunk) => { //chunk  - це  та маленька частина файлу,яку ми зчитали
//     console.log(chunk);
//     writeStream.write(chunk);
// })
//
// readStream
//     .on('error', () => {
//         readStream.destroy();//знищує readStream
//         writeStream.end('ERROR ON READING FILE');// частково призупиняє читання файлу і всередину writeStream (тобто всередину файлу text2) вкінці
//         // запишеться та інформація яку ми передали в end
//         // writeStream.destroy();
//
//         //handle error
//      })
//     .pipe(writeStream);//pipe сам зчитає з readStream, отримає якийсь певний chunk, який прокине все сам всередину writeStream
//
// // Є 4 типи стрімів: read, write, duplex(read+write), transform
// //const zlib = require('zlib'); ----> duplex

//EXPRESS - фреймворк, який дає змогу в ноді підняти сервер
// Сервер - це  по суті комп'ютер

const express = require('express');

const users = [
    {
        name:'Oleg',
        age:20,
        gender:'male'

    },
    {
        name:'Anton',
        age:10,
        gender:'male'

    },
    {
        name:'Inokentiy',
        age:25,
        gender:'female'

    },
    {
        name:'Anastasiya',
        age:15,
        gender:'female'

    },
    {
        name:'Cocos',
        age:25,
        gender:'other'

    }
]

const app = express(); // викликаємо express, як функцію

app.use(express.json());
app.use(express.urlencoded({extended:true}))

//CRUD - create, read, update, delete

//----------------------------------------------------------------------------------------------------------------------
// app.get('/users',(req,res) => { //request-те, що ми отримали від клієнта, response-те, що ми відправимо клієнту
//     // і те за допомогою чого ми можемо відправити щрсь клієнту
//     //res.send('HELLO FROM /')
//
//     // res.send({// метод send переважно використовується в тому випадку, коли потрібно вернути стрічку
//     //     message:'HELLO'
//     // })
//
//     //REQUEST TO DB TO GET USERS
//
//     res.status(200).json(users);
// });
//
// //Отримаємо одного користувача (Олега)
// app.get('/users/0',(req,res) => {
//     res.status(200).json(users[0])
// })
//----------------------------------------------------------------------------------------------------------------------

app.get('/users', (req, res) => {
    res.status(200).json(users)
})

app.get('/users/:id', (req, res) => {
    const {id} =req.params;
    console.log(id);
    res.status(200).json(users[+id])
})


const PORT = 5001;

app.listen(PORT, () => { // listen запускає нашу аплікацію
    console.log(`Server has started on PORT ${PORT}`)
});

app.post('/users',(req,res)=>{ //стоворюємо нового користувача
    users.push(req.body);

    res.status(201).json({
        message:"User created."
    })
})

app.put('/users/:id',(req,res)=>{ //оновлюємо користувача
    const {id} = req.params;

    users[+id] = req.body;

    res.status(200).json({
        message:'User updated',
        data: users[+id]
    })
})

app.delete('/users/:id', (req, res) => { //видаляємо користувача
    const {id} = req.params;

    users.splice(+id, 1);

    res.status(200).json({
        message: 'User deleted'
    })
})

