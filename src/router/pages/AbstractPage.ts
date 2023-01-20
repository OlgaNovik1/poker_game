import { ActivatedRoute } from '../routes';


export abstract class AbstractPage {
  readonly #activatedRoute: ActivatedRoute;

  constructor(activatedRoute: ActivatedRoute) {
    this.#activatedRoute = activatedRoute;
  }

  get activatedRoute(): ActivatedRoute {
    return this.#activatedRoute!;
  }

  abstract render(): DocumentFragment | Element;

  abstract destroy(): void;
}


// export abstract class AbstractPage  - от этого класса наследуются все мои вью - 
// в destroy ()   - удаляю обраб событий, setTimeout и тд  и обязательно супер вызвать и 
// у меня готовое свойство 

// get activatedRoute(): ActivatedRoute {
//   return this.#activatedRoute;
// }  - читая его - буду знать  инфу о скаченной инфе и знать на какой странице нахожусь