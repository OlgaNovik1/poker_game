import { AbstractPage } from "../router";
import { Round } from "./Round";
import { UI } from "./UI";
import { UICard } from "./UICard";
import { ActivatedRoute } from '../router';
import { Card } from "./Card";
import { local } from "../utils/LocalStorage";



export class GameView extends AbstractPage {

    fragment: DocumentFragment = document.createDocumentFragment();
    ui: UI | undefined;
    round: Round | undefined;
    player = {
        cash: 100
    };
    arr: string[] = [];

    #inputClick = () => {

        let bet: number = parseInt(this.ui!.betInput.value);


        if (bet > this.player.cash || bet <= 0 || !bet) return;


        this.round = new Round(bet);  //новый раунд
        this.round.draw();   //добавляем 5 карт в массив


        this.player.cash -= bet; //пересчет кеша


        this.updateCash();  //обновление кеша на интерфейсе

        this.round.hand.cards.forEach(c => {  //отобразим на интерфейсе каждую карту
            this.ui!.addCard(c);
        });

        this.ui!.playMode(); //режим игры элементов

        this.msg1('Click on the cards you wish to discard'); //сброс карт 

    }


    #playButtonClick = () => {
        this.round!.hand.cards.forEach((c, i) => {
            let u: UICard = this.ui!.cards.get(c)!;  //получу каждую карту из Map  по очереди

            if (u.discarded) {  //проверяю - если карта сброшена
                let newCard = this.round!.deck.draw();  //то достаю след новую карту из колоды 
                this.round!.hand.cards[i] = newCard; //заменяю сброшенную на новую карту
                this.ui!.replaceCard(newCard, c); //вывожу новую карту на интерфейс
            }

        });


        let score = this.round!.hand.getScore(); //метод определяет выигрышную комбинацию и вернет интерфейс с описанием
        // console.log(score);

        local.addResult(score.rank); //добавление в LS обьекта

        let payout = score.rank.payout * this.round!.bet; //очки * ставку = выигрыш

        this.player.cash += payout;  //пересчет кеша
        this.updateCash();  //обновление кеша на интерфейсе

        score.scoringCards.forEach(c => {
            this.ui!.cards.get(c)!.highlighted = true;  //выделить зеленым выигр карты
        });

        this.ui!.gameOverMode();
        this.ui!.disabledCards(); //карты отключены

        let array = this.msg('Hand: ' + score.rank.name + '<br>Winnings: $' + payout); //имя выиг комбинации и выигрыш
        // console.log(array);

    }


    #reset = () => {
        this.ui!.betMode();      //запускаем режим элементов на странице для ставок
        this.ui!.clearCard();   //удаляем все карты
        this.ui!.enableCards(); //активировать карты
        this.clearMsg();       //удаляем все сообщения
    }


    updateCash() {
        this.ui!.updateCash(this.player.cash);
    }


    msg1(str: string): void {  //закинем в <p> сообщение
        this.ui!.msg.innerHTML += str + '<br>';
    }


    msg(str: string): string[] {  //закинем в <p> сообщение
        let str1: string = this.ui!.msg.innerHTML += str + '<br>';
        this.arr.push(str1);
        return this.arr;
    }

    clearMsg(): void {
        this.ui!.msg.innerHTML = '';   //очистим <p>
    }





    destroy(): void {

        this.ui!.resetButton.removeEventListener('click', this.#reset);
        this.ui!.playButton.removeEventListener('click', this.#playButtonClick);
        this.ui!.betInput.removeEventListener('click', this.#inputClick);
    }


    render(): DocumentFragment | Element {

        const ui = new UI(this.fragment);
        this.ui = ui;

        this.#reset();

        this.ui!.betInput.addEventListener('click', this.#inputClick);
        this.ui!.playButton.addEventListener('click', this.#playButtonClick);
        this.ui!.resetButton.addEventListener('click', this.#reset);

        return this.fragment;

    }
}





