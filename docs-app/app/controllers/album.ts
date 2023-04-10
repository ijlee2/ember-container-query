import Controller from '@ember/controller';

import type { Model } from '../routes/album';

import styles from './album.css';

export default class AlbumController extends Controller {
  styles = styles;

  declare model: Model;
}
