const fs = require('node:fs/promises');
const path = require('node:path');

// const foo = async () => {
//     const basePath = path.join(process.cwd(), 'baseFolder');
//
//     await fs.mkdir(basePath, {recursive: true});
//     const fileName = ['file1.txt', 'file2.txt', 'file3.txt', 'file4.txt'];
//     const folderName = ['folder1', 'folder2', 'folder3', 'folder4'];
//
//     for (const file of fileName) {
//         await fs.writeFile(path.join(basePath, file), 'HELLO');//створюємо файли
//     }
//
//     for (const folder of folderName) {
//         await fs.mkdir(path.join(basePath, folder), {recursive: true});
//     }
//
//     const files = await fs.readdir(basePath);
//     for (const file of files) {
//        const stat = await fs.stat(path.join(basePath, file));
//         console.log(path.join(basePath, file), ' : ', stat.isDirectory() ? 'folder' : 'file');
//     }

    // await fs.mkdir(path.join(process.cwd(),'pineapple','mango','watermelon'),{recursive:true})
    // // {recursive:true} потрібен для того,щоб створити якусь папку на шляху до якої щось не існує

// const foo = async () => {
//     const basePath = path.join(process.cwd(), 'baseFolder');
//
//     await fs.mkdir(basePath, {recursive: true});
//     const fileName = ['file1.txt', 'file2.txt', 'file3.txt', 'file4.txt'];
//     const folderName = ['folder1', 'folder2', 'folder3', 'folder4'];
//
//
//     for (const folder of folderName) {
//         const folderPath = path.join(basePath, folder);
//         await fs.mkdir(folderPath, {recursive: true});
//
//         for (const file of fileName) {
//             await fs.writeFile(path.join(folderPath, file), 'HELLO');//створюємо файли
//         }
//     }
//
//     const files = await fs.readdir(basePath);
//     for (const file of files) {
//         const stat = await fs.stat(path.join(basePath, file));
//         console.log(path.join(basePath, file), ' : ', stat.isDirectory() ? 'folder' : 'file');
//     }
// }


// Цикли for працюють послідовно, тому нам слід оптимізувати код, щоб операції виконувались паралельно
const foo = async () => {
    const basePath = path.join(process.cwd(), 'baseFolder');

    await fs.mkdir(basePath, {recursive: true});
    const fileName = ['file1.txt', 'file2.txt', 'file3.txt', 'file4.txt','file5.txt','file6.txt'];
    const folderName = ['folder1', 'folder2', 'folder3', 'folder4'];

    //всі створення папок виконуються паралельно
   await Promise.all(folderName.map(async(folder) => { // асинхронний map поверне масив промісів,які будуть виконуватись паралельно
       const folderPath = path.join(basePath, folder);
       await fs.mkdir(folderPath, {recursive: true});

       await Promise.allSettled( fileName.map(async(file) =>{//всі файликик будуть створюватись одночасно,потрібно лише зачекати
          await fs.writeFile(path.join(folderPath, file), 'HELLO');//створюємо файли
      }));
       //різниця між all та allSettled в тому, що all завалиться, якщо хоча б один проміс завалиться,
       //а allSettled він буде виконуватись, якщо хоча би одна папка існує і вона немає якогось там {recursive: true},
       // то проміс завалиться, але лише один

   }));
}
foo();


