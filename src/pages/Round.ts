import { Deck } from "./Deck";
import { Hand } from "./Hand";


// класс описывает 1 игру 
// (своя рука, ставка, колода карт)
export class Round {
    readonly deck: Deck;
    readonly hand: Hand;
    readonly bet: number;

    constructor(bet: number) {  //получает ставку
        this.bet = bet;
        this.deck = new Deck(); //создаем новую колоду
        this.deck.shuffle();    //тасуем колоду
        this.hand = new Hand();  //создаем ряд из 5 карт (массив)

    }


    //в массив карт (в руку) добавим 5 карт, кот в дальнейшем отбразим на интерфейсе
    draw(): void {
        this.hand.cards.push(this.deck.draw());
        this.hand.cards.push(this.deck.draw());
        this.hand.cards.push(this.deck.draw());
        this.hand.cards.push(this.deck.draw());
        this.hand.cards.push(this.deck.draw());

    }
}



