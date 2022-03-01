import { Client, Collection, Intents } from "discord.js";
import fs from 'fs'; 
import dotenv from 'dotenv';
dotenv.config();
import redis from 'async-redis';

const client = new Client({
    ws: { 
        properties: { 
            $browser: 'Discord iOS'
        }
    }, 
    intents: [ 
        Intents.FLAGS.GUILDS, 
        Intents.FLAGS.GUILD_MESSAGES, 
        Intents.FLAGS.GUILD_VOICE_STATES, 
        Intents.FLAGS.DIRECT_MESSAGES, 
        Intents.FLAGS.GUILD_WEBHOOKS 
    ]
});

client.folders = fs.readdirSync('./commands/');
var commandFiles = [];


//-------------------------------------|| Error Handling ||-------------------------------\\
/*
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
});*/
//------------------------------------------------------------------------------------------//

client.redis = redis.createClient({
    url: 'redis://LGMIDtbhfWtHuYKEv2wrnNx5jV3OioVv@redis-18411.c283.us-east-1-4.ec2.cloud.redislabs.com:18411'
});

client.commands = new Collection(), client.aliases = new Collection(), client.cooldowns = new Collection();

client.status;

client.once('ready', async () => {
    client.status = 'on ' + client.guilds.cache.size + ' servers';
    await client.folders.forEach(async folder => fs.readdirSync(`./commands/${folder}/`).filter(async file => file.endsWith('.js')).forEach(async file => {
        const command = await import(`./commands/${folder}/${file}`);
        client.commands.set(command.info.name, command);
        if (command.info.aliases)
            command.info.aliases.forEach(alias => client.aliases.set(alias, command.info.name));
        console.log(file + ' Loaded!');
        commandFiles.push(file);
    }));
    client.user.setPresence({ activity: null });
    client.user.setPresence({ activities: [{name: client.status }], status: 'online'});
    console.log(`Loaded all ${commandFiles.length} commands`);
    client.on('messageCreate', async message => {
        if (!message.guild || message.author.bot)
            return;
        if (!(await client.redis.HEXISTS(`guildSpec_${message.guild.id}`, 'prefix'))) {
            await client.redis.HSET(`guildSpec_${message.guild.id}`, 'prefix', 's!');
            client.status = 'on ' + client.guilds.cache.size + ' servers';
            client.user.setPresence({ activity: null });
            client.user.setPresence({ activities: [{name: client.status, type: 'PLAYING'}], status: 'online'});
        }
        const prefix = await client.redis.HGET(`guildSpec_${message.guild.id}`, 'prefix');
        if (message.content.includes(process.env.BOT_ID) && message.content.toLowerCase().includes('reset')) {
            await client.redis.HSET(`guildSpec_${message.guildId}`, 'prefix', 's!');
            return message.reply('Got it! the prefix has been reset to `s!`!');
        }
        if (message.content.includes(process.env.BOT_ID))
            return message.reply(`My prefix is \`${prefix}\`!`);
        var commandName = message.content.replace(prefix, '').split(' ')[0];
        if (commandFiles.includes(client.aliases.get(commandName) + '.js'))
            commandName = client.aliases.get(commandName);
        if (!message.content.startsWith(prefix))
            return;
        const commandObj = client.commands.get(commandName);
        if (!commandObj)
            return;
        if (message.author.id !== process.env.OWNER_ID && commandObj.info.cooldown >= 1) {
            if (!client.cooldowns.has(commandName))
                client.cooldowns.set(commandName, new Collection());
            var cooldowns = client.cooldowns.get(commandName);
            if (cooldowns.has(message.author.id)) {
                const time = Date.now() - cooldowns.get(message.author.id);
                if (time / 1000 < commandObj.info.cooldown)
                    return message.reply(`Woah, slow down! You can use \`${prefix}${commandName}\` in **${(commandObj.info.cooldown - (time / 1000)).toString().replace(/(?<=\.[0-9])[0-9]+/, '')}** second(s)!`);
            }
        }
        if (commandObj.info.section == 'admin' && message.author.id != process.env.OWNER_ID)
            return;
        if (message.author.id !== process.env.OWNER_ID)
            client.cooldowns.get(commandName).set(message.author.id, Date.now());
        message.channel.sendTyping();
        if (commandObj.info.section != 'admin')
            console.log(message.content + ' | on server ' + message.guild.name);
        commandObj.run(client, message, message.content.replace(prefix, '').replace(/^(.+?( |$))/, '').split(' ').filter(item => item.length > 0));
    });


    client.on('interactionCreate', async interaction => {
        if (interaction.customId.startsWith('disabled'))
            return;
        let props = await import(`./commands/${interaction.customId.split('_').pop()}/${interaction.customId.split('_').shift()}.js`);
        if (!interaction.customId.split('_')[2].split('<->').includes(interaction.user.id) && interaction.customId.split('_')[2] !== 'all')
            return interaction.reply({content: 'This isn\'t your toast!', ephemeral: true});
        if (interaction.isSelectMenu())
            props.menu(client, interaction);
        else if (interaction.isButton())
            props.button(client, interaction);
        else 
            console.log(interaction);
    });
});

client.login(process.env.TOKEN);