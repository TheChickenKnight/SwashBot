import { Island } from "../../classes/island.js";
import { User } from "../../classes/user.js";

export const info = {
    name: 'start',
    cooldown: 30,
    section: 'pirating',
    description: 'start on an island!',
    usage: 'start',
};

export async function run(client, message, args) {
    let user = await new User().fromID(message.author.id);
    if (user.started)
        return message.error('You\'ve already started!');
    user.started = true;
    Object.assign(user, {
        balance: 0,
        locker: 0,
        locker: undefined,
        inventory: [],
        hunger: 100,
        stamina: 100,
        pet: undefined,
        status_effects: [],
        boats: [],
        fishing_rods: [],  
    });
}