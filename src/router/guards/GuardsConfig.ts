import { GuardFunction } from './GuardFunction';
import { GuardClass } from './GuardClass';


type AnyGuard = GuardFunction | GuardClass;

export type GuardsConfig = [AnyGuard, ...AnyGuard[]];
