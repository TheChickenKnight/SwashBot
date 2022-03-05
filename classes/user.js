import { client } from "../index.js";
import dotenv from 'dotenv';
dotenv.config();

export class User {

    constructor() {

    }

    async fromID(id) {
        let user = client.users.cache.get(id);
        Object.assign(
            this, 
            Object.assign(
                user, 
                (await client.redis.HGET('users', id)) ||
                {
                    commands: 0,
                    xp: 0,
                    balance: 0,
                    locker: 0,
                    locker: undefined,
                    inventory: [],
                    hunger: 100,
                    stamina: 100,
                    pet: undefined,
                    admin: id == process.env.OWNER_ID,
                    status_effects: [],
                    boats: [],
                    fishing_rods: []   
                }
            )
        );
    }

    async set() {
        await client.redis.HSET('users', this.id, JSON.stringify(this));
    }
}