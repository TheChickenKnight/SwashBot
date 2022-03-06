import items from './item.js';

const prefix = [
    [
        'Fe',
        'Mil',
        'Cer',
        'Sid',
        'Koro',
        'Frera',
        'Peli',
        'Oestro',
        'Mex',
        'Jol',
        'Yo',
        'Whee',
        'Char',
        'Hun',
        'Per',
        'Sive',
        'Min',
        'Fin',
        'No',
        'A',
        'Fair',
        'Pestl',
        'Serf',
        'Hei',
        'Pili',
        'Cind',
        'Bun',
        'Did',
        'Sinn',
        'Mist',
        'Ger',
        'Nom'
    ],
    [
        'nom',
        'eon',
        'fer',
        'dee',
        'mello',
        'diddl',
        'spin',
        'gel',
        'edge',
        'cert',
        '',
        'oo',
        'idli',
        'est'
    ],
    [
        'nom',
        'eon',
        'ium',
        'styria',
        'land',
        'and',
        '',
        'mia',
        'er',
        'ion',
        'iliea',
        'ly',
        'ert',
        'uid',
        'um',
        'doo',
        'room',
        'ford',
        'more',
        'estle'
    ]
];

export class Island {
    constructor() {
        this.name = prefix[0][Math.floor(Math.random()*prefix[0].length)] + prefix[1][Math.floor(Math.random()*prefix[1].length)] + prefix[2][Math.floor(Math.random()*prefix[2].length)];
    }

    setRand(level, id) {
        this.level = level;
        this.id = id;
        this.people = [id];
        this.distance = Math.floor(Math.random() * 100);
        this.fishes = [];
        for (let i = 0; i <= 3; i++) {
            this.fishes.push([]);
            for (let j = 0; items.has('0.' + i + j); j++)
                if ((i == 0 && !Math.floor(Math.random()*3)) || (i == 1 && !Math.floor(Math.random()*1.5)) || (i == 2 && !Math.floor(Math.random()*7)) || (!Math.floor(Math.random()*20)))
                    this.fishes[i].push(items.get('0.' + i + j));
        }
        return this;
    }


}