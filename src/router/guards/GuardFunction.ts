import { ActivatedRoute } from '../routes';
import { RedirectPath } from './RedirectPath';


export interface GuardFunction extends CallableFunction {
  (activatedRoute: ActivatedRoute): boolean | Promise<boolean> | RedirectPath | Promise<RedirectPath>;
}
