import client from "./index.js"

export function errorHandling() {
    process.on('uncaughtException', async (error, origin) => {
        if (Date.now() - lastTime < 1000)
            return;
        console.log('----- Uncaught exception -----\n' + error + '\n----- Exception origin -----\n' + origin);
        (await client.users.fetch(process.env.OWNER_ID)).send('**----- Uncaught exception -----**\n' + error + '\n----- Exception origin -----\n' + origin + '\n---------------\nCommand ' + ((Object.keys(lastCommand).includes('commandObj') && lastCommand.commandObj.info.name) ? lastCommand.commandObj.info.name : 'Unknown'));
        if (lastCommand)
            lastCommand = undefined;
    });
    process.on('unhandledRejection', async (reason, promise) => {
        if (Date.now() - lastTime < 1000)
            return;
        console.log('----- Unhandled Rejection at -----\n' + promise + '\n----- Reason -----\n' + reason);
        if (lastCommand)
            lastCommand.message.reply(`It seems you have encountered an error while using this command! The developer has been notified!`);
        (await client.users.fetch(process.env.OWNER_ID)).send('**----- Unhandled Rejection at -----**\n' + promise + '\n----- Reason -----\n' + reason + '\n---------------\nCommand ' + (lastCommand ? lastCommand.commandObj.info.name : 'Unknown'));
        if (lastCommand)
            lastCommand = undefined;
    });
}