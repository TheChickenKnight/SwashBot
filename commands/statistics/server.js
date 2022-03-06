import { MessageEmbed } from "discord.js";
import { MyGuild } from "../../classes/guild.js";
import { themedColor } from "../../functions.js";

export const info = {
    name: 'server',
    cooldown: 5,
    section: 'statistics',
    description: 'Gives you the stats of the server your on!',
    usage: 'server',
};

export async function run(client, message, args) {
    let myGuild = await new MyGuild().fromID(message.guildId);
    let owner = await message.guild.fetchOwner();
    console.log(owner)
    message.reply({
        embeds: [
            new MessageEmbed()
                .setColor(themedColor())
                .setTitle('The Server Called\n'  + message.guild.name)
                .setAuthor({
                    name: 'Owned by ' + owner.user.username,
                    iconURL: owner.displayAvatarURL({type: 'png'})
                })
                .setThumbnail(message.guild.icon)
                .setDescription(message.guild.description || '\u200b')
                .addFields(
                    {
                        name: 'SwashBot Stats', value: 
                        'Commands: `' + myGuild.commands + '`\n' +
                        'Prefix: `' + myGuild.prefix + '`'
                    },
                    { 
                        name: 'Misc. Stats', value: 
                        'Channels: `' + message.guild.channels.cache.size + '`\n' + 
                        'Bans: `' + message.guild.bans.cache.size + '`\n' +
                        'Members: `' + message.guild.memberCount + '`'
                    }
                )
        ]
    });
}