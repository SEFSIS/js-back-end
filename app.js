//MODULES//
// const {sayHello} = require('./helpers/sayHello.helper')
//
// sayHello();

//GLOBAL VARIABLE//
// __dirname, __filename, process.cwd();
// console.log(__dirname);// виводить шлях до теперішньої директорії
// console.log(__filename);//будує шлях до теперішнього файлу
// console.log(process.cwd());//будує шлях до того файлу, який запускаємо
// CWD - current working

//PATH
//
// const path = require('path');
// C:\Users\User\IdeaProjects\js-back-end> --- Windows
// Users/User/IdeaProjects/js-back-end>  --- UNIX system (Linux, Mac)
//
// const joinedPath = path.join(__dirname,'folder', 'folder2', 'text.txt')//метод join з'єднує всі шляхи
// console.log(joinedPath);
//
// const normalizedPath = path.normalize('////test////test2///test3///////test4');
// console.log(normalizedPath);
//
// const resolvedPath = path.resolve('folder', 'folder2', 'text.txt');
// console.log(resolvedPath);

//OS - дає нам доступ до операційної системи
//
// const os = require('os');
// const{ exec } = require('child_process');// ?в середині ноди запускаємо барскріпти(скріпти,які використовуються в UNIX-системах для того, щоб якось маніпулювати вашою оп)?
//
// console.log(os.cpus()); //виводить інформацію про ядра ноута
// console.log(os.arch()); //архітектура компа
// console.log(os.release());
// console.log(os.uptime());//виведе час скільки ноут запущений

//FILE SYSTEM
// const fs = require('fs');
// const path = require('path');
//
// const text2Path = path.join(__dirname,'folder', 'folder2', 'text2.txt');
//
//
//
// fs.readFile(text2Path,{encoding:'utf-8' },  (err, data)=>{
//     if (err) throw new Error(err.message);
//     console.log(data);
//     // console.log(data.toString());
// })//читає файл
//
// fs.appendFile(text2Path, '\n I love programming', (err) =>{
//     if (err) throw new Error(err.message);
// } )//дозаписує якусь інфу в середину нашого файлу
//
// fs.truncate(text2Path, (err)=>{
//     if (err) throw new Error(err.message);
// })//видаляє наповнення файлу
//
// fs.unlink(text2Path, (err)=>{
//     if (err) throw new Error(err.message);
// })//видаляє файл
//
// fs.readdir(path.join(__dirname, 'folder'),{withFileTypes: true}, (err, files)=>{
//     if (err) throw new Error(err.message);
//    files.forEach(file=>{
//        //console.log(file.isFile());//отрмуємо значення true, якщо це є файл
//        console.log(file.isDirectory());//отрмуємо значення true, якщо це є директорія
//    })
// })//можемо прочитати директорію певну
//
// fs.mkdir(path.join(__dirname,'folder','folder4'), (err)=>{
//     if (err) throw new Error(err.message);
// })//створюємо  директорію
//
// fs.rmdir(path.join(__dirname,'folder','folder4'), (err)=>{
//     if (err) throw new Error(err.message);
// })//видаляємо  директорію
//
// fs.rm(path.join(__dirname,'folder','folder3'), {recursive: true}, (err)=>{
//     if (err) throw new Error(err.message);
// })//видаляємо  директорію


