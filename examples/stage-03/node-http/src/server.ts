import {makeServer} from './app.js';
const port=Number(process.env.PORT??3000);
if(!Number.isInteger(port)||port<1||port>65535)throw new Error('PORT inválida');
const server=makeServer();server.listen(port,'127.0.0.1',()=>console.log(`HTTP local em http://127.0.0.1:${port}`));
server.on('error',error=>{console.error(error.message);process.exitCode=1;});
for(const signal of ['SIGINT','SIGTERM'] as const)process.on(signal,()=>server.close());
