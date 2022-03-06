import { MessageEmbed } from "discord.js";
import { MyGuild } from "../../classes/guild.js";

export const info = {
    name: 'prefix',
    cooldown: 10,
    section: 'utility',
    description: 'change the current prefix! The prefix should have no spaces and be less than 6 characters! Keep in mind that it is case sensitive!',
    usage: 'prefix <`prefix`>',
};

export async function run(client, message, args) {
    if (!args[0])
        return message.error('You have to specify a prefix!');
    if (args.join(' ').includes(' '))
        return message.error('Prefix can\'t contain spaces!');
    if (args[0].length > 5)
        return message.error('Prefix has to be less than 6 characters!');
    let guild = await new MyGuild().fromID(message.guilId);
    if (guild.prefix == args[0])
        return message.error('That is already the prefix!');
    guild.prefix = args[0];
    await guild.set();
    message.reply({
        embeds: [
            new MessageEmbed()
                .setColor("#23ad2e")
                .setDescription('✔️ The prefix was changed to `' + args[0] + '`')
        ]
    })
}