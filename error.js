import { client } from "./index.js"
import dotenv from 'dotenv';
dotenv.config();

export function errorHandling() {
    process.on('uncaughtException', async (error, origin) => {
        if (Date.now() - lastTime < 1000)
            return;
        console.log('----- Uncaught exception -----\n' + error + '\n----- Exception origin -----\n' + origin);
        (await client.users.fetch(process.env.OWNER_ID)).send('**----- Uncaught exception -----**\n' + error + '\n----- Exception origin -----\n' + origin + '\n---------------');
    });
    process.on('unhandledRejection', async (reason, promise) => {
        if (Date.now() - lastTime < 1000)
            return;
        console.log('----- Unhandled Rejection at -----\n' + promise + '\n----- Reason -----\n' + reason);
        (await client.users.fetch(process.env.OWNER_ID)).send('**----- Unhandled Rejection at -----**\n' + promise + '\n----- Reason -----\n' + reason + '\n---------------');
    });
}