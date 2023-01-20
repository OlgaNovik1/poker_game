import { Card } from "./Card";
import { UICard } from "./UICard";



// класс интерфейса на странице     
export class UI {
    #parent: DocumentFragment;
    #bettingParent: Element = document.createElement('div'); //*div для cash, input и button  
    #cashDisplay: Element = document.createElement('div'); //*div
    readonly betInput: HTMLInputElement = document.createElement('input'); //*ставка
    readonly betButton: HTMLButtonElement = document.createElement('button');//*
    #cardsListElement: Element = document.createElement('div'); //*родит div
    readonly playButton: HTMLButtonElement = document.createElement('button');
    readonly resetButton: HTMLButtonElement = document.createElement('button');


    readonly msg: HTMLParagraphElement = document.createElement('p');  //<p>
    #_cards: Map<Card, UICard>;

    constructor(parent: DocumentFragment) {
        this.#parent = parent;
        this.#bettingParent.classList.add('betting');  //*
        this.#cashDisplay.classList.add('cash');  //*
        this.#cashDisplay.innerHTML = '$100';  //*
        this.betInput.classList.add('bet-input'); //*
        this.betInput.setAttribute('type', 'number');//*
        this.betButton.classList.add('bet-button'); //*
        this.betButton.innerHTML = 'Bet'; //*
        this.#bettingParent.appendChild(this.#cashDisplay);  //*
        this.#bettingParent.appendChild(this.betInput);  //*
        this.#bettingParent.appendChild(this.betButton);  //*
        this.#cardsListElement.classList.add('cards'); //*
        this.playButton.classList.add('play-button');
        this.playButton.innerHTML = 'Play';
        this.resetButton.classList.add('reset-button');
        this.resetButton.innerHTML = 'Reset';
        this.msg.classList.add('msg');
        this.#parent.appendChild(this.#bettingParent);
        this.#parent.appendChild(this.#cardsListElement);
        this.#parent.appendChild(this.playButton);
        this.#parent.appendChild(this.resetButton);
        this.#parent.appendChild(this.msg);

        // console.log(this.#parent);

        this.#_cards = new Map();
    }


    // режимы вкл/откл элементов
    betMode(): void {  //режим ставок
        this.betInput.disabled = false;
        this.betButton.disabled = false;
        this.playButton.disabled = true;
        this.resetButton.disabled = true;

    }

    playMode(): void { //режим игры
        this.betInput.disabled = true;
        this.betButton.disabled = true;
        this.playButton.disabled = false;
        this.resetButton.disabled = true;

    }


    gameOverMode(): void { //режим окончания игры
        this.betInput.disabled = true;
        this.betButton.disabled = true;
        this.playButton.disabled = true;
        this.resetButton.disabled = false;

    }

    disabledCards(): void {  //карты отключены
        this.#_cards.forEach((c) => {
            c.disabled = true;  //пробегаемся по Map и отключаем карты по очереди
        });
    }

    enableCards(): void {  //карты активировать
        this.#_cards.forEach((c) => {
            c.disabled = false;  //пробегаемся по Map и включаем карты по очереди
        });
    }


    //обновляет cash на интерфейсе
    updateCash(cash: number): void {
        this.#cashDisplay.textContent = '$' + cash;
    }



    get cards(): Map<Card, UICard> {
        return this.#_cards;
    }



    //добавляет 1 карту на интерфейс
    addCard(card: Card): UICard {  //получает карту - вернет вывод на интерфейса
        let u = new UICard(card);  //экземпляр интерфейса 1 карты
        this.#_cards.set(card, u);  //закинем в Map карту и ее интерфейс

        this.#cardsListElement.appendChild(u.element);  //div c картинкой закину в родит div

        return u;
    }


    //замена карты на интерфейсе
    replaceCard(newCard: Card, oldCard: Card): UICard {
        let oldUICard = this.#_cards.get(oldCard);

        if (oldUICard === undefined) {
            throw 'Card not in display';  //покажем сообщение
        }

        let u = new UICard(newCard); //создадим интерфейс новой карты

        this.#cardsListElement.replaceChild(u.element, oldUICard.element); //старую карту меняю на новую
        this.#_cards.delete(oldCard);  //из Map удалим старую карту
        this.#_cards.set(newCard, u);  //и добавим новую карту с ее интерфейсом

        return u;

    }


    //удаляем все карты из обьекта Map 
    clearCard(): void {
        this.#_cards = new Map();

        while (this.#cardsListElement.firstChild) { //удалить все карты у div
            this.#cardsListElement.removeChild(this.#cardsListElement.firstChild);
        }
    }

}

