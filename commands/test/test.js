export const info = {
    name: 'test',
    cooldown: 2,
    section: 'test',
    description: 'test',
    usage: '<`prefix`>test'
};

import { client } from "index.js";

export function run(client, message, args) {message.reply({content:'test'})};