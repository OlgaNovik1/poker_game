import { Guard } from './Guard';


export interface GuardClass {
  new(...args: any[]): Guard;
}
