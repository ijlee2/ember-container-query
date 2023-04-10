import Component from '@glimmer/component';

import type { Track } from '../../data/album';
import styles from './table.css';

interface TracksTableSignature {
  Args: {
    tracks?: Track[];
  };
}

export default class TracksTableComponent extends Component<TracksTableSignature> {
  styles = styles;
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Tracks::Table': typeof TracksTableComponent;
  }
}
