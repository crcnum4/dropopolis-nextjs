import { numberSerializer } from "./numberSerializer";
import { serializeString } from "./stringSerializer";
export {Ux} from './numberSerializer';

export class Serializer {
  static string = serializeString;
  static number = numberSerializer;
}