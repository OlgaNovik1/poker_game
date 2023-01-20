import { ActivatedRoute } from '../routes';


export interface Resolver<T = unknown> {
  resolve(activatedRoute: ActivatedRoute): T | Promise<T>;  //вернет сами данные или промис данных
}
