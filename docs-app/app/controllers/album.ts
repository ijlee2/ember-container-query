import Controller from '@ember/controller';

import type { Model } from '../routes/album';

export default class AlbumController extends Controller {
  declare model: Model;
}
