import Controller from '@ember/controller';

import type { Model } from '../routes/album';
import styles from './album.module.css';

export default class AlbumController extends Controller {
  declare model: Model;
  styles = styles;
}
