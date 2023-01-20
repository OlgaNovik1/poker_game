import { AbstractPage } from "../router";
import { local } from "../utils/LocalStorage";





export class ResultsView extends AbstractPage {
    readonly div: HTMLParagraphElement = document.createElement('div');


    destroy(): void {
    }

    render(): Element {

        this.div.classList.add('result');

        let array = local.getProducts(); //получаю массив обьектов из БД

        if (!array.length) {
            this.div.innerHTML = 'NO RESULTS! ';
        }

        for (let i = 0; i < array.length; i++) {
            let p: HTMLParagraphElement = document.createElement('p');
            let str = 'Hand: ' + array[i].name + ' ' + ', Winnings: ' + array[i].payout;
            p.innerHTML = str;
            this.div.appendChild(p);
        }

        return this.div;

    }
}

