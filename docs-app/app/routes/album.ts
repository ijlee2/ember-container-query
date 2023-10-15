import Route from '@ember/routing/route';

import { type Album, album } from '../data';
import type { ModelFrom } from '../utils/routes';

export default class AlbumRoute extends Route {
  model(): Album {
    return album;
  }
}

export type Model = ModelFrom<AlbumRoute>;
