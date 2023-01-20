import { ActivatedRoute } from '../routes';
import { RedirectPath } from './RedirectPath';


export interface Guard {
  canVisit(activatedRoute: ActivatedRoute): boolean | Promise<boolean> | RedirectPath | Promise<RedirectPath>;
}


// RedirectPath - прописать путь - куда перевести пользователя - если ему нельзя заходить - 
// т е это я определяю гардом