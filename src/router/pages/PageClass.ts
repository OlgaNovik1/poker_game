import { AbstractPage } from './AbstractPage';
import { ActivatedRoute } from '../routes';


export interface PageClass {
  new(activatedRoute: ActivatedRoute): AbstractPage;
}
