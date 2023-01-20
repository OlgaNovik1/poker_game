declare module '*.scss' {
    interface ClassNames {
        [className: string]: string;
    }

    const classNames: ClassNames;

    export = classNames;
}





declare module '*.jpg' {

    const url: string;

    export = url;
}



declare module '*.svg' {

    const url: string;

    export = url;
}















// declare module '*.scss' {              //обьявим что ts может работать с модулями- кот заканчиваются на .scss
//     interface ClassNames {             //внутри обьявим спец интерфейс
//         [className: string]: string;   // интерфейс содержит свойство-строку
//     }

//     const classNames: ClassNames;      //обьявим константу опред типа - а сам тип описан выше

//     export = classNames;               //экспорт такого модуля - это экспорт вот этой константы
// }
// теперь когда ts будет видеть импорт любого scss-файла - то он будет понимать что эти файлы
// как-будто экспортируют ему обьект вот такого интерфейса
// А это значит что есть обьект, у кот есть просто некие свойства,   и в этих свойствах содержатся
// строки

// ts config настроен так - что файлы d.ts - будет себе подключать

// в данном файле необх обьявить как typescript должен воспринимать импорт таких
// модулей как scss или css и тд