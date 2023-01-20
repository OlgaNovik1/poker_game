import { Card } from "./Card";
import { Kinds, KindsGroup } from "./Kinds";


export interface HandRank {
    name: string,     //имя комбинации
    payout: number,   //выплата
};

export interface Score {
    rank: HandRank,  //имя комбинации выигрышной и выплата
    scoringCards: Card[], //только выигрышные карты в массиве хранятся
};



let Ranks: { [x: string]: HandRank } = {

    ROYAL_FLUSH: {
        name: 'Royal Flush',
        payout: 800,
    },

    STRAIGHT_FLUSH: {
        name: 'Straight Flush',
        payout: 50,
    },

    FOUR_OF_A_KIND: {
        name: 'Four of a Kind',
        payout: 25,
    },

    FULL_HOUSE: {
        name: 'Full House',
        payout: 9,
    },

    FLUSH: {
        name: 'Flush',
        payout: 6,
    },

    STRAIGHT: {
        name: 'Straight',
        payout: 5,
    },

    THREE_OF_A_KIND: {
        name: 'Three of a Kind',
        payout: 4,
    },

    TWO_PAIR: {
        name: 'Two Pair',
        payout: 4,
    },

    JACKS_OR_BETTER: {
        name: 'Jacks or Better',
        payout: 2,
    },

    NOTHING: {
        name: 'Nothing',
        payout: 0,
    },
};




//3) карты в руке 5 шт
export class Hand {
    readonly cards: Card[];

    constructor(cards?: Card[]) { //принимает массив карт
        if (cards !== undefined) {
            this.cards = cards;
        } else {
            this.cards = [];
        }
    }


    //явл ли карты в массиве одной масти
    #isFlush(): boolean {
        let suit = this.cards[0].suit; //читаем первую карту

        return this.cards.every(c => c.suit === suit);
    }


    // явл ли карты в массиве по возрастанию
    #isStraight(): boolean {
        return this.#isAceHighStraight() || this.#isAceLowStraight();
    }



    //если туз - старшая карта (10,J,Q,K,A)
    #isAceHighStraight(): boolean {
        let high;
        let low;
        let ranks: number[] = [];  //для номеров карт

        high = low = this.cards[0].rank; //перем равны номеру первой карты

        for (let i = 0; i < this.cards.length; i++) {
            let c = this.cards[i]; //вытягиваем из массива по карте на к итерации
            let r = c.rank; //читаем ее номер

            if (r === 1) r = 14; //если попался туз - присвоить номер 14

            if (ranks.indexOf(r) !== -1) return false; //если 2 одинаковых эл-та - значит нет возрастания
            ranks.push(r);

            if (r > high) high = r;  //дб max номер карты
            if (r < low) low = r;     //дб min номер карты
        }
        return high - low === 4; // [10,11,12,13,14]  14-10=4 true
    }



    //если туз - младшая карта (А,2,3,4,5)
    #isAceLowStraight(): boolean {
        let high;
        let low;
        let ranks: number[] = [];  //для номеров карт

        high = low = this.cards[0].rank; //перем равны номеру первой карты

        for (let i = 0; i < this.cards.length; i++) {
            let c = this.cards[i]; //вытягиваем из массива по карте на к итерации
            let r = c.rank; //читаем ее номер

            if (ranks.indexOf(r) !== -1) return false; //если 2 одинаковых эл-та - значит нет возрастания
            ranks.push(r);

            if (r > high) high = r;  //дб max номер карты
            if (r < low) low = r;     //дб min номер карты
        }
        return high - low === 4; // [2,3,4,5,6]  6-2=4 true
    }


    //проверяет наличие карты в руке
    has(...ranks: number[]): boolean {
        return this.cards.some(c => { //
            let r = c.rank; //номер карты
            let i = ranks.indexOf(r); //узнаю индекс карты, если такая есть

            if (i !== -1) {  //если карта есть
                ranks.splice(i, 1); //то удаляю эту карту
                // т е вырежем все карты, кот вернут true - и если хоть 1 карта не в руке - то вернется false 
            }

            return ranks.length === 0; //очистим массив

            // ranks.splice(0, ranks.length);

        });
    }



    //метод определяет выигрышную комбинацию и вернет интерфейс с описанием
    getScore(): Score {


        if (this.#isFlush() && this.#isStraight()) {
            if (this.has(1, 10, 11, 12, 13)) { //от 10,J,Q,K,A  !!

                return {
                    rank: Ranks.ROYAL_FLUSH,
                    scoringCards: this.cards,
                };
            }


            return {
                rank: Ranks.STRAIGHT_FLUSH,
                scoringCards: this.cards,

            };
        }



        let kinds = new Kinds(this.cards); //принимает массив карт
        let has4 = kinds.has(4);  //получает число совпавших карт


        if (has4) {
            return {
                rank: Ranks.FOUR_OF_A_KIND,  //QQQQ9  выигр комбинация
                scoringCards: has4.cards,   // запишу массив группы выигрышных карт 

            };
        }


        let has3 = kinds.has(3);
        let has2 = kinds.has(2);

        if (has3 && has2) {
            return {
                rank: Ranks.FULL_HOUSE,
                scoringCards: this.cards,

            };
        }

        if (this.#isFlush()) { //явл ли все одной масти
            return {
                rank: Ranks.FLUSH,
                scoringCards: this.cards,

            };
        }

        if (this.#isStraight()) {  //явл ли по возрастанию
            return {
                rank: Ranks.STRAIGHT,
                scoringCards: this.cards,

            };
        }

        if (has3) {  //если 3 карты одного достоинства
            return {
                rank: Ranks.THREE_OF_A_KIND,
                scoringCards: has3.cards,

            };
        }


        let all2 = kinds.all(2);  //получает колличество групп совпавших

        if (all2 && all2.length === 2) {  //если в массиве 2 группы совпадений(2 item) - то это TWO_PAIR
            return {
                rank: Ranks.TWO_PAIR,
                scoringCards: (() => {
                    let cards: Card[] = []; //создаем пустой массив карт

                    all2.forEach(kg => {
                        cards = cards.concat(kg.cards); //склеиваем новый массив с массивом совпавших карт
                    });

                    return cards; //вернем массив всех совпавших карт
                })(), //и вызовем

            };
        }





        if (has2 && (has2.rank >= 11 || has2.rank === 1)) {
            return {
                rank: Ranks.JACKS_OR_BETTER,
                scoringCards: has2.cards,

            };
        }



        return { //если нет совпадений - верну пустой массив
            rank: Ranks.NOTHING,
            scoringCards: [],
        }

    }



}