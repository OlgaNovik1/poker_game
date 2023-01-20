import { RouteParams } from './RouteParams';
import { ResolvedData } from '../resolvers';


export interface ActivatedRoute {
  path: string;
  data: ResolvedData | undefined;
  params: RouteParams | undefined;
}
