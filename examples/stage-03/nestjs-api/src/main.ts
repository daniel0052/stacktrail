import {makeApp} from './app.js';
const port=Number(process.env.PORT??3002);
if(!Number.isInteger(port)||port<1||port>65535)throw new Error('PORT inválida');
const app=await makeApp();app.enableShutdownHooks();await app.listen(port,'127.0.0.1');console.log(`Nest local em http://127.0.0.1:${port}`);
