import {makeApp} from './app.js';
const server=makeApp().listen(8001,'127.0.0.1',()=>console.log('API local emhttp://127.0.0.1:8001'));
process.on('SIGTERM',()=>server.close());process.on('SIGINT',()=>server.close());
