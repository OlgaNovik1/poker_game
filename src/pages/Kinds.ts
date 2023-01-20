import { Card } from "./Card";


//описывает группы совпадений карт
export interface KindsGroup {
    cards: Card[];  //массив совпавших карт
    rank: number;  //номер - кот соотв этим картам
};


//4) описывает группы совпавших пар
export class Kinds {
    #kinds: { [rank: number]: Card[] }; //номер группы: массив карт

    constructor(cards: Card[]) { //получает массив карт
        this.#kinds = {};

        cards.forEach(c => {
            let r = c.rank;  //получаем номер карты каждой

            // если нет св-ва под таким ключом - то создадим  пустой массив
            if (this.#kinds[r] === undefined) this.#kinds[r] = [];

            this.#kinds[r].push(c); //и закинем в массив номер карты
        });
    }



    // получает колличество совпавших карт и вернет обьект первой группы карт 
    has(numOfKinds: number): KindsGroup | false {
        let kg = this.all(numOfKinds);    //хранит массив всех групп

        if (kg) return kg[0];  //если массив есть - достанем 1 группу из массива

        return false;
    }


    // получает колличество совпавших карт (QQ KK 6) - вернет все обьекты совп карт под номерами
    all(numOfKinds: number): KindsGroup[] | false { //вернет все совпавших группы карт под номерами 
        let result: KindsGroup[] = []; //в массиве будем хранить обьекты-группы пар совпавших

        // вернет список ключей обьекта в виде массива
        for (let rank of Object.keys(this.#kinds)) { //пробегаемся по обьекту и получим ключи
            if (this.#kinds[+rank].length === numOfKinds) { //если длина массива карт равна количеству numOfKinds - а это число групп совп-х
                result.push({  //закинем в массив обьект 
                    cards: this.#kinds[+rank], //массив карт
                    rank: +rank,  //номер группы карт
                });
            }
        }

        if (result.length === 0) return false; //если массив пустой - вернем false

        return result; //получим массив совпавших групп
    }

}