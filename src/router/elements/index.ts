import { Router } from '../Router';

export * from './RouterLink';
export * from './RouterButton';
export * from './RouterOutlet';


// 3 кастомных элемента для создания ссылок либо кнопок и RouterOutlet вместо hostElement. 
// ссылка и кнопка работают одинаково
// 
// если нужно сделать ссылку для  по роутеру, то оздаю тег а и ставлю атрибут is

//     < a is = "router-link" href = "/some-path" link - active="css-class-for-active-button" > </>

//     т е дивы меняю на ссылки теперь
//     и при переходе на href = "/some-path" мне назначится css-класс активный, например для подстветки текущего активного 
//     элемента



// сюда рисует роутер содержимое
// <router-outlet>

// <div style="position: absolute; inset: 0; background-color: #fff; display: flex">
//     <span style="margin: auto">LOADING</span>
// </div>

// </router-outlet>




// некоторые роуты могут загружаться медленно - тк данные скачивают себе - и на это время будет показываться блок -
//     кот внутри < router - outlet >  - и вместо слова LOADING - крутелку сделать и < router - outlet > добавить
//     что он position: relative


// в точке входа index/ts  - создаю конфигурацию маршрутов
// конфигурация - это дб не пустой массив и массив обьектов
// все подключаемые классы дб наследниками класса AbstractPage !!!!! и обязательно реализовать его 2 метода

// резолверы - это обьект ключ:значение или класс(чтобы данные скачать 1 раз - и больше не скачивать - 
// а подгружать скачанные повторно)

// гарды - это массив функций или класс мб

// const router = new Router();  //- про импорт не забыть роутера
// router.setRoutes(
//     [
//         {
//             path: '',
//             redirectTo: 'catalog',

//         },
//         {
//             path: 'catalog',
//             page: CatalogView,   //импорт не забыть
//             resolvers?: {},
//             guards?:[],

//         },
//         {
//             path: 'catalog/:productId',
//             page: ProductView,

//         },

//     ]);

// router.start();  //запускает приложение





// export abstract class AbstractPage  - от этого класса наследуются все мои вью - 
// в destroy ()   - удаляю обраб событий, setTimeout и тд  и обязательно супер вызвать и 
// у меня готовое свойство 

// get activatedRoute(): ActivatedRoute {
//   return this.#activatedRoute;
// }  - читая его - буду знать о инфу о скаченной инфе и знаю на какой странице нахожусь