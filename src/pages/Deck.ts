import { Card } from "./Card";


//2) создаем колоду карт
export class Deck {
    #cards: Card[];

    constructor() {
        this.#cards = [];



        for (let s = 0; s < 4; s++) {   //s- масть  - 4 итерации
            for (let r = 1; r <= 13; r++) {  //r-номер карты 1-13  - добавит в массив 13 карт(за 13 итераций) - потом перейдет снова к род циклу
                this.#cards.push(new Card(r, s)); //добавляем на к итерации карту в массив (c номером и мастью), те 52 р вызовем класс Card в итоге
                console.log(this.#cards); //!! //получим массив из 52 карт 


            }
        }
    }

    shuffle(): void { //тавсовка колоды карт - для каждой игры новая колода - и карты никогда не заканчиваются
        for (let i = this.#cards.length; i > 0; i--) {  //i = 51 на старте
            let j = Math.floor(Math.random() * i);  //сохраним сл число - оно не более 51  //округляет до целого в меньшую сторону
            console.log(j);
            [this.#cards[i - 1], this.#cards[j]] = [this.#cards[j], this.#cards[i - 1]]; //i !== 0  !!
        }
    }



    draw(): Card {  //достаем из колоды 1 первую ВЕРХНЮЮ  карту 
        return <Card>this.#cards.shift();
    }

}