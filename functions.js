import { Collection } from "discord.js";
import { client } from "./index.js";

export function themedColor() {
    const colors = [
        "#f0d893",
        "#32c3e7",
        "#3366cc",
        "#000099",
        "#ffdab3",
        "#ffb566",
        "#ffc180"
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

export function addTimeout(actionrow, time, command, author, sender, interactionORmessage) {
    let newactionrow = actionrow.map(arr => {
        arr.components.forEach(component => component.setDisabled(true))
        return arr;
    });
    if (!Array.from(client.timeIDs.keys()).includes(command))
        client.timeIDs.set(command, new Collection());
    client.timeIDs.get(command).set(author, setTimeout(() => {
        if (interactionORmessage)
            sender.editReply({
                components: newactionrow
            });
        else 
            sender.edit({
                components: newactionrow
            });
    }, time));
}

export function caps(text) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

export const tips = [
    "do (prefix)start to start your pirating adventure (you get more xp in general from starting)!",
    "use the settings command to turn off these pesky tips!",
    "you can stop me from pinging you with every command in settings!"
];