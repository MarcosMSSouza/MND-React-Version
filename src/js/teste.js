// const fs = require('fs');

// //////////
// const XLSX = require('xlsx');

// const result = XLSX.readFile('MNDcardsList.xlsx');

// const sheet = result.Sheets['allsets'];

// const jsonTESTE = XLSX.utils.sheet_to_json(sheet);

// fs.writeFile('NEW FILE FS.json', JSON.stringify(jsonTESTE), err => {
//   if (err) throw err;
//   console.log('dataSaved');
// });

// console.log(jsonTESTE[0]);

// alt shift F = auto formater

/////////////////////////////////

// const fs = require('fs');
// const allJPG = require('jpg');

// const folderPath = './src/changeNamesTeste';
// const files = fs.readdirSync(folderPath);

// console.log(files);

// files.forEach(file => {
//   const timestamp = Date.now();
//   const fileExt = path.extname(file);
//   const fileName = path.basename(file, fileExt);
//   const newFileName = `${fileName}-${timestamp}${fileExt}`;
//   fs.renameSync(folderPath + file, folderPath + newFileName);
// });
// console.log('hi');
// //requiring path and fs modules
// const fs = require('fs');
// const path = require('path');
// //joining path of directory
// const directoryPath = '/src/changeNamesTeste';
// const extension = 'jpg';
// //passsing directoryPath and callback function
// fs.readdir(directoryPath, function (err, files) {
//   //handling error
//   if (err) {
//     return console.log('Unable to scan directory: ' + err);
//   }
//   //listing all files using forEach
//   jpgFiles.forEach(function (file) {
//     // Do whatever you want to do with the file
//     console.log(file);
//   });
// });
