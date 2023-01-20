import { ResolverFunction } from './ResolverFunction';
import { ResolverClass } from './ResolverClass';


export interface ResolversConfig {
  [dataName: string]: ResolverFunction | ResolverClass;
}
