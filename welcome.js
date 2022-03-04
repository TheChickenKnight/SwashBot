import { MessageAttachment, MessageEmbed } from "discord.js";
import { themedColor } from "./functions.js";

export async function welcome(client, message) {
    const welcome = new MessageAttachment().setFile('./welcome.png');
    message.reply({
        embeds: [
            new MessageEmbed()
                .setColor(themedColor())
                .setImage('attachment://welcome.png')
                .setDescription('Thanks for adding SwashBot to your server! that makes it ' + client.guilds.cache.size() + ' servers!\nYou won\'t be dissappointed! ')
        ],
        files: [welcome]
    })
}