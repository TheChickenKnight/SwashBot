import { Collection } from "discord.js";

const items = {
    fish: [
        {
            name: 'seaweed',
            id: "0.00",
            cost: 0,
            type: 'fish',
            rarity: 'trash',
            emoji: '<:seaweed:949714097220489336>',
            description: 'green stuff. On the ground.',
            color: "#4bd629",
            image: 'https://d279m997dpfwgl.cloudfront.net/wp/2020/07/GettyImages-1185351276.jpg'
        },
        {
            name: 'boots',
            id: "0.01",
            cost: 0,
            type: 'fish',
            rarity: 'trash',
            emoji: '🥾',
            description: 'old worn boots. I wonder who used to wear them?',
            color: "#ad6823",
            image: 'https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX4439997.jpg'
        },
        {
            name: 'money',
            id: "0.02",
            cost: { min: 1, max: 5},
            type: 'fish',
            rarity: 'trash',
            emoji: '💵',
            description: 'money! It\'s not even that soggy!',
            color: "#35f051",
            image: 'http://www.poolpricer.com/wp-content/uploads/2012/03/bill-underwater.jpg'
        },
        {
            name: 'guppy',
            id: "0.10",
            cost: { min: 1, max: 2},
            type: 'fish',
            rarity: 'common',
            emoji: '<:smallfish:949703514257518622>',
            description: 'One of the smallest of fishies. A popular pet fish! they come in many colors.',
            color: "#949494",
            image: "https://i.natgeofe.com/n/37585765-1a17-4f56-87da-65979faf9aff/01-guppy-oo_192842_16x9.jpg?w=1200",
            weight: "<1 kg",
            lifespan: '2 years',
            length: '2-6 cm'
        },
        {
            name: 'goldfish',
            id: "0.11",
            cost: { min: 1, max: 2},
            type: 'fish',
            rarity: 'common',
            emoji: '<:smallfish:949703514257518622>',
            description: 'A relatively small fish with various colors and sizes. One of the most common fish. Has been bred and domesticated by people for centuries!',
            color: '#f0bd46',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Katri.jpg/440px-Katri.jpg',
            weight: '<1 kg - 4 kg',
            lifespan: '10+ years',
            length: '6-15 in'
        },
        {
            name: 'zebrafish',
            id: "0.12",
            cost: { min: 1, max: 3},
            type: 'fish',
            rarity: 'common',
            emoji: '<:smallfish:949703514257518622>',
            description: 'A popular aquarium fish which is also a tropical fish! Belongs to the minnow family.',
            color: '#f0f0f0',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Zebrafisch.jpg/440px-Zebrafisch.jpg',
            weight: '<1 kg',
            length: '4-5 cm',
            lifespan: '2-3 years'
        },
        {
            name: 'anchovy',
            id: "0.13",
            cost: { min: 1, max: 5},
            type: 'fish',
            rarity: 'common',
            emoji: '<:smallfish:949703514257518622>',
            description: 'A popular food! Not sure why, they tend to smell foul!',
            color: '#666562',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Anchovy_closeup.jpg/440px-Anchovy_closeup.jpg',
            weight: '<1 kg',
            length: '2-40 cm',
            lifespan: '2-4 years'
        },
        {
            name: 'clownfish',
            id: "0.14",
            cost: { min: 3, max: 5},
            type: 'fish',
            rarity: 'common',
            emoji: '<:smallfish:949703514257518622>',
            description: 'Smart fishes who utilize sea anemones for protection!',
            color: '#ff9100',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Amphiprion_ocellaris_%28Clown_anemonefish%29_by_Nick_Hobgood.jpg/440px-Amphiprion_ocellaris_%28Clown_anemonefish%29_by_Nick_Hobgood.jpg',
            weight: '0.5 lbs',
            length: '7-17 cm',
            lifespan: '6-10 years'
        },
        {
            name: 'neon tetra',
            id: "0.15",
            cost: { min: 4, max: 5},
            type: 'fish',
            rarity: 'common',
            emoji: '<:smallfish:949703514257518622>',
            description: 'one of the most widely kept tropical fish in the word! It has beautiful colors.',
            color: '#a3ffea',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Neonsalmler_Paracheirodon_innesi.jpg/440px-Neonsalmler_Paracheirodon_innesi.jpg',
            weight: '<1 kg',
            length: '4 cm',
            lifespan: '2-10 years'
        },
        {
            name: 'rosy barb',
            id: "0.16",
            cost: { min: 2, max: 4},
            type: 'fish',
            rarity: 'common',
            emoji: '<:smallfish:949703514257518622>',
            description: 'A beautiful, small fish similar to goldfish.',
            color: '#ff9a1f',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Rosy_barb_friends.jpg/440px-Rosy_barb_friends.jpg',
            weight: '0.34 kg',
            length: '14 cm',
            lifespan: '5 years'
        },
        {
            name: 'angelfish',
            id: "0.17",
            cost: { min: 3, max: 4},
            type: 'fish',
            rarity: 'common',
            emoji: '<:smallfish:949703514257518622>',
            description: 'Unusually shaped fish. They are quite thin, allowing them to hide between things easily.',
            color: '#b5b5b5',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Freshwater_angelfish_biodome.jpg/440px-Freshwater_angelfish_biodome.jpg',
            weight: '<1 kg',
            length: '3-7 cm',
            lifespan: '15 years'
        },
        {
            name: 'goby',
            id: "0.20",
            cost: { min: 5, max: 7},
            type: 'fish',
            rarity: 'uncommon',
            emoji: '<:medium_fish:949718580902121482>',
            description: 'A peculiar fish with a sucker taht allows it to stay still in rough currents.',
            color: '#c2924f',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Gobius_niger_%28Stefano_Guerrieri%29_1.jpg/440px-Gobius_niger_%28Stefano_Guerrieri%29_1.jpg',
            weight: '<1 kg - 3 kg',
            length: '9 mm - 30 cm',
            lifespan: '1 - 10 years'
        },
        {
            name: 'needle fish',
            id: "0.21",
            cost: { min: 2, max: 9},
            type: 'fish',
            rarity: 'uncommon',
            emoji: '<:medium_fish:949718580902121482>',
            description: 'Slender fish with long, narrow jaws. Their upper jaw grows slower than their bottom one.',
            color: '#dbdbdb',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Needlefish2.JPG/440px-Needlefish2.JPG',
            weight: '<5.07 lbs',
            length: '3-95 cm',
            lifespan: '3-4 years'
        },
        {
            name: 'blowfish',
            id: "0.22",
            cost: { min: 6, max: 8},
            type: 'fish',
            rarity: 'uncommon',
            emoji: '<:medium_fish:949718580902121482>'
        },
        {
            name: 'barracuda',
            id: "0.23",
            cost: { min: 8, max: 10},
            type: 'fish',
            rarity: 'uncommon',
            emoji: '<:medium_fish:949718580902121482>'
        },
        {
            name: 'sturgeon',
            id: "0.24",
            cost: { min: 7, max: 11},
            type: 'fish',
            rarity: 'uncommon',
            emoji: '<:medium_fish:949718580902121482>'
        },
        {
            name: 'tarpon',
            id: "0.25",
            cost: { min: 9, max: 10},
            type: 'fish',
            rarity: 'uncommon',
            emoji: '<:medium_fish:949718580902121482>'
        },
        {
            name: 'goldfinch',
            id: "0.26",
            cost: 10,
            type: 'fish',
            rarity: 'uncommon',
            emoji: '<:medium_fish:949718580902121482>'
        },
        {
            name: 'black tilapia',
            id: "0.27",
            cost: 7,
            type: 'fish',
            rarity: 'uncommon',
            emoji: '<:medium_fish:949718580902121482>'
        },
        {
            name: 'salmon',
            id: "0.28",
            cost: { min: 10, max: 11},
            type: 'fish',
            rarity: 'uncommon',
            emoji: '<:medium_fish:949718580902121482>'
        },
        {
            name: 'pike',
            id: "0.29",
            cost: { min: 9, max: 12},
            type: 'fish',
            rarity: 'uncommon',
            emoji: '<:medium_fish:949718580902121482>'
        },
        {
            name: 'grouper',
            id: "0.30",
            cost: { min: 1, max: 40 },
            type: 'fish',
            rarity: 'rare',
            emoji: '<:rare_fish:949735993299320842>'
        },
        {
            name: 'smalltooth sawfish',
            id: "0.31",
            cost: { min: 10, max: 20},
            type: 'fish',
            rarity: 'rare',
            emoji: '<:rare_fish:949735993299320842>'
        },
        {
            name: 'goblin shark',
            id: "0.32",
            cost: { min: 15, max: 18},
            type: 'fish',
            rarity: 'rare',
            emoji: '<:rare_fish:949735993299320842>'
        },
        {
            name: 'ornate sleeper ray',
            id: "0.33",
            cost: { min: 12, max: 22},
            type: 'fish',
            rarity: 'rare',
            emoji: '<:rare_fish:949735993299320842>'
        },
        {
            name: 'american paddlefish',
            id: "0.34",
            cost: { min: 9, max: 24},
            type: 'fish',
            rarity: 'rare',
            emoji: '<:rare_fish:949735993299320842>',
            description: 'This primitive fish has a long snout that looks like a paddle! It feeds by swimming through the water with it\'s mouth open and catches what it can!',
            image: "https://a-z-animals.com/media/2022/01/Types-of-rare-fish-American-Paddlefish.jpg",
            weight: '27 kg',
            lifespan: '30 years',
            length: '1.5 m'
        },
    ]
}

let all = new Collection();

for (let item of items.fish)
    all.set(item.id, item);

export default all;