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
    client.timeIDs.get(command).set(author, setTimeout(() => {
        if (interactionORmessage)
            try {
                sender.update({
                    components: [actionrow]
                });
            } catch {
                sender.update({
                    components: [actionrow]
                });
            }
        else 
            sender.edit({
                components: [actionrow]
            });
    }, time));
}