import fs from 'fs';

const stats192 = fs.statSync('./public/icon-192.png');
const stats512 = fs.statSync('./public/icon-512.png');

console.log('icon-192.png size:', stats192.size);
console.log('icon-512.png size:', stats512.size);
