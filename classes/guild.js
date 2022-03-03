import { client } from "../index.js";

export class MyGuild {
    constructor(obj) {
        let keys;
        if (obj) {
            keys = Object.keys(obj);
            if (keys.includes('obj'))
                Object.assign(this, obj.obj);
            else if (keys.includes('string'))
                Object.assign(this, JSON.parse(obj.string));
        }
    }


    async fromID(id) {
        const guild = client.guilds.cache.get(id);
        Object.assign(this, JSON.parse(await client.redis.HGET('guildSpec', id)) || {
            prefix: 's!',
            name: guild.name,
            id: id,
            new : true,
            commands: 0
        });
        return this;
    }

    async set() {
        await client.redis.HSET('guildSpec', this.id, JSON.stringify(this));
    }
}