import { ActivatedRoute } from '../routes';


export interface ResolverFunction<T = unknown> extends CallableFunction {
  (activatedRoute: ActivatedRoute): T | Promise<T>;
}
