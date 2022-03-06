import { Collection, MessageActionRow, MessageEmbed, MessageSelectMenu } from "discord.js";
import { User } from "../../classes/user.js";
import { caps } from "../../functions.js";

export const info = {
    name: 'settings',
    cooldown: 5,
    section: 'utility',
    aliases: ['setting'],
    description: 'Allows you to change the various settings that ecist in this discord bot!',
    usage: 'settings <`none` or `setting name` or `setting section`>',
};

export async function run(client, message, args) {
    let user = await new User().fromID(message.author.id);
    let section = Object.keys(user.settings)[0];
    if (args.length == 1 && Object.keys(user.settings).includes(args[0].toLowerCase())) {
        section = args[0].toLowerCase();
        args = [];
    }
    if (!args[0])
        return message.reply({
            embeds: [
                new MessageEmbed()
                    .setColor('NOT_QUITE_BLACK')
                    .setTitle(caps(section) + ' Settings')
                    .setDescription(genPage(user, section))
            ],
            components: [
                new MessageActionRow()
                    .addComponents(genMenu(user, section))
            ]
        });
    let settings = new Collection();
    for (let section of Object.keys(user.settings))
        for (let setting of Object.keys(user.settings[section]))
            settings.set(setting, section);
    if (settings.has(args[0]))
        args = [settings.get(args[0]), args[0], args[1]];
    if (Object.keys(user.settings).includes(args[0].toLowerCase()) && Object.keys(user.settings[args[0].toLowerCase()]).includes(args[1].toLowerCase()))
       if (changeSetting(args, user)) {
           await user.set();
           message.reply({
               embeds: [
                   new MessageEmbed()
                    .setColor('#23ad2e')
                    .setDescription('\✔️ You have changed the `' + args[1] + '` setting to `' + args[2] + '` succesfully!')
               ]
           });
       } else
        message.error('Something went wrong! Perhaps you misspelled the command or what you wanted to change it to!');
}

export async function menu(client, interaction) {
    let user = await new User().fromID(interaction.user.id);
    message.reply({
        embeds: [
            new MessageEmbed()
                .setColor('NOT_QUITE_BLACK')
                .setTitle(caps(interaction.values[0]) + ' Settings')
                .setDescription(genPage(user, user.settings[interaction.values[0]]))
        ],
        components: [
            new MessageActionRow()
                .addComponents(genMenu(user, user.settings[interaction.values[0]]))
        ]
    });
}

function genPage(user, page) {
    return Object.entries(user.settings[page]).map(setting => caps(setting[0]).replace(/\_/g, ' ') + ': `' + setting[1] + '`').join('\n');
}

function genMenu(user, page) {
    return new MessageSelectMenu()
        .setCustomId(`settings_menu_${user.id}_utility`)
        .addOptions(Object.keys(user.settings).map(setting => {
            return { label: caps(setting.replace(/\_/g, ' ')) + ' Settings', value: setting, default: setting == page, emoji: '⚪'};
        }));
}

function changeSetting(args, user) {
    switch(args[2]) {
        case 'true':
            if (user.settings[args[0]][args[1]] == false) {
                user.settings[args[0]][args[1]] = true;
                return true;
            } 
            return false;
        case 'false':
            if (user.settings[args[0]][args[1]] == true) {
                user.settings[args[0]][args[1]] = false;
                return true;
            } 
            return false;
        default: 
            if (typeof user.settings[args[0]][args[1]] == typeof args[2]) {
                user.settings[args[0]][args[1]] = args[2];
                return true;
            }
        return false;
     }
}