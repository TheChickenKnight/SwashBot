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
                JSON.parse(await client.redis.HGET('users', id)) ||
                {
                    commands: 0,
                    xp: 0,
                    admin: id == process.env.OWNER_ID,
                    started: false, 
                    settings: {
                        general: {
                            tips: true,
                            ping_on_reply: true
                        }
                    }
                }
            )
        );
        return this;
    }

    async set() {
        await client.redis.HSET('users', this.id, JSON.stringify(this));
    }
}