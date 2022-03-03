import { MessageActionRow, MessageEmbed, MessageSelectMenu } from "discord.js";
import { MyGuild } from "../../classes/guild.js";
import { addTimeout, caps } from "../../functions.js";
import { themedColor } from "../imports.js";

export const info = {
    name: 'help',
    cooldown: 5,
    section: 'utility',
    description: 'Helps you with all of your commands.',
    usage: 'help <`none` or `command name` or `command section`',
};

export async function run(client, message, args) {
    if (!args[0])
        return await genericHelp(client, message, client.folders[0]);
        args[0] = args[0].toLowerCase();
    if (Array.from(client.aliases.keys()).includes(args[0]))
        args[0] = client.aliases.get(args[0]);
    if (client.commandFiles.includes(args[0] + '.js'))
        return await specificCommandHelp(client, message, args[0]);
    if (client.folders.includes(args[0])) 
        return await genericHelp(client, message, args[0]);
}

export async function menu(client, interaction) {
    await genericHelp(client, interaction, interaction.values[0], true);
}

async function genericHelp(client, sender, section, IorM) {
    let guild = await new MyGuild().fromID(sender.guildId);
    let actionRowArr = [
        new MessageActionRow().addComponents(
            new MessageSelectMenu()
                .setCustomId(`help_menu_${IorM ? sender.user.id : sender.author.id}_utility`)
                .setOptions(
                    client.folders.map(folder => {
                        return {
                            label: caps(folder) + ' Commands',
                            value: folder,
                            default: folder == section
                        }
                    })
                )
        )
    ];
    let msg;
    const parameters = {
        embeds: [
            new MessageEmbed()
                .setColor(themedColor())
                .setTitle("Help")
                .setDescription(
                    formatCommands(
                        guild.prefix, 
                        client.commands.filter(command => command.info.section == section)
                    )
                )
        ],
        components: actionRowArr
    };
    if (IorM) {
        msg = sender;
        await sender.update(parameters)
    } else
        msg = await sender.reply(parameters);
    addTimeout(actionRowArr, 10000, 'help', IorM ? sender.user.id : sender.author.id, msg, IorM);
    return;
}

function formatCommands(prefix, commands) {
    return commands.map(command => `**${prefix}[${command.info.name}](https://top.gg/bot/873255148338688060)**\n\`➥\` ${command.info.description}`).join('\n');
}

async function specificCommandHelp(client, message, command) {
    let guild = await new MyGuild().fromID(message.guildId);
    const commandObj = client.commands.get(command);
    await message.reply({
        embeds: [
            new MessageEmbed()
                .setColor(themedColor())
                .setTitle(guild.prefix + caps(commandObj.info.name))
                .setDescription('A **' + caps(commandObj.info.section) + '** command')
                .addField(
                    '**' + commandObj.info.description + '**', 
                    `${Object.keys(commandObj.info).includes('aliases') ? `**Aliases**: ${commandObj.info.aliases.join(', ')}` : ''}\n**Cooldown**: \`${commandObj.info.cooldown}\` seconds\n**Usage**: ${guild.prefix}${commandObj.info.usage}`
                )
        ]
    })
}