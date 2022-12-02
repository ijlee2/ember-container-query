import Route from '@ember/routing/route';
import type { Album } from 'dummy/data/album';
import albumData from 'dummy/data/album';
import type { ModelFrom } from 'dummy/utils/routes';

export default class AlbumRoute extends Route {
  model(): Album {
    return albumData;
  }
}

export type Model = ModelFrom<AlbumRoute>;
