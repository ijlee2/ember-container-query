import Route from '@ember/routing/route';

import type { Album } from '../data/album';
import albumData from '../data/album';
import type { ModelFrom } from '../utils/routes';

export default class AlbumRoute extends Route {
  model(): Album {
    return albumData;
  }
}

export type Model = ModelFrom<AlbumRoute>;
