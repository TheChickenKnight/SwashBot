import { MessageActionRow, MessageEmbed, MessageSelectMenu } from "discord.js";
import { themedColor } from "../imports.js";

export const info = {
    name: 'help',
    cooldown: 5,
    section: 'utility',
    description: 'Helps you with all of your commands.',
    usage: '<(prefix)>help <`none` or `command name` or `command section`',
    menu: 10000
};

export function run(client, message, args) {
    if (!args[0])
        return genericHelp(client, message, args);
    if (Array.from(client.aliases).includes(args[0]))
        args[0] = client.aliases.get(args[0]);
    if (client.commandFiles.includes(args[0]))
        return specificCommandHelp(client, message, args);
    if (client.folders.includes(args[0])) 
        return specificSectionHelp(client, message, args);
}

function genericHelp(client, message, args) {
    let prefix = message.content.split(' ')[0].replace(info.name, '');
    let commands = [];
    client.commands.forEach(command => {
        if (command.info.section == client.folders[0])
            commands.push(command);
    });
    return message.reply({
        embeds: [
            new MessageEmbed()
                .setColor(themedColor())
                .setTitle("Help")
                .setDescription(formatCommands(client, prefix, commands))
        ]
    })
}

export const disabled = new MessageActionRow().addComponents(
    new MessageSelectMenu()
        .setCustomId('help_disabled')
        .setDisabled(true)
        .setPlaceholder('Choose A Section')
);


function formatCommands(client, prefix, commands) {
    return commands.map(command => `**${prefix}[${command.info.name}](https://top.gg/bot/873255148338688060)**\n➥ ${command.info.description}`).join('\n');
}

function specificCommandHelp(client, message, args) {

}

function specificSectionHelp(client, message, args) {

}