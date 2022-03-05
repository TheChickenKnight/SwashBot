import { Collection } from "discord.js";

const fishees = [
    {
        name: 'Common Guppy',
        id: 0,
        cost: 5,
        rarity: 0
    }
];

const fishes = [
    [
        {
            name: 'Common Guppy',
            id: 0,
            cost: 5,
            rarity: 0,
            type: 'small'
        },
        {
            name: 'Gold Fish',
            id: 0,
            cost: 5,
            rarity: 0,
            type: 'small'
        },
        {
            
        }
    ]
]

let fishies = new Collection();

for (let fish of fishes) 
    fishies.set(fish.name, fish);

export default fishies;