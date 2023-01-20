import { Card } from "./Card";


// класс, соотв одной карте из колоды 
// и одному эл-ту на странице соотв-но
export class UICard {
    readonly card: Card;
    readonly element: Element = document.createElement('div'); //div для картинки img
    readonly img: HTMLImageElement = document.createElement('img');
    disabled: boolean = false;  // состояние вкл/выкл
    #_discarded: boolean = false;  //сброшена  карта
    #_highlighted: boolean = false;   //выигрышная  карта (зеленая)

    constructor(card: Card) {
        this.card = card;
        this.element.classList.add('card');  // диву класс добавим
        this.element.appendChild(this.img); //в див картинку закинем

        this.img.src = IMAGES.get(`${this.card.imageName}`);   // this.img.src = '/src/img/' + this.card.imageName;

        this.element.addEventListener('click', () => {  //на div с картинкой вешаем клик
            if (!this.disabled) {
                this.discarded = !this.discarded;  //переопределим значение boolean
            }

            // console.log(this.disabled);

        });

    }


    get discarded(): boolean {
        return this.#_discarded;
    }

    get highlighted(): boolean {
        return this.#_highlighted;
    }

    set discarded(value: boolean) {
        this.#_discarded = value;
        this.element.classList.toggle('discarded', this.discarded);
    }

    set highlighted(value: boolean) {
        this.#_highlighted = value;
        this.element.classList.toggle('highlighted', this.highlighted);
    }

}




const IMAGES = new Map()
    .set('2C', new URL('/src/img/2C.svg', import.meta.url))
    .set('2D', new URL('/src/img/2D.svg', import.meta.url))
    .set('2H', new URL('/src/img/2H.svg', import.meta.url))
    .set('2S', new URL('/src/img/2S.svg', import.meta.url))

    .set('3C', new URL('/src/img/3C.svg', import.meta.url))
    .set('3D', new URL('/src/img/3D.svg', import.meta.url))
    .set('3H', new URL('/src/img/3H.svg', import.meta.url))
    .set('3S', new URL('/src/img/3S.svg', import.meta.url))

    .set('4C', new URL('/src/img/4C.svg', import.meta.url))
    .set('4D', new URL('/src/img/4D.svg', import.meta.url))
    .set('4H', new URL('/src/img/4H.svg', import.meta.url))
    .set('4S', new URL('/src/img/4S.svg', import.meta.url))

    .set('5C', new URL('/src/img/5C.svg', import.meta.url))
    .set('5D', new URL('/src/img/5D.svg', import.meta.url))
    .set('5H', new URL('/src/img/5H.svg', import.meta.url))
    .set('5S', new URL('/src/img/5S.svg', import.meta.url))

    .set('6C', new URL('/src/img/6C.svg', import.meta.url))
    .set('6D', new URL('/src/img/6D.svg', import.meta.url))
    .set('6H', new URL('/src/img/6H.svg', import.meta.url))
    .set('6S', new URL('/src/img/6S.svg', import.meta.url))

    .set('7C', new URL('/src/img/7C.svg', import.meta.url))
    .set('7D', new URL('/src/img/7D.svg', import.meta.url))
    .set('7H', new URL('/src/img/7H.svg', import.meta.url))
    .set('7S', new URL('/src/img/7S.svg', import.meta.url))

    .set('8C', new URL('/src/img/8C.svg', import.meta.url))
    .set('8D', new URL('/src/img/8D.svg', import.meta.url))
    .set('8H', new URL('/src/img/8H.svg', import.meta.url))
    .set('8S', new URL('/src/img/8S.svg', import.meta.url))

    .set('9C', new URL('/src/img/9C.svg', import.meta.url))
    .set('9D', new URL('/src/img/9D.svg', import.meta.url))
    .set('9H', new URL('/src/img/9H.svg', import.meta.url))
    .set('9S', new URL('/src/img/9S.svg', import.meta.url))

    .set('10C', new URL('/src/img/10C.svg', import.meta.url))
    .set('10D', new URL('/src/img/10D.svg', import.meta.url))
    .set('10H', new URL('/src/img/10H.svg', import.meta.url))
    .set('10S', new URL('/src/img/10S.svg', import.meta.url))

    .set('JC', new URL('/src/img/JC.svg', import.meta.url))
    .set('JD', new URL('/src/img/JD.svg', import.meta.url))
    .set('JH', new URL('/src/img/JH.svg', import.meta.url))
    .set('JS', new URL('/src/img/JS.svg', import.meta.url))

    .set('QC', new URL('/src/img/QC.svg', import.meta.url))
    .set('QD', new URL('/src/img/QD.svg', import.meta.url))
    .set('QH', new URL('/src/img/QH.svg', import.meta.url))
    .set('QS', new URL('/src/img/QS.svg', import.meta.url))

    .set('KC', new URL('/src/img/KC.svg', import.meta.url))
    .set('KD', new URL('/src/img/KD.svg', import.meta.url))
    .set('KH', new URL('/src/img/KH.svg', import.meta.url))
    .set('KS', new URL('/src/img/KS.svg', import.meta.url))

    .set('AC', new URL('/src/img/AC.svg', import.meta.url))
    .set('AD', new URL('/src/img/AD.svg', import.meta.url))
    .set('AH', new URL('/src/img/AH.svg', import.meta.url))
    .set('AS', new URL('/src/img/AS.svg', import.meta.url));





