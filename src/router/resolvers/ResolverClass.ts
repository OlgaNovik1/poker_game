import { Resolver } from './Resolver';


export interface ResolverClass<T = unknown> {
  new(...args: any[]): Resolver<T>;
}
