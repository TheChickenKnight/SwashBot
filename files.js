import { client } from "./index.js";
import fs from 'fs';

export async function initFiles() {
    let commandFiles = [];
    for (let folder of client.folders) {
        let files = fs.readdirSync(`./commands/${folder}/`).filter(file => file.endsWith('.js'));
        for (let file of files) {
            const command = await import(`./commands/${folder}/${file}`);
            client.commands.set(command.info.name, command);
            if (command.info.aliases)
                for (let alias of command.info.aliases) 
                    client.aliases.set(alias, command.info.name);
            console.log(file + ' Loaded!');
            commandFiles.push(file);
        }
    }
    return commandFiles;
}