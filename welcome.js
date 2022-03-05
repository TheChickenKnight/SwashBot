import { MessageAttachment, MessageEmbed } from "discord.js";
import { themedColor } from "./functions.js";

export function welcome(client, message) {
    const welcome = new MessageAttachment().setFile('./welcome.png');
    message.reply({
        embeds: [
            new MessageEmbed()
                .setColor(themedColor())
                .setImage('attachment://welcome.png')
                .setDescription('Thanks for adding SwashBot to your server!\nYou won\'t be dissappointed! ')
        ],
        files: [welcome]
    })
}