import { ActivatedRoute, isPageRoute, isRedirectRoute, Route, RouteParams, Routes } from './routes';
import { AbstractPage } from './pages';
import { isClass, normalizePath, ROUTER_EVENTS_BUS, templateToRegExp } from './utils';
import { Guard, GuardClass, GuardFunction, GuardsConfig, RedirectPath } from './guards';
import { ResolvedData, Resolver, ResolverClass, ResolverFunction, ResolversConfig } from './resolvers';

import './elements';


export class Router {
  readonly #routes = new Map<RegExp, Route>();
  readonly #guardInstances = new WeakMap<GuardClass, Guard>();
  readonly #resolverInstances = new WeakMap<ResolverClass, Resolver>();
  #currentView: AbstractPage | null = null;
  #activatedRoute: ActivatedRoute | null = null;




  setRoutes(routes: Routes): void {
    this.#routes.clear();

    //проходимся по массиву маршрутов и ищем нужный  маршрутов 
    //в map сохраняем по ключу РВ наш маршрут
    routes.forEach(route => this.#routes.set(templateToRegExp(route.path), route));
  }



  start(): void {   // метод - кот позволит роутеру запуститься и обработать текущий адрес
    this.navigate(location.pathname); //все что после слеша+слеш
    ROUTER_EVENTS_BUS.addEventListener('linkNavigation', (event: Event) => {
      this.navigate((
        event as CustomEvent<string>
      ).detail);
    });
  }



  //
  navigate(path: string, currentPath: string = location.href): void {
    const fullUrl = normalizePath(currentPath, path);  //сформируем полный адрес 
    const newPath = fullUrl.pathname;  //получим новый адрес
    const [route, params] = this.#findRoute(newPath);

    if (route) {  //проверка если роутерная ли ссылка
      void this.#handleRoute(route, fullUrl, params);
    }
  }



  // функция ищет в map нужный адрес
  //получает путь в арг, вернет Route или null - если не найдет
  #findRoute(path: string): [Route | null, RouteParams?] {
    for (const [regExp, route] of this.#routes) {
      const result = regExp.exec(path);

      if (result) {
        return [route, result.groups];
      }
    }

    return [null];
  }



  async #handleRoute(route: Route, url: URL, params: RouteParams | undefined): Promise<void> {
    ROUTER_EVENTS_BUS.dispatchEvent(new CustomEvent('loadstart'));
    const activatedRoute: ActivatedRoute = {  //создаем здесь - кот исп в классе от которого наследуемся потом
      path: url.pathname,
      params,
      data: undefined,
    };
    const guardsResult = await this.#checkGuards(route.guards, activatedRoute);

    if (!guardsResult) {
      ROUTER_EVENTS_BUS.dispatchEvent(new CustomEvent('loadend'));
      return;
    }

    if (guardsResult instanceof RedirectPath) {
      return this.navigate(guardsResult.toString());
    }

    if (isRedirectRoute(route)) {
      return this.navigate(route.redirectTo, url.href);
    }

    if (isPageRoute(route)) {
      activatedRoute.data = await this.#resolveData(route.resolvers, activatedRoute);
      history.pushState(activatedRoute, '', url);
      ROUTER_EVENTS_BUS.dispatchEvent(new CustomEvent<URL>('activate', { detail: url }));
      this.#activatedRoute = activatedRoute;
      this.#currentView?.destroy();
      this.#currentView = new route.page(this.#activatedRoute);
      ROUTER_EVENTS_BUS.dispatchEvent(new CustomEvent('render', {
        detail: this.#currentView.render(),
      }));

      return;
    }

    ROUTER_EVENTS_BUS.dispatchEvent(new CustomEvent('loadend'));
  }

  async #checkGuards(
    guards: GuardsConfig | undefined,
    activatedRoute: ActivatedRoute,
  ): Promise<boolean | RedirectPath> {
    if (!Array.isArray(guards) || !guards.length) {
      return true;
    }

    for (const guard of guards) {
      const guardResult = await this.#invokeGuard(guard, activatedRoute);

      if (!guardResult) {
        return false;
      }

      if (guardResult instanceof RedirectPath) {
        return guardResult;
      }
    }

    return true;
  }

  async #invokeGuard(
    guard: GuardFunction | GuardClass,
    activatedRoute: ActivatedRoute,
  ): Promise<boolean | RedirectPath> {
    if (isClass<GuardClass>(guard)) {
      if (!this.#guardInstances.has(guard)) {
        this.#guardInstances.set(guard, new guard());
      }

      const guardInstance = this.#guardInstances.get(guard)!;

      return guardInstance.canVisit(activatedRoute);
    }

    return guard(activatedRoute);
  }

  #resolveData(
    resolvers: ResolversConfig | undefined,
    activatedRoute: ActivatedRoute,
  ): Promise<ResolvedData | undefined> {
    if (!resolvers) {
      return Promise.resolve(undefined);
    }

    return Promise
      .all(Object.entries(resolvers).map(async ([key, resolver]) => {
        return [key, await this.#invokeResolver(resolver, activatedRoute)];
      }))
      .then(entries => Object.fromEntries(entries));
  }

  async #invokeResolver(resolver: ResolverFunction | ResolverClass, activatedRoute: ActivatedRoute): Promise<unknown> {
    if (isClass<ResolverClass>(resolver)) {
      if (!this.#resolverInstances.has(resolver)) {
        this.#resolverInstances.set(resolver, new resolver());
      }

      const resolverInstance = this.#resolverInstances.get(resolver)!;

      return resolverInstance.resolve(activatedRoute);
    }

    return resolver(activatedRoute);
  }

}
