export enum Suit {
    Spades,
    Clubs,
    Hearts,
    Diamonds,
};



export class Card {
    readonly rank: number;
    readonly suit: number;

    constructor(rank: number, suit: Suit) {
        this.rank = rank;  //номер карты  
        this.suit = suit;  // масть сотв-я
    }



    static #rankNames = [     // ( 13 шт в массиве / 52 в колоде)
        'Ace',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        'Jack',
        'Queen',
        'King',
    ];

    get rankName(): string { //читаем имя карты из массива
        return Card.#rankNames[this.rank - 1];
    }

    get suitName(): string { //читаем имя масти (из enum)
        return Suit[this.suit];
    }

    get name(): string { //составим полную карту
        return this.rankName + 'of' + this.suitName;
    }

    get imageName(): string { //вернет имя картинки в виде строки
        let s: string;
        let r: string;

        if (this.rank === 1 || this.rank > 10) { //для карт с буквенным именем
            r = this.rankName.charAt(0);
        } else {
            r = this.rank + '';  //вернет строку с числом
        }

        s = this.suitName.charAt(0);  // 1 буква масти


        return r + s;  //!!


    }

}

