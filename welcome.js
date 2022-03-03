import { MessageAttachment, MessageEmbed } from "discord.js";
import { themedColor } from "./functions.js";

export async function welcome(client, message) {
    const welcome = new MessageAttachment().setFile('./welcome.png');
    message.reply({
        embeds: [
            new MessageEmbed()
                .setColor(themedColor())
                .setImage('attachment://welcome.png')
        ],
        files: [welcome]
    })
}