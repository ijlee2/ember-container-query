import Component from '@glimmer/component';

import type { Track } from '../../data/album';
import styles from './list.css';

interface TracksListSignature {
  Args: {
    numColumns?: number;
    tracks?: Track[];
  };
}

export default class TracksListComponent extends Component<TracksListSignature> {
  styles = styles;

  get numColumns(): number {
    const { numColumns } = this.args;

    return numColumns ?? 1;
  }

  get numRows(): number {
    const { tracks } = this.args;

    if (!tracks) {
      return 0;
    }

    return Math.ceil(tracks.length / this.numColumns);
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Tracks::List': typeof TracksListComponent;
  }
}
