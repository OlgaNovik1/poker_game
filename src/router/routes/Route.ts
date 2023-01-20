import { GuardsConfig } from '../guards';
import { PageClass } from '../pages';
import { ResolversConfig } from '../resolvers';


interface BaseRoute {
  path: string;
  guards?: GuardsConfig;
}

export interface PageRoute extends BaseRoute {
  page: PageClass;
  resolvers?: ResolversConfig;
}

export interface RedirectRoute extends BaseRoute {
  redirectTo: string;
}

export type Route = PageRoute | RedirectRoute;

export type Routes = [Route, ...Route[]];

export function isRedirectRoute(route: Route): route is RedirectRoute {
  return route.hasOwnProperty('redirectTo');
}

export function isPageRoute(route: Route): route is PageRoute {
  return route.hasOwnProperty('page');
}
