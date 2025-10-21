import Route from '@ember/routing/route';
import { type Album, album } from 'docs-app/data/album';
import type { ModelFrom } from 'docs-app/utils/routes';

export default class AlbumRoute extends Route {
  model(): Album {
    return album;
  }
}

export type Model = ModelFrom<AlbumRoute>;
